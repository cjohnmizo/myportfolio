import type { Metadata } from "next";

import { ContactMission } from "@/components/portfolio/mission-ui";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transmission Terminal",
  description:
    "Contact C. John Remthang for school websites, LMS platforms, NGO systems, dashboards, and mobile app projects.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default async function ContactPage() {
  const snapshot = await getPortfolioSnapshot();

  return <ContactMission snapshot={snapshot} />;
}
