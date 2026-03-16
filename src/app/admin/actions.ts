"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import { env } from "@/lib/env";
import { getAdminSessionState } from "@/lib/supabase/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";
import type { Metric } from "@/types/portfolio";
import type { Database } from "@/types/supabase";
import {
  educationFormSchema,
  experienceFormSchema,
  loginFormSchema,
  mediaAssetFormSchema,
  profileFormSchema,
  projectFormSchema,
  siteSettingsFormSchema,
  skillFormSchema,
  socialLinkFormSchema,
  type EducationFormValues,
  type ExperienceFormValues,
  type LoginFormValues,
  type MediaAssetFormValues,
  type ProfileFormValues,
  type ProjectFormValues,
  type SiteSettingsFormValues,
  type SkillFormValues,
  type SocialLinkFormValues,
} from "@/validators/admin";

export interface ActionResult {
  status: "success" | "error";
  message: string;
}

function success(message: string): ActionResult {
  return { status: "success", message };
}

function error(message: string): ActionResult {
  return { status: "error", message };
}

function normalizeOptional(value?: string) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMetrics(value: string): Metric[] {
  return parseLines(value)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      const metricValue = rest.join(":").trim();

      if (!label || !metricValue) {
        return null;
      }

      return {
        label: label.trim(),
        value: metricValue,
      };
    })
    .filter((item): item is Metric => Boolean(item));
}

async function getAdminServiceClient() {
  if (!env.isSupabaseConfigured) {
    return null;
  }

  const session = await getAdminSessionState();

  if (!session || session.mode !== "authenticated") {
    return null;
  }

  return createServiceRoleSupabaseClient();
}

function revalidatePortfolioRoutes(projectSlug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/skills");
  revalidatePath("/admin/experience");
  revalidatePath("/admin/education");
  revalidatePath("/admin/social-links");
  revalidatePath("/admin/settings");
  revalidatePath("/admin/media");

  if (projectSlug) {
    revalidatePath(`/projects/${projectSlug}`);
  }
}

export async function signInAction(values: LoginFormValues): Promise<ActionResult> {
  const parsed = loginFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Invalid login details.");
  }

  if (!env.isSupabaseConfigured) {
    return error("Supabase is not configured yet. The CMS is currently in demo mode.");
  }

  const supabase = await createServerSupabaseClient();
  const { error: authError, data } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (authError) {
    return error(authError.message);
  }

  const serviceClient = createServiceRoleSupabaseClient();

  if (!serviceClient) {
    return error("Service role configuration is missing.");
  }

  const { data: profile } = await serviceClient
    .from("profiles")
    .select("is_admin")
    .eq("id", data.user.id)
    .single();

  if (!profile?.is_admin) {
    await supabase.auth.signOut();
    return error("This account does not have admin access.");
  }

  revalidatePath("/admin");
  return success("Signed in successfully.");
}

export async function signOutAction() {
  if (!env.isSupabaseConfigured) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/admin");
}

export async function saveProfileAction(values: ProfileFormValues): Promise<ActionResult> {
  const parsed = profileFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Profile data is invalid.");
  }

  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const sessionClient = await createServerSupabaseClient();
  const {
    data: { user },
  } = await sessionClient.auth.getUser();
  const profileId = parsed.data.id || user?.id;

  if (!profileId) {
    return error("Unable to resolve the profile record.");
  }

  const { error: upsertError } = await client.from("profiles").upsert({
    id: profileId,
    full_name: parsed.data.fullName,
    headline: parsed.data.headline,
    current_position: parsed.data.currentRole,
    location: parsed.data.location,
    email: parsed.data.email,
    short_bio: parsed.data.shortBio,
    long_bio: parsed.data.longBio,
    avatar_url: parsed.data.avatarUrl,
    resume_url: normalizeOptional(parsed.data.resumeUrl),
    github_username: parsed.data.githubUsername,
    years_experience: parsed.data.yearsExperience,
    is_available_for_hire: parsed.data.isAvailableForHire,
  });

  if (upsertError) {
    return error(upsertError.message);
  }

  revalidatePortfolioRoutes();
  return success("Profile saved.");
}

