import { z } from "zod";

const googleVerificationString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  return trimmed.replace(/^google-site-verification=/i, "").trim();
}, z.string().min(1).optional());

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://cjohnmizo.in"),
  GOOGLE_SITE_VERIFICATION: googleVerificationString,
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
});
