import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/env";
import type { Database } from "@/types/supabase";

let publicClient: ReturnType<typeof createClient<Database>> | null = null;

export function createPublicSupabaseClient() {
  if (!env.isSupabaseConfigured) {
    return null;
  }

  publicClient ??= createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  return publicClient;
}
