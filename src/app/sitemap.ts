import type { MetadataRoute } from "next";

import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

const lastModified = new Date("2026-06-04T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const snapshot = await getPortfolioSnapshot();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...snapshot.projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
