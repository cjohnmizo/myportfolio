import { unstable_noStore as noStore } from "next/cache";

import { portfolioSeed } from "@/lib/portfolio/seeds";
import { normalizeResumeValue } from "@/lib/resume";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";
import { sortByOrder } from "@/lib/utils";
import type { MediaAsset, PortfolioSnapshot } from "@/types/portfolio";
import type { Database } from "@/types/supabase";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];
type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectTechStackRow = Database["public"]["Tables"]["project_tech_stack"]["Row"];
type SkillRow = Database["public"]["Tables"]["skills"]["Row"];
type ExperienceRow = Database["public"]["Tables"]["experiences"]["Row"];
type EducationRow = Database["public"]["Tables"]["education"]["Row"];
type SocialLinkRow = Database["public"]["Tables"]["social_links"]["Row"];
type MediaAssetRow = Database["public"]["Tables"]["media_assets"]["Row"];

function mapProjectMetrics(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value as PortfolioSnapshot["projects"][number]["metrics"];
}

export interface AdminSnapshot extends PortfolioSnapshot {
  mediaAssets: MediaAsset[];
}

function getDemoSnapshot(): AdminSnapshot {
  return {
    ...portfolioSeed,
    featuredProjects: sortByOrder(portfolioSeed.projects.filter((project) => project.isFeatured)),
    projects: sortByOrder(portfolioSeed.projects),
    skills: sortByOrder(portfolioSeed.skills),
    experiences: sortByOrder(portfolioSeed.experiences),
    education: sortByOrder(portfolioSeed.education),
    socialLinks: sortByOrder(portfolioSeed.socialLinks),
    mediaAssets: [],
  };
}

export async function getAdminSnapshot(): Promise<AdminSnapshot> {
  noStore();
  const supabase = createServiceRoleSupabaseClient();

  if (!supabase) {
    return getDemoSnapshot();
  }

  const responses = await Promise.all([
    supabase.from("profiles").select("*").limit(1).single(),
    supabase.from("site_settings").select("*").limit(1).single(),
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("project_tech_stack").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("social_links").select("*").order("sort_order"),
    supabase.from("media_assets").select("*").order("created_at", { ascending: false }),
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
  const mediaResult = responses[8] as { data: MediaAssetRow[] | null; error: Error | null };

  if (
    profileResult.error ||
    settingsResult.error ||
    projectsResult.error ||
    techStackResult.error ||
    skillsResult.error ||
    experiencesResult.error ||
    educationResult.error ||
    socialLinksResult.error ||
    mediaResult.error ||
    !profileResult.data ||
    !settingsResult.data
  ) {
    return getDemoSnapshot();
  }

  const techStackByProject = new Map<string, string[]>();

  for (const item of techStackResult.data ?? []) {
    const stack = techStackByProject.get(item.project_id) ?? [];
    stack.push(item.label);
    techStackByProject.set(item.project_id, stack);
  }

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
      resumeUrl: normalizeResumeValue(profileResult.data.resume_url),
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
    featuredProjects: (projectsResult.data ?? [])
      .filter((project) => project.is_featured)
      .map((project) => ({
        id: project.id,
        slug: project.slug,
        title: project.title,
        excerpt: project.excerpt,
        description: project.description,
        challenge: project.challenge,
        solution: project.solution,
        impact: project.impact,
        category: project.category as PortfolioSnapshot["projects"][number]["category"],
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
      })),
    projects: (projectsResult.data ?? []).map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      excerpt: project.excerpt,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      impact: project.impact,
      category: project.category as PortfolioSnapshot["projects"][number]["category"],
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
    })),
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
      platform: socialLink.platform as PortfolioSnapshot["socialLinks"][number]["platform"],
      url: socialLink.url,
      sortOrder: socialLink.sort_order,
      isPublished: socialLink.is_published,
    })),
    mediaAssets: (mediaResult.data ?? []).map((asset) => ({
      id: asset.id,
      bucket: asset.bucket,
      path: asset.path,
      publicUrl: asset.public_url,
      altText: asset.alt_text,
      createdAt: asset.created_at,
    })),
  };
}
