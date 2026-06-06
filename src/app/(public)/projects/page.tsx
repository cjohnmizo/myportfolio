import type { Metadata } from "next";

import { ProjectsExplorer } from "@/components/portfolio/projects-explorer";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore websites, Android apps, LMS platforms, dashboards, Laravel systems, and practical UI work by C. John Mizo.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default async function ProjectsPage() {
  const snapshot = await getPortfolioSnapshot();

  return (
    <main className="dashboard-band py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Project archive"
          title="Case files for web, LMS, Android, Laravel, and UI work"
          description="Browse selected work by project, category, or stack. Private client projects are marked clearly, and live links appear only where they are real."
        />
        <ProjectsExplorer projects={snapshot.projects} />
      </div>
    </main>
  );
}
