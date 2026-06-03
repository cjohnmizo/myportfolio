import type { Metadata } from "next";

import { PublicHome } from "@/components/portfolio/public-home";
import { StructuredData } from "@/components/portfolio/structured-data";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getPortfolioSnapshot();
  const searchTitle = snapshot.settings.seoTitle;

  return {
    title: {
      absolute: searchTitle,
    },
    description: snapshot.settings.seoDescription,
    keywords: [
      snapshot.profile.fullName,
      snapshot.profile.headline,
      siteConfig.shortName,
      ...siteConfig.alternateNames,
      ...siteConfig.keywords,
    ],
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      title: searchTitle,
      description: snapshot.settings.seoDescription,
      url: siteConfig.url,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: searchTitle,
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
          identifier: siteConfig.shortName,
          mainEntityOfPage: siteConfig.url,
          sameAs: snapshot.socialLinks.map((link) => link.url),
          knowsAbout: snapshot.skills.map((skill) => skill.name),
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          alternateName: [siteConfig.shortName, ...siteConfig.alternateNames],
          url: siteConfig.url,
          description: snapshot.settings.seoDescription,
        }}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: `${snapshot.profile.fullName} Portfolio`,
          url: siteConfig.url,
          description: snapshot.settings.seoDescription,
          mainEntity: {
            "@type": "Person",
            name: snapshot.profile.fullName,
            alternateName: siteConfig.alternateNames,
            url: siteConfig.url,
          },
        }}
      />
      <PublicHome snapshot={snapshot} />
    </>
  );
}
