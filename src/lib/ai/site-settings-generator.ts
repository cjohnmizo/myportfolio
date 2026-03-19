import { z } from "zod";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site";
import type { SiteSettingsGenerationValues } from "@/validators/admin";

const generatedSiteSettingsSchema = z.object({
  heroEyebrow: z.string().min(6).max(80),
  heroTitle: z.string().min(12).max(110),
  heroSubtitle: z.string().min(12).max(180),
  heroDescription: z.string().min(20).max(260),
  aboutTitle: z.string().min(6).max(70),
  aboutBody: z.string().min(20).max(320),
  contactTitle: z.string().min(6).max(90),
  contactDescription: z.string().min(20).max(220),
  seoTitle: z.string().min(10).max(70),
  seoDescription: z.string().min(20).max(170),
  footerNote: z.string().min(10).max(170),
});

export type GeneratedSiteSettings = z.infer<typeof generatedSiteSettingsSchema>;

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
    "You are a senior portfolio copywriter for premium software engineers.",
    "Write recruiter-friendly, polished, concrete website copy.",
    "Keep the language credible, modern, and human.",
    "Avoid hype, buzzword stuffing, markdown, bullet lists, and em dashes.",
    "Make the copy feel high-trust and product-minded.",
    "Return only JSON that matches the required schema.",
  ].join(" ");
}

function buildUserPrompt(input: SiteSettingsGenerationValues) {
  return JSON.stringify(
    {
      task: "Generate homepage messaging and SEO copy for a software engineer portfolio.",
      brand: {
        siteName: siteConfig.name,
        publicLabels: siteConfig.publicIdentityLabels,
        alternateNames: siteConfig.alternateNames,
        domain: siteConfig.domain,
      },
      profile: {
        fullName: input.fullName,
        headline: input.headline,
        currentRole: input.currentRole,
        location: input.location,
        yearsExperience: input.yearsExperience,
      },
      guidance: {
        targetAudience: input.targetAudience,
        tone: input.tone,
        brief: input.brief,
      },
      copyConstraints: {
        heroEyebrow: "Short phrase, 3 to 8 words, slash or separator style is okay.",
        heroTitle: "One strong sentence, ambitious but believable.",
        heroSubtitle: "Explain the type of work and value in one sentence.",
        heroDescription: "Give a slightly deeper explanation of what makes the portfolio compelling.",
        aboutTitle: "Short section heading.",
        aboutBody: "One paragraph that sounds thoughtful and credible.",
        contactTitle: "Warm CTA heading.",
        contactDescription: "One paragraph that invites outreach clearly.",
        seoTitle: "Search-friendly title under 70 characters.",
        seoDescription: "Meta description under 170 characters.",
        footerNote: "Short closing note for the footer.",
      },
    },
    null,
    2,
  );
}

const siteSettingsJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    heroEyebrow: { type: "string" },
    heroTitle: { type: "string" },
    heroSubtitle: { type: "string" },
    heroDescription: { type: "string" },
    aboutTitle: { type: "string" },
    aboutBody: { type: "string" },
    contactTitle: { type: "string" },
    contactDescription: { type: "string" },
    seoTitle: { type: "string" },
    seoDescription: { type: "string" },
    footerNote: { type: "string" },
  },
  required: [
    "heroEyebrow",
    "heroTitle",
    "heroSubtitle",
    "heroDescription",
    "aboutTitle",
    "aboutBody",
    "contactTitle",
    "contactDescription",
    "seoTitle",
    "seoDescription",
    "footerNote",
  ],
};

export async function generateSiteSettingsCopy(input: SiteSettingsGenerationValues) {
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
          name: "site_settings_copy",
          strict: true,
          schema: siteSettingsJsonSchema,
        },
      },
      max_output_tokens: 1200,
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

  const parsed = generatedSiteSettingsSchema.safeParse(JSON.parse(outputText));

  if (!parsed.success) {
    throw new Error("OpenAI returned content in an unexpected format.");
  }

  return parsed.data;
}
