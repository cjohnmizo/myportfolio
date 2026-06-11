import { portfolioSeed } from "@/lib/portfolio/seeds";
import { resolveProjectSlug } from "@/lib/portfolio/project-routes";
import { sortByOrder } from "@/lib/utils";
import type { PortfolioSnapshot } from "@/types/portfolio";

function getSeedSnapshot(): PortfolioSnapshot {
  const projects = sortByOrder(
    portfolioSeed.projects.filter((project) => project.isPublished),
  );

  return {
    ...portfolioSeed,
    featuredProjects: sortByOrder(
      projects.filter((project) => project.isFeatured),
    ),
    projects,
    skills: sortByOrder(
      portfolioSeed.skills.filter((skill) => skill.isPublished),
    ),
    experiences: sortByOrder(
      portfolioSeed.experiences.filter((experience) => experience.isPublished),
    ),
    education: sortByOrder(
      portfolioSeed.education.filter((item) => item.isPublished),
    ),
    socialLinks: sortByOrder(
      portfolioSeed.socialLinks.filter((link) => link.isPublished),
    ),
  };
}

export async function getPortfolioSnapshot(): Promise<PortfolioSnapshot> {
  return getSeedSnapshot();
}

export async function getProjectBySlug(slug: string) {
  const snapshot = await getPortfolioSnapshot();
  const canonicalSlug = resolveProjectSlug(slug);

  return (
    snapshot.projects.find((project) => project.slug === canonicalSlug) ?? null
  );
}
