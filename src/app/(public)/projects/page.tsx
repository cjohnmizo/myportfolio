import type { Metadata } from "next";

import { ProjectsExplorer } from "@/components/portfolio/projects-explorer";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore portfolio projects, case studies, and technical builds by C. John Remthang.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default async function ProjectsPage() {
  const snapshot = await getPortfolioSnapshot();

  return (
    <main
      data-dashboard-label="Project archive"
      className="dashboard-band py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Project archive"
          title="Cinematic case files for web, LMS, mobile, and dashboard work"
          description="Browse selected work by project, category, or stack. Private client projects are marked clearly, with details available on request."
        />
        <ProjectsExplorer projects={snapshot.projects} />
      </div>
    </main>
  );
}
