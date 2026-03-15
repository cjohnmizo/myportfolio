import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/env";
import type { Database } from "@/types/supabase";

let serviceClient: ReturnType<typeof createClient<Database>> | null = null;

export function createServiceRoleSupabaseClient() {
  if (!env.isSupabaseConfigured) {
    return null;
  }

  serviceClient ??= createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  return serviceClient;
}
