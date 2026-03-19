import { z } from "zod";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import type { ProjectGenerationValues } from "@/validators/admin";

const generatedProjectContentSchema = z.object({
  excerpt: z.string().min(20).max(220),
  description: z.string().min(30).max(700),
  challenge: z.string().min(20).max(500),
  solution: z.string().min(20).max(500),
  impact: z.string().min(20).max(500),
});

export type GeneratedProjectContent = z.infer<typeof generatedProjectContentSchema>;

interface OpenAIResponsePayload {
  error?: {
    message?: string;
  };
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
      refusal?: string;
    }>;
  }>;
}

function extractOutputText(payload: OpenAIResponsePayload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  for (const item of payload.output ?? []) {
    for (const part of item.content ?? []) {
      if (part.type === "output_text" && typeof part.text === "string" && part.text.trim()) {
        return part.text;
      }
    }
  }

  return null;
}

function extractRefusal(payload: OpenAIResponsePayload) {
  for (const item of payload.output ?? []) {
    for (const part of item.content ?? []) {
      if (part.type === "refusal" && typeof part.refusal === "string" && part.refusal.trim()) {
        return part.refusal;
      }
    }
  }

  return null;
}

function buildSystemPrompt() {
  return [
    "You are a senior case-study writer for premium software portfolios.",
    "Write clear, credible project copy that sounds experienced and specific.",
    "Focus on product thinking, execution quality, technical judgment, and believable outcomes.",
    "Do not invent client names, budgets, user counts, or hard metrics that are not provided.",
    "If the source draft already contains useful facts, preserve and sharpen them.",
    "Avoid hype, buzzword stuffing, markdown, bullet lists, and em dashes.",
    "Return only JSON that matches the required schema.",
  ].join(" ");
}

function buildUserPrompt(input: ProjectGenerationValues) {
  return JSON.stringify(
    {
      task: "Generate polished case-study copy for a software project portfolio entry.",
      brand: {
        siteName: siteConfig.name,
        domain: siteConfig.domain,
        publicLabels: siteConfig.publicIdentityLabels,
      },
      owner: {
        fullName: input.fullName,
        headline: input.headline,
        currentRole: input.currentRole,
      },
      project: {
        title: input.title,
        category: input.category,
        status: input.status,
        year: input.year,
        techStack: input.techStackText
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean),
      },
      guidance: {
        brief: input.brief,
        tone: input.tone,
        targetAudience: input.targetAudience,
      },
      sourceDraft: {
        excerpt: input.currentExcerpt,
        description: input.currentDescription,
        challenge: input.currentChallenge,
        solution: input.currentSolution,
        impact: input.currentImpact,
      },
      copyConstraints: {
        excerpt: "One or two sentences for cards and previews. Keep it compact and strong.",
        description:
          "A concise overview paragraph for the project page. Make it clear what the product is and why it matters.",
        challenge:
          "One paragraph describing the complexity, operational tension, or delivery risk.",
        solution:
          "One paragraph explaining the approach, architecture, product decisions, and implementation quality.",
        impact:
          "One paragraph describing believable outcomes. Qualitative impact is fine when exact metrics are unavailable.",
      },
    },
    null,
    2,
  );
}

const projectJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    excerpt: { type: "string" },
    description: { type: "string" },
    challenge: { type: "string" },
    solution: { type: "string" },
    impact: { type: "string" },
  },
  required: ["excerpt", "description", "challenge", "solution", "impact"],
};

export async function generateProjectContent(input: ProjectGenerationValues) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: buildSystemPrompt() }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: buildUserPrompt(input) }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "project_case_study_copy",
          strict: true,
          schema: projectJsonSchema,
        },
      },
      max_output_tokens: 1400,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as OpenAIResponsePayload;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? "OpenAI request failed.");
  }

  const refusal = extractRefusal(payload);

  if (refusal) {
    throw new Error(refusal);
  }

  const outputText = extractOutputText(payload);

  if (!outputText) {
    throw new Error("OpenAI returned an empty response.");
  }

  const parsed = generatedProjectContentSchema.safeParse(JSON.parse(outputText));

  if (!parsed.success) {
    throw new Error("OpenAI returned project content in an unexpected format.");
  }

  return parsed.data;
}