export async function saveSiteSettingsAction(
  values: SiteSettingsFormValues,
): Promise<ActionResult> {
  const parsed = siteSettingsFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Site settings are invalid.");
  }

  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const settingsId = parsed.data.id || randomUUID();
  const { error: upsertError } = await client.from("site_settings").upsert({
    id: settingsId,
    hero_eyebrow: parsed.data.heroEyebrow,
    hero_title: parsed.data.heroTitle,
    hero_subtitle: parsed.data.heroSubtitle,
    hero_description: parsed.data.heroDescription,
    about_title: parsed.data.aboutTitle,
    about_body: parsed.data.aboutBody,
    contact_title: parsed.data.contactTitle,
    contact_description: parsed.data.contactDescription,
    seo_title: parsed.data.seoTitle,
    seo_description: parsed.data.seoDescription,
    footer_note: parsed.data.footerNote,
    primary_accent: parsed.data.primaryAccent,
    secondary_accent: parsed.data.secondaryAccent,
  });

  if (upsertError) {
    return error(upsertError.message);
  }

  revalidatePortfolioRoutes();
  return success("Site settings saved.");
}

export async function saveProjectAction(values: ProjectFormValues): Promise<ActionResult> {
  const parsed = projectFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Project data is invalid.");
  }

  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const projectId = parsed.data.id || randomUUID();
  const payload = {
    id: projectId,
    slug: parsed.data.slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    description: parsed.data.description,
    challenge: parsed.data.challenge,
    solution: parsed.data.solution,
    impact: parsed.data.impact,
    category: parsed.data.category,
    status: parsed.data.status,
    year: parsed.data.year,
    sort_order: parsed.data.sortOrder,
    is_featured: parsed.data.isFeatured,
    is_published: parsed.data.isPublished,
    cover_image: parsed.data.coverImage,
    gallery_images: parseLines(parsed.data.galleryImagesText),
    demo_url: normalizeOptional(parsed.data.demoUrl),
    github_url: normalizeOptional(parsed.data.githubUrl),
    case_study_url: normalizeOptional(parsed.data.caseStudyUrl),
    metrics:
      parseMetrics(parsed.data.metricsText) as unknown as Database["public"]["Tables"]["projects"]["Insert"]["metrics"],
  };

  const { error: upsertError } = await client.from("projects").upsert(payload);

  if (upsertError) {
    return error(upsertError.message);
  }

  const { error: deleteError } = await client
    .from("project_tech_stack")
    .delete()
    .eq("project_id", projectId);

  if (deleteError) {
    return error(deleteError.message);
  }

  const techStack = parseLines(parsed.data.techStackText);

  if (techStack.length > 0) {
    const { error: insertError } = await client.from("project_tech_stack").insert(
      techStack.map((label, index) => ({
        project_id: projectId,
        label,
        sort_order: index,
      })),
    );

    if (insertError) {
      return error(insertError.message);
    }
  }

  revalidatePortfolioRoutes(parsed.data.slug);
  return success("Project saved.");
}

export async function deleteProjectAction(projectId: string, projectSlug?: string): Promise<ActionResult> {
  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: deleteError } = await client.from("projects").delete().eq("id", projectId);

  if (deleteError) {
    return error(deleteError.message);
  }

  revalidatePortfolioRoutes(projectSlug);
  return success("Project deleted.");
}

export async function saveSkillAction(values: SkillFormValues): Promise<ActionResult> {
  const parsed = skillFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Skill data is invalid.");
  }

  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: upsertError } = await client.from("skills").upsert({
    id: parsed.data.id || randomUUID(),
    name: parsed.data.name,
    category: parsed.data.category,
    proficiency: parsed.data.proficiency,
    icon: parsed.data.icon,
    sort_order: parsed.data.sortOrder,
    is_published: parsed.data.isPublished,
  });

  if (upsertError) {
    return error(upsertError.message);
  }

  revalidatePortfolioRoutes();
  return success("Skill saved.");
}

export async function deleteSkillAction(skillId: string): Promise<ActionResult> {
  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: deleteError } = await client.from("skills").delete().eq("id", skillId);

  if (deleteError) {
    return error(deleteError.message);
  }

  revalidatePortfolioRoutes();
  return success("Skill deleted.");
}

