import type { Metadata } from "next";

import { ProjectsExplorer } from "@/components/portfolio/projects-explorer";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore portfolio projects, case studies, and technical builds by C. John Remthang.",
};

export default async function ProjectsPage() {
  const snapshot = await getPortfolioSnapshot();

  return (
    <main className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Project archive"
          title="Searchable case studies with category filters and flexible sorting"
          description="The full archive is optimized for recruiters and collaborators who want to scan outcomes quickly and dive deeper when a project is especially relevant."
        />
        <ProjectsExplorer projects={snapshot.projects} />
      </div>
    </main>
  );
}
