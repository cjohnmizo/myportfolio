import type { Metadata } from "next";

import { PublicHome } from "@/components/portfolio/public-home";
import { StructuredData } from "@/components/portfolio/structured-data";
import { getGitHubActivity } from "@/lib/portfolio/github";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getPortfolioSnapshot();

  return {
    title: snapshot.settings.seoTitle,
    description: snapshot.settings.seoDescription,
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
  const [snapshot, githubActivity] = await Promise.all([
    getPortfolioSnapshot(),
    getGitHubActivity(),
  ]);

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
      <PublicHome snapshot={snapshot} githubActivity={githubActivity} />
    </>
  );
}
