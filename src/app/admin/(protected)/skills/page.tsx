import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SkillManager } from "@/components/admin/skill-manager";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminSkillsPage() {
  const [snapshot, session] = await Promise.all([
    getAdminSnapshot(),
    getAdminSessionState(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Skills"
        title="Manage expertise categories"
        description="Update the skills grid, adjust proficiencies, and tune which capabilities are visible to recruiters."
      />
      <SkillManager skills={snapshot.skills} demoMode={session?.mode === "demo"} />
    </div>
  );
}
