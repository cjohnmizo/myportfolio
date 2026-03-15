import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EducationManager } from "@/components/admin/education-manager";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminEducationPage() {
  const [snapshot, session] = await Promise.all([
    getAdminSnapshot(),
    getAdminSessionState(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Education"
        title="Manage academic history"
        description="Curate degrees, fields of study, and supporting descriptions that reinforce the portfolio narrative."
      />
      <EducationManager
        education={snapshot.education}
        demoMode={session?.mode === "demo"}
      />
    </div>
  );
}
