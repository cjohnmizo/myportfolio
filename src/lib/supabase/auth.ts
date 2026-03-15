import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";

export interface AdminSessionState {
  mode: "demo" | "authenticated";
  userEmail: string;
  userName: string;
}

export async function getAdminSessionState(): Promise<AdminSessionState | null> {
  if (!env.isSupabaseConfigured) {
    return {
      mode: "demo",
      userEmail: "demo@cjohnmizo.in",
      userName: "Demo mode",
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const serviceClient = createServiceRoleSupabaseClient();

  if (!serviceClient) {
    return null;
  }

  const { data: profile } = await serviceClient
    .from("profiles")
    .select("full_name, is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return null;
  }

  return {
    mode: "authenticated",
    userEmail: user.email ?? "admin@cjohnmizo.in",
    userName: profile.full_name,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSessionState();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
