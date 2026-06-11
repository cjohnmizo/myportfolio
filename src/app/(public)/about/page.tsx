import type { Metadata } from "next";

import { AboutMission } from "@/components/portfolio/mission-ui";
import { StructuredData } from "@/components/portfolio/structured-data";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getPortfolioSnapshot();

  return {
    title: "Origin Mission",
    description: snapshot.profile.longBio,
    alternates: {
      canonical: `${siteConfig.url}/about`,
    },
    openGraph: {
      title: `Origin Mission | ${snapshot.profile.fullName}`,
      description: snapshot.profile.longBio,
      url: `${siteConfig.url}/about`,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: `Origin Mission | ${snapshot.profile.fullName}`,
      description: snapshot.profile.longBio,
      images: [`${siteConfig.url}/twitter-image`],
    },
  };
}

export default async function AboutPage() {
  const snapshot = await getPortfolioSnapshot();

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `Origin Mission - ${snapshot.profile.fullName}`,
          url: `${siteConfig.url}/about`,
          description: snapshot.profile.longBio,
          mainEntity: {
            "@type": "Person",
            name: snapshot.profile.fullName,
            alternateName: siteConfig.alternateNames,
            jobTitle: snapshot.profile.headline,
            email: snapshot.profile.email,
            url: siteConfig.url,
            sameAs: snapshot.socialLinks.map((link) => link.url),
          },
        }}
      />
      <AboutMission snapshot={snapshot} />
    </>
  );
}
