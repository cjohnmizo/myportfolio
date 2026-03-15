import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSessionState();

  if (session?.mode === "authenticated") {
    redirect("/admin/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-16 sm:px-6">
      <AdminLoginForm demoMode={session?.mode === "demo"} />
    </main>
  );
}
