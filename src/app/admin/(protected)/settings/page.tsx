import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { env } from "@/lib/env";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminSettingsPage() {
  const [snapshot, session] = await Promise.all([
    getAdminSnapshot(),
    getAdminSessionState(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Settings"
        title="Manage site messaging and SEO"
        description="Control the homepage narrative, contact framing, accent colors, and metadata surfaces that shape the public portfolio."
      />
      <SiteSettingsForm
        settings={snapshot.settings}
        profile={snapshot.profile}
        demoMode={session?.mode === "demo"}
        aiEnabled={Boolean(env.OPENAI_API_KEY)}
      />
    </div>
  );
}
