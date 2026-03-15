import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ExperienceManager } from "@/components/admin/experience-manager";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminExperiencePage() {
  const [snapshot, session] = await Promise.all([
    getAdminSnapshot(),
    getAdminSessionState(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Experience"
        title="Manage professional timeline"
        description="Update timeline entries, achievement bullets, and the supporting stack that appears with each role."
      />
      <ExperienceManager
        experiences={snapshot.experiences}
        demoMode={session?.mode === "demo"}
      />
    </div>
  );
}
