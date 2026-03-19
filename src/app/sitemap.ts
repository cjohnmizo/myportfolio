import type { MetadataRoute } from "next";

import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import type { Database } from "@/types/supabase";

type TimestampedRow = { updated_at: string };
type ProjectSitemapRow = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "id" | "slug" | "updated_at" | "is_published"
>;
type ProjectTechStackRow = Pick<
  Database["public"]["Tables"]["project_tech_stack"]["Row"],
  "project_id" | "created_at"
>;

const seedLastModified = new Date("2026-03-18T00:00:00.000Z");

function getLatestDate(
  values: Array<string | Date | null | undefined>,
  fallback = seedLastModified,
) {
  const timestamps = values
    .map((value) => (value ? new Date(value) : null))
    .filter((value): value is Date => {
      if (!value) {
        return false;
      }

      return !Number.isNaN(value.getTime());
    });

  if (timestamps.length === 0) {
    return fallback;
  }

  return new Date(Math.max(...timestamps.map((value) => value.getTime())));
}

function buildSeedSitemap(snapshot: Awaited<ReturnType<typeof getPortfolioSnapshot>>) {
  return [
    {
      url: siteConfig.url,
      lastModified: seedLastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: seedLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: seedLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...snapshot.projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: seedLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicSupabaseClient();

  if (!supabase) {
    return buildSeedSitemap(await getPortfolioSnapshot());
  }

  const [
    profileResult,
    settingsResult,
    projectsResult,
    skillsResult,
    experiencesResult,
    educationResult,
    socialLinksResult,
    techStackResult,
  ] = await Promise.all([
    supabase.from("profiles").select("updated_at").limit(1).single(),
    supabase.from("site_settings").select("updated_at").limit(1).single(),
    supabase.from("projects").select("id, slug, updated_at, is_published").order("sort_order"),
    supabase.from("skills").select("updated_at").eq("is_published", true),
    supabase.from("experiences").select("updated_at").eq("is_published", true),
    supabase.from("education").select("updated_at").eq("is_published", true),
    supabase.from("social_links").select("updated_at").eq("is_published", true),
    supabase.from("project_tech_stack").select("project_id, created_at"),
  ]);

  if (
    profileResult.error ||
    settingsResult.error ||
    projectsResult.error ||
    skillsResult.error ||
    experiencesResult.error ||
    educationResult.error ||
    socialLinksResult.error ||
    techStackResult.error ||
    !profileResult.data ||
    !settingsResult.data
  ) {
    return buildSeedSitemap(await getPortfolioSnapshot());
  }

  const publishedProjects = ((projectsResult.data ?? []) as ProjectSitemapRow[]).filter(
    (project) => project.is_published,
  );
  const techStackByProject = new Map<string, string[]>();

  for (const item of (techStackResult.data ?? []) as ProjectTechStackRow[]) {
    const timestamps = techStackByProject.get(item.project_id) ?? [];
    timestamps.push(item.created_at);
    techStackByProject.set(item.project_id, timestamps);
  }

  const homeLastModified = getLatestDate([
    (profileResult.data as TimestampedRow).updated_at,
    (settingsResult.data as TimestampedRow).updated_at,
    ...((skillsResult.data ?? []) as TimestampedRow[]).map((item) => item.updated_at),
    ...((experiencesResult.data ?? []) as TimestampedRow[]).map((item) => item.updated_at),
    ...((educationResult.data ?? []) as TimestampedRow[]).map((item) => item.updated_at),
    ...((socialLinksResult.data ?? []) as TimestampedRow[]).map((item) => item.updated_at),
    ...publishedProjects.map((project) => project.updated_at),
    ...((techStackResult.data ?? []) as ProjectTechStackRow[]).map((item) => item.created_at),
  ]);

  const projectsLastModified = getLatestDate(
    [
      ...publishedProjects.map((project) => project.updated_at),
      ...((techStackResult.data ?? []) as ProjectTechStackRow[]).map((item) => item.created_at),
    ],
    homeLastModified,
  );

  return [
    {
      url: siteConfig.url,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: projectsLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...publishedProjects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: getLatestDate(
        [project.updated_at, ...(techStackByProject.get(project.id) ?? [])],
        projectsLastModified,
      ),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
