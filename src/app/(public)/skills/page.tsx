import type { Metadata } from "next";

import { SkillsMission } from "@/components/portfolio/mission-ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tech Arsenal",
  description:
    "Grouped frontend, backend, mobile, database, deployment, and focus-area skills for C. John Remthang.",
  alternates: {
    canonical: `${siteConfig.url}/skills`,
  },
};

export default function SkillsPage() {
  return <SkillsMission />;
}
