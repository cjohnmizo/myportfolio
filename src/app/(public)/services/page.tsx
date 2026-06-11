import type { Metadata } from "next";

import {
  SystemsMission,
  TrustMissionSection,
} from "@/components/portfolio/mission-ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Systems I Build",
  description:
    "Mission-style overview of websites, LMS platforms, admin dashboards, mobile apps, CMS tools, and practical systems built by C. John Remthang.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <SystemsMission />
      <TrustMissionSection />
    </>
  );
}
