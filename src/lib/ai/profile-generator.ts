import { z } from "zod";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import type { ProfileGenerationValues } from "@/validators/admin";

const generatedProfileContentSchema = z.object({
  headline: z.string().min(8).max(110),
  shortBio: z.string().min(20).max(260),
  longBio: z.string().min(60).max(900),
});

export type GeneratedProfileContent = z.infer<typeof generatedProfileContentSchema>;

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
    "You are a senior portfolio copywriter for high-end software engineers.",
    "Write recruiter-friendly, credible profile copy that feels thoughtful, modern, and human.",
    "Emphasize depth, product judgment, execution quality, and calm professionalism.",
    "Avoid hype, vague buzzwords, markdown, bullet lists, and em dashes.",
    "If source draft text already contains useful specifics, preserve and sharpen them.",
    "Return only JSON that matches the required schema.",
  ].join(" ");
}

function buildUserPrompt(input: ProfileGenerationValues) {
  return JSON.stringify(
    {
      task: "Generate polished public profile copy for a software engineer portfolio.",
      brand: {
        siteName: siteConfig.name,
        domain: siteConfig.domain,
        publicLabels: siteConfig.publicIdentityLabels,
      },
      person: {
        fullName: input.fullName,
        currentRole: input.currentRole,
        location: input.location,
        githubUsername: input.githubUsername,
        yearsExperience: input.yearsExperience,
        skills: input.skillNames,
      },
      guidance: {
        brief: input.brief,
        tone: input.tone,
        targetAudience: input.targetAudience,
      },
      sourceDraft: {
        headline: input.currentHeadline,
        shortBio: input.currentShortBio,
        longBio: input.currentLongBio,
      },
      copyConstraints: {
        headline: "One sharp headline for a professional portfolio. Keep it concise and premium.",
        shortBio:
          "One paragraph for the hero or intro section. It should be clear, confident, and easy to scan.",
        longBio:
          "One fuller paragraph for the about section. Show range, judgment, and the kind of work this person is trusted to lead.",
      },
    },
    null,
    2,
  );
}

const profileJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    headline: { type: "string" },
    shortBio: { type: "string" },
    longBio: { type: "string" },
  },
  required: ["headline", "shortBio", "longBio"],
};

export async function generateProfileContent(input: ProfileGenerationValues) {
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
          name: "profile_copy",
          strict: true,
          schema: profileJsonSchema,
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

  const parsed = generatedProfileContentSchema.safeParse(JSON.parse(outputText));

  if (!parsed.success) {
    throw new Error("OpenAI returned profile content in an unexpected format.");
  }

  return parsed.data;
}
