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

const optionalString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed : undefined;
}, z.string().min(1).optional());

const optionalEmail = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed : undefined;
}, z.string().email().optional());

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://cjohnmizo.in"),
  GOOGLE_SITE_VERIFICATION: googleVerificationString,
  RESEND_API_KEY: optionalString,
  CONTACT_PUBLIC_EMAIL: optionalEmail.default("contact@cjohnmizo.in"),
  CONTACT_FROM_EMAIL: z
    .string()
    .min(1)
    .default("C. John Remthang <contact@cjohnmizo.in>"),
  CONTACT_TO_EMAIL: optionalEmail,
  ADMIN_EMAIL: optionalEmail,
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_PUBLIC_EMAIL: process.env.CONTACT_PUBLIC_EMAIL,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
});
