import type { Project } from "@/types/portfolio";

export const projectMissionSlugs: Record<string, string> = {
  "liankhawpui-community-platform": "liankhawpui",
  "tz-coaching-lms": "tz-coaching",
  "gaby-farm": "gaby-farm",
  "smart-modern-admin-dashboard": "smad",
  "tualchher-cms": "tualchher-cms",
  "library-lms-tools": "library-lms-tools",
};

export const projectCanonicalSlugs = Object.fromEntries(
  Object.entries(projectMissionSlugs).map(([projectSlug, missionSlug]) => [
    missionSlug,
    projectSlug,
  ]),
);

export function getProjectMissionSlug(project: Project) {
  return projectMissionSlugs[project.slug] ?? project.slug;
}

export function getProjectMissionHref(project: Project) {
  return `/projects/${getProjectMissionSlug(project)}`;
}

export function resolveProjectSlug(slug: string) {
  return projectCanonicalSlugs[slug] ?? slug;
}
