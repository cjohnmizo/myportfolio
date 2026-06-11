import type { Metadata } from "next";

import { ExperienceMission } from "@/components/portfolio/mission-ui";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journey Timeline",
  description:
    "Teaching, practical user experience, and developer journey timeline for C. John Remthang.",
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
};

export default async function ExperiencePage() {
  const snapshot = await getPortfolioSnapshot();

  return <ExperienceMission snapshot={snapshot} />;
}
