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
    <main className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Project archive"
          title="Practical builds for web, mobile, learning, and admin work"
          description="Browse selected projects by name, category, or stack. Each card keeps the description short and links only to available public resources."
        />
        <ProjectsExplorer projects={snapshot.projects} />
      </div>
    </main>
  );
}
