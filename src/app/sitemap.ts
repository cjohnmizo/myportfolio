import type { MetadataRoute } from "next";

import { getProjectMissionHref } from "@/lib/portfolio/project-routes";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

const lastModified = new Date("2026-06-11T00:00:00.000Z");

const missionPages = [
  { path: "/home", priority: 0.95 },
  { path: "/about", priority: 0.75 },
  { path: "/services", priority: 0.78 },
  { path: "/projects", priority: 0.86 },
  { path: "/skills", priority: 0.7 },
  { path: "/experience", priority: 0.7 },
  { path: "/contact", priority: 0.76 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const snapshot = await getPortfolioSnapshot();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...missionPages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...snapshot.projects.map((project) => ({
      url: `${siteConfig.url}${getProjectMissionHref(project)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
