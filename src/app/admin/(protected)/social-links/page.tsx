import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SocialLinksManager } from "@/components/admin/social-links-manager";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminSocialLinksPage() {
  const [snapshot, session] = await Promise.all([
    getAdminSnapshot(),
    getAdminSessionState(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Social links"
        title="Manage public destinations"
        description="Control which social platforms appear publicly, the order they appear in, and which ones are currently visible."
      />
      <SocialLinksManager
        socialLinks={snapshot.socialLinks}
        demoMode={session?.mode === "demo"}
      />
    </div>
  );
}
