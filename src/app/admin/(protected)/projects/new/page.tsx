import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminSessionState } from "@/lib/supabase/auth";

const newProject = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  description: "",
  challenge: "",
  solution: "",
  impact: "",
  category: "web-app" as const,
  status: "Draft",
  year: String(new Date().getFullYear()),
  sortOrder: 0,
  isFeatured: false,
  isPublished: false,
  coverImage: "",
  galleryImages: [],
  demoUrl: "",
  githubUrl: "",
  caseStudyUrl: "",
  techStack: [],
  metrics: [],
};

export default async function AdminProjectNewPage() {
  const session = await getAdminSessionState();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Projects"
        title="Create a new project"
        description="Add a new case study, define the delivery story, and control how it appears across the portfolio."
      />
      <ProjectForm project={newProject} demoMode={session?.mode === "demo"} />
    </div>
  );
}
