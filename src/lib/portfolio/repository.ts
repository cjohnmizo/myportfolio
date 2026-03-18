import { unstable_noStore as noStore } from "next/cache";

import { env } from "@/lib/env";
import { resolveResumeUrl } from "@/lib/resume";
import { portfolioSeed } from "@/lib/portfolio/seeds";
import { createPublicSupabaseClient } from "@/lib/supabase/public";
import { sortByOrder } from "@/lib/utils";
import type {
  Metric,
  PortfolioSnapshot,
  Project,
  SocialPlatform,
} from "@/types/portfolio";
import type { Database } from "@/types/supabase";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectTechStackRow = Database["public"]["Tables"]["project_tech_stack"]["Row"];
type SkillRow = Database["public"]["Tables"]["skills"]["Row"];
type ExperienceRow = Database["public"]["Tables"]["experiences"]["Row"];
type EducationRow = Database["public"]["Tables"]["education"]["Row"];
type SocialLinkRow = Database["public"]["Tables"]["social_links"]["Row"];

function getSeedSnapshot(): PortfolioSnapshot {
  return {
    ...portfolioSeed,
    featuredProjects: sortByOrder(
      portfolioSeed.projects.filter((project) => project.isFeatured && project.isPublished),
    ),
    projects: sortByOrder(portfolioSeed.projects),
    skills: sortByOrder(portfolioSeed.skills),
    experiences: sortByOrder(portfolioSeed.experiences),
    education: sortByOrder(portfolioSeed.education),
    socialLinks: sortByOrder(portfolioSeed.socialLinks),
  };
}

function mapProjectMetrics(value: unknown): Metric[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value as Metric[];
}

export async function getPortfolioSnapshot(): Promise<PortfolioSnapshot> {
  noStore();
  if (!env.isSupabaseConfigured) {
    return getSeedSnapshot();
  }

  const supabase = createPublicSupabaseClient();

  if (!supabase) {
    return getSeedSnapshot();
  }

  const responses = await Promise.all([
    supabase.from("profiles").select("*").limit(1).single(),
    supabase.from("site_settings").select("*").limit(1).single(),
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("project_tech_stack").select("*").order("sort_order"),
    supabase.from("skills").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("experiences").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("education").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("social_links").select("*").eq("is_published", true).order("sort_order"),
  ]);

  const profileResult = responses[0] as { data: ProfileRow | null; error: Error | null };
  const settingsResult = responses[1] as { data: SiteSettingsRow | null; error: Error | null };
  const projectsResult = responses[2] as { data: ProjectRow[] | null; error: Error | null };
  const techStackResult = responses[3] as {
    data: ProjectTechStackRow[] | null;
    error: Error | null;
  };
  const skillsResult = responses[4] as { data: SkillRow[] | null; error: Error | null };
  const experiencesResult = responses[5] as {
    data: ExperienceRow[] | null;
    error: Error | null;
  };
  const educationResult = responses[6] as {
    data: EducationRow[] | null;
    error: Error | null;
  };
  const socialLinksResult = responses[7] as {
    data: SocialLinkRow[] | null;
    error: Error | null;
  };

  if (
    profileResult.error ||
    settingsResult.error ||
    projectsResult.error ||
    techStackResult.error ||
    skillsResult.error ||
    experiencesResult.error ||
    educationResult.error ||
    socialLinksResult.error ||
    !profileResult.data ||
    !settingsResult.data
  ) {
    return getSeedSnapshot();
  }

  const techStackByProject = new Map<string, string[]>();

  for (const item of techStackResult.data ?? []) {
    const stack = techStackByProject.get(item.project_id) ?? [];
    stack.push(item.label);
    techStackByProject.set(item.project_id, stack);
  }
  const resolvedResumeUrl = await resolveResumeUrl(profileResult.data.resume_url);

  const projects = (projectsResult.data ?? [])
    .filter((project) => project.is_published)
    .map<Project>((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      excerpt: project.excerpt,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      impact: project.impact,
      category: project.category as Project["category"],
      status: project.status,
      year: project.year,
      sortOrder: project.sort_order,
      isFeatured: project.is_featured,
      isPublished: project.is_published,
      coverImage: project.cover_image,
      galleryImages: project.gallery_images,
      demoUrl: project.demo_url,
      githubUrl: project.github_url,
      caseStudyUrl: project.case_study_url,
      techStack: techStackByProject.get(project.id) ?? [],
      metrics: mapProjectMetrics(project.metrics),
    }));

  return {
    profile: {
      id: profileResult.data.id,
      fullName: profileResult.data.full_name,
      headline: profileResult.data.headline,
      currentRole: profileResult.data.current_position,
      location: profileResult.data.location,
      email: profileResult.data.email,
      shortBio: profileResult.data.short_bio,
      longBio: profileResult.data.long_bio,
      avatarUrl: profileResult.data.avatar_url,
      resumeUrl: resolvedResumeUrl,
      githubUsername: profileResult.data.github_username,
      yearsExperience: profileResult.data.years_experience,
      isAvailableForHire: profileResult.data.is_available_for_hire,
      metrics: portfolioSeed.profile.metrics,
    },
    settings: {
      id: settingsResult.data.id,
      heroEyebrow: settingsResult.data.hero_eyebrow,
      heroTitle: settingsResult.data.hero_title,
      heroSubtitle: settingsResult.data.hero_subtitle,
      heroDescription: settingsResult.data.hero_description,
      aboutTitle: settingsResult.data.about_title,
      aboutBody: settingsResult.data.about_body,
      contactTitle: settingsResult.data.contact_title,
      contactDescription: settingsResult.data.contact_description,
      seoTitle: settingsResult.data.seo_title,
      seoDescription: settingsResult.data.seo_description,
      footerNote: settingsResult.data.footer_note,
      primaryAccent: settingsResult.data.primary_accent,
      secondaryAccent: settingsResult.data.secondary_accent,
    },
    featuredProjects: projects.filter((project) => project.isFeatured),
    projects,
    skills: (skillsResult.data ?? []).map((skill) => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon,
      sortOrder: skill.sort_order,
      isPublished: skill.is_published,
    })),
    experiences: (experiencesResult.data ?? []).map((experience) => ({
      id: experience.id,
      company: experience.company,
      role: experience.role,
      location: experience.location,
      employmentType: experience.employment_type,
      startDate: experience.start_date,
      endDate: experience.end_date,
      summary: experience.summary,
      achievements: experience.achievements,
      techStack: experience.tech_stack,
      sortOrder: experience.sort_order,
      isPublished: experience.is_published,
    })),
    education: (educationResult.data ?? []).map((item) => ({
      id: item.id,
      institution: item.institution,
      degree: item.degree,
      field: item.field,
      startDate: item.start_date,
      endDate: item.end_date,
      location: item.location,
      grade: item.grade,
      description: item.description,
      sortOrder: item.sort_order,
      isPublished: item.is_published,
    })),
    socialLinks: (socialLinksResult.data ?? []).map((socialLink) => ({
      id: socialLink.id,
      label: socialLink.label,
      platform: socialLink.platform as SocialPlatform,
      url: socialLink.url,
      sortOrder: socialLink.sort_order,
      isPublished: socialLink.is_published,
    })),
  };
}

export async function getProjectBySlug(slug: string) {
  const snapshot = await getPortfolioSnapshot();
  return snapshot.projects.find((project) => project.slug === slug) ?? null;
}