export async function saveExperienceAction(
  values: ExperienceFormValues,
): Promise<ActionResult> {
  const parsed = experienceFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Experience data is invalid.");
  }

  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: upsertError } = await client.from("experiences").upsert({
    id: parsed.data.id || randomUUID(),
    company: parsed.data.company,
    role: parsed.data.role,
    location: parsed.data.location,
    employment_type: parsed.data.employmentType,
    start_date: parsed.data.startDate,
    end_date: normalizeOptional(parsed.data.endDate),
    summary: parsed.data.summary,
    achievements: parseLines(parsed.data.achievementsText),
    tech_stack: parseLines(parsed.data.techStackText),
    sort_order: parsed.data.sortOrder,
    is_published: parsed.data.isPublished,
  });

  if (upsertError) {
    return error(upsertError.message);
  }

  revalidatePortfolioRoutes();
  return success("Experience saved.");
}

export async function deleteExperienceAction(experienceId: string): Promise<ActionResult> {
  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: deleteError } = await client
    .from("experiences")
    .delete()
    .eq("id", experienceId);

  if (deleteError) {
    return error(deleteError.message);
  }

  revalidatePortfolioRoutes();
  return success("Experience deleted.");
}

export async function saveEducationAction(
  values: EducationFormValues,
): Promise<ActionResult> {
  const parsed = educationFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Education data is invalid.");
  }

  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: upsertError } = await client.from("education").upsert({
    id: parsed.data.id || randomUUID(),
    institution: parsed.data.institution,
    degree: parsed.data.degree,
    field: parsed.data.field,
    location: parsed.data.location,
    start_date: parsed.data.startDate,
    end_date: normalizeOptional(parsed.data.endDate),
    grade: parsed.data.grade,
    description: parsed.data.description,
    sort_order: parsed.data.sortOrder,
    is_published: parsed.data.isPublished,
  });

  if (upsertError) {
    return error(upsertError.message);
  }

  revalidatePortfolioRoutes();
  return success("Education record saved.");
}

export async function deleteEducationAction(educationId: string): Promise<ActionResult> {
  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: deleteError } = await client.from("education").delete().eq("id", educationId);

  if (deleteError) {
    return error(deleteError.message);
  }

  revalidatePortfolioRoutes();
  return success("Education record deleted.");
}

export async function saveSocialLinkAction(
  values: SocialLinkFormValues,
): Promise<ActionResult> {
  const parsed = socialLinkFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Social link data is invalid.");
  }

  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: upsertError } = await client.from("social_links").upsert({
    id: parsed.data.id || randomUUID(),
    label: parsed.data.label,
    platform: parsed.data.platform,
    url: parsed.data.url,
    sort_order: parsed.data.sortOrder,
    is_published: parsed.data.isPublished,
  });

  if (upsertError) {
    return error(upsertError.message);
  }

  revalidatePortfolioRoutes();
  return success("Social link saved.");
}

export async function deleteSocialLinkAction(socialLinkId: string): Promise<ActionResult> {
  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: deleteError } = await client
    .from("social_links")
    .delete()
    .eq("id", socialLinkId);

  if (deleteError) {
    return error(deleteError.message);
  }

  revalidatePortfolioRoutes();
  return success("Social link deleted.");
}

export async function saveMediaAssetAction(
  values: MediaAssetFormValues,
): Promise<ActionResult> {
  const parsed = mediaAssetFormSchema.safeParse(values);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message ?? "Media asset data is invalid.");
  }

  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: upsertError } = await client.from("media_assets").upsert({
    id: parsed.data.id || randomUUID(),
    bucket: parsed.data.bucket,
    path: parsed.data.path,
    public_url: parsed.data.publicUrl,
    alt_text: parsed.data.altText,
  });

  if (upsertError) {
    return error(upsertError.message);
  }

  revalidatePortfolioRoutes();
  return success("Media asset saved.");
}

export async function deleteMediaAssetAction(mediaAssetId: string): Promise<ActionResult> {
  const client = await getAdminServiceClient();

  if (!client) {
    return error("Admin actions are unavailable until Supabase is configured.");
  }

  const { error: deleteError } = await client
    .from("media_assets")
    .delete()
    .eq("id", mediaAssetId);

  if (deleteError) {
    return error(deleteError.message);
  }

  revalidatePortfolioRoutes();
  return success("Media asset removed.");
}
