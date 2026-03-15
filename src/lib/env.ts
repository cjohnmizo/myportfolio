import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://cjohnmizo.in"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  GITHUB_USERNAME: z.string().default("cjohnmizo"),
});

const parsed = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME,
});

const supabaseValues = [
  parsed.NEXT_PUBLIC_SUPABASE_URL,
  parsed.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  parsed.SUPABASE_SERVICE_ROLE_KEY,
];

const supabaseValuesPresent = supabaseValues.filter(Boolean).length;

if (supabaseValuesPresent > 0 && supabaseValuesPresent < supabaseValues.length) {
  throw new Error(
    "Supabase configuration is partial. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY together.",
  );
}

export const env = {
  ...parsed,
  isSupabaseConfigured: supabaseValuesPresent === supabaseValues.length,
};
