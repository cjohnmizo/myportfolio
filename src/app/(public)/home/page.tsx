import type { Metadata } from "next";

import { HomeCommandCenter } from "@/components/portfolio/mission-ui";
import { StructuredData } from "@/components/portfolio/structured-data";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getPortfolioSnapshot();

  return {
    title: "Command Center",
    description: snapshot.settings.seoDescription,
    alternates: {
      canonical: `${siteConfig.url}/home`,
    },
    openGraph: {
      title: snapshot.settings.seoTitle,
      description: snapshot.settings.seoDescription,
      url: `${siteConfig.url}/home`,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: snapshot.settings.seoTitle,
      description: snapshot.settings.seoDescription,
      images: [`${siteConfig.url}/twitter-image`],
    },
  };
}

export default async function HomePage() {
  const snapshot = await getPortfolioSnapshot();

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: snapshot.profile.fullName,
          alternateName: siteConfig.alternateNames,
          jobTitle: snapshot.profile.headline,
          description: snapshot.settings.seoDescription,
          email: snapshot.profile.email,
          url: siteConfig.url,
          image: `${siteConfig.url}${snapshot.profile.avatarUrl}`,
          sameAs: snapshot.socialLinks.map((link) => link.url),
          knowsAbout: snapshot.skills.map((skill) => skill.name),
        }}
      />
      <HomeCommandCenter snapshot={snapshot} />
    </>
  );
}
