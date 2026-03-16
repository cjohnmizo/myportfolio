import type { MetadataRoute } from "next";

import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const snapshot = await getPortfolioSnapshot();
  const staticRoutes: Array<{
    route: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { route: "", changeFrequency: "weekly", priority: 1 },
    { route: "/projects", changeFrequency: "monthly", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((item) => ({
      url: `${siteConfig.url}${item.route}`,
      lastModified: new Date(),
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    })),
    ...snapshot.projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
