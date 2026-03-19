import { z } from "zod";

const optionalEnvString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}, z.string().min(1).optional());

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
  NEXT_PUBLIC_SUPABASE_URL: z.preprocess(
    (value) => (typeof value === "string" && value.trim().length === 0 ? undefined : value),
    z.string().url().optional(),
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalEnvString,
  SUPABASE_SERVICE_ROLE_KEY: optionalEnvString,
  OPENAI_API_KEY: optionalEnvString,
  GOOGLE_SITE_VERIFICATION: googleVerificationString,
  ADMIN_EMAIL: z.preprocess(
    (value) => (typeof value === "string" && value.trim().length === 0 ? undefined : value),
    z.string().email().optional(),
  ),
});

const parsed = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
});

const publicSupabaseValues = [
  parsed.NEXT_PUBLIC_SUPABASE_URL,
  parsed.NEXT_PUBLIC_SUPABASE_ANON_KEY,
];

const publicSupabaseValuesPresent = publicSupabaseValues.filter(Boolean).length;

if (
  publicSupabaseValuesPresent > 0 &&
  publicSupabaseValuesPresent < publicSupabaseValues.length
) {
  throw new Error(
    "Supabase public configuration is partial. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY together.",
  );
}

if (parsed.SUPABASE_SERVICE_ROLE_KEY && publicSupabaseValuesPresent !== 2) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to be set as well.",
  );
}

export const env = {
  ...parsed,
  isSupabaseConfigured: publicSupabaseValuesPresent === publicSupabaseValues.length,
  isServiceRoleConfigured: Boolean(parsed.SUPABASE_SERVICE_ROLE_KEY),
};
