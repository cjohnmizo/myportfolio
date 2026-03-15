import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";
import { getAdminSessionState } from "@/lib/supabase/auth";

export default async function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [snapshot, session] = await Promise.all([
    getAdminSnapshot(),
    getAdminSessionState(),
  ]);
  const project = snapshot.projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Projects"
        title={`Edit ${project.title}`}
        description="Update narrative, media references, publish state, and featured visibility for this case study."
      />
      <ProjectForm project={project} demoMode={session?.mode === "demo"} />
    </div>
  );
}
