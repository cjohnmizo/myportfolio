import type { Metadata } from "next";

import { ProjectsMission } from "@/components/portfolio/mission-ui";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mission Archive",
  description:
    "Project mission archive for Liankhawpui, TZ Coaching LMS, Gaby Farm, Smart Modern Admin Dashboard, and Tualchher CMS.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default async function ProjectsPage() {
  const snapshot = await getPortfolioSnapshot();

  return <ProjectsMission projects={snapshot.projects} />;
}
