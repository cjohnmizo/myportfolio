import type { Metadata } from "next";

import { PublicHome } from "@/components/portfolio/public-home";
import { StructuredData } from "@/components/portfolio/structured-data";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getPortfolioSnapshot();

  return {
    title: {
      absolute: snapshot.settings.seoTitle,
    },
    description: snapshot.settings.seoDescription,
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      title: snapshot.settings.seoTitle,
      description: snapshot.settings.seoDescription,
      url: siteConfig.url,
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
          jobTitle: snapshot.profile.headline,
          description: snapshot.settings.seoDescription,
          email: snapshot.profile.email,
          url: siteConfig.url,
          sameAs: snapshot.socialLinks.map((link) => link.url),
          knowsAbout: snapshot.skills.map((skill) => skill.name),
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: snapshot.settings.seoDescription,
        }}
      />
      <PublicHome snapshot={snapshot} />
    </>
  );
}
