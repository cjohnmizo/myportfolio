import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProfileForm } from "@/components/admin/profile-form";
import { env } from "@/lib/env";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminProfilePage() {
  const [snapshot, session] = await Promise.all([
    getAdminSnapshot(),
    getAdminSessionState(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Profile"
        title="Edit public profile details"
        description="Manage the core personal record used across the hero, about section, contact surface, and recruiter-facing metadata."
      />
      <ProfileForm
        profile={snapshot.profile}
        demoMode={session?.mode === "demo"}
        aiEnabled={Boolean(env.OPENAI_API_KEY)}
        skillNames={snapshot.skills.map((skill) => skill.name)}
      />
    </div>
  );
}
