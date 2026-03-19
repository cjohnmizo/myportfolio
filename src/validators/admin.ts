import { z } from "zod";

const optionalString = z.string().trim().optional().default("");
const optionalUuid = z
  .string()
  .trim()
  .refine((value) => value.length === 0 || z.string().uuid().safeParse(value).success, {
    message: "Invalid record identifier.",
  })
  .optional()
  .transform((value) => {
    if (!value) {
      return undefined;
    }

    return value.length > 0 ? value : undefined;
  });
const projectCategories = [
  "platform",
  "web-app",
  "mobile-app",
  "cms",
  "dashboard",
  "design-system",
] as const;
const socialPlatforms = [
  "github",
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "website",
] as const;

export const loginFormSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const profileFormSchema = z.object({
  id: optionalUuid,
  fullName: z.string().min(2),
  headline: z.string().min(8),
  currentRole: z.string().min(2),
  location: z.string().min(2),
  email: z.string().email(),
  shortBio: z.string().min(20),
  longBio: z.string().min(60),
  avatarUrl: z.string().min(1),
  resumeUrl: optionalString,
  githubUsername: z.string().min(2),
  yearsExperience: z.coerce.number().min(0).max(50),
  isAvailableForHire: z.boolean(),
});

export const profileGenerationSchema = z.object({
  fullName: z.string().min(2),
  currentRole: z.string().min(2),
  location: z.string().min(2),
  githubUsername: z.string().min(2),
  yearsExperience: z.coerce.number().min(0).max(50),
  skillNames: z.array(z.string().min(1)).default([]),
  brief: z.string().min(20, "Add a stronger brief so AI has enough direction."),
  tone: z.string().min(3),
  targetAudience: z.string().min(3),
  currentHeadline: optionalString,
  currentShortBio: optionalString,
  currentLongBio: optionalString,
});

export const siteSettingsFormSchema = z.object({
  id: optionalUuid,
  heroEyebrow: z.string().min(6),
  heroTitle: z.string().min(12),
  heroSubtitle: z.string().min(12),
  heroDescription: z.string().min(20),
  aboutTitle: z.string().min(6),
  aboutBody: z.string().min(20),
  contactTitle: z.string().min(6),
  contactDescription: z.string().min(20),
  seoTitle: z.string().min(10),
  seoDescription: z.string().min(20),
  footerNote: z.string().min(10),
  primaryAccent: z.string().min(4),
  secondaryAccent: z.string().min(4),
});

export const siteSettingsGenerationSchema = z.object({
  fullName: z.string().min(2),
  headline: z.string().min(6),
  currentRole: z.string().min(2),
  location: z.string().min(2),
  yearsExperience: z.coerce.number().min(0).max(50),
  brief: z.string().min(20, "Add a stronger brief so AI has enough direction."),
  tone: z.string().min(3),
  targetAudience: z.string().min(3),
});

export const projectGenerationSchema = z.object({
  fullName: z.string().min(2),
  headline: z.string().min(6),
  currentRole: z.string().min(2),
  title: z.string().min(3, "Add a project title before generating copy."),
  category: z.enum(projectCategories),
  status: z.string().min(2),
  year: z.string().regex(/^\d{4}$/),
  techStackText: z.string().min(2, "Add at least one technology before generating copy."),
  brief: z.string().min(20, "Add a stronger brief so AI has enough direction."),
  tone: z.string().min(3),
  targetAudience: z.string().min(3),
  currentExcerpt: optionalString,
  currentDescription: optionalString,
  currentChallenge: optionalString,
  currentSolution: optionalString,
  currentImpact: optionalString,
});

export const projectFormSchema = z.object({
  id: optionalUuid,
  slug: z.string().min(3),
  title: z.string().min(3),
  excerpt: z.string().min(20),
  description: z.string().min(30),
  challenge: z.string().min(20),
  solution: z.string().min(20),
  impact: z.string().min(20),
  category: z.enum(projectCategories),
  status: z.string().min(2),
  year: z.string().regex(/^\d{4}$/),
  sortOrder: z.coerce.number().min(0),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  coverImage: z.string().min(1),
  galleryImagesText: optionalString,
  demoUrl: optionalString,
  githubUrl: optionalString,
  caseStudyUrl: optionalString,
  techStackText: z.string().min(2),
  metricsText: optionalString,
});

export const skillFormSchema = z.object({
  id: optionalUuid,
  name: z.string().min(2),
  category: z.string().min(2),
  proficiency: z.coerce.number().min(0).max(100),
  icon: z.string().min(2),
  sortOrder: z.coerce.number().min(0),
  isPublished: z.boolean(),
});

export const experienceFormSchema = z.object({
  id: optionalUuid,
  company: z.string().min(2),
  role: z.string().min(2),
  location: z.string().min(2),
  employmentType: z.string().min(2),
  startDate: z.string().min(1),
  endDate: optionalString,
  summary: z.string().min(20),
  achievementsText: z.string().min(2),
  techStackText: z.string().min(2),
  sortOrder: z.coerce.number().min(0),
  isPublished: z.boolean(),
});

export const educationFormSchema = z.object({
  id: optionalUuid,
  institution: z.string().min(2),
  degree: z.string().min(2),
  field: z.string().min(2),
  location: z.string().min(2),
  startDate: z.string().min(1),
  endDate: optionalString,
  grade: z.string().min(1),
  description: z.string().min(20),
  sortOrder: z.coerce.number().min(0),
  isPublished: z.boolean(),
});

export const socialLinkFormSchema = z.object({
  id: optionalUuid,
  label: z.string().min(2),
  platform: z.enum(socialPlatforms),
  url: z.string().url(),
  sortOrder: z.coerce.number().min(0),
  isPublished: z.boolean(),
});

export const mediaAssetFormSchema = z.object({
  id: optionalUuid,
  bucket: z.string().min(2),
  path: z.string().min(2),
  publicUrl: z.string().url(),
  altText: optionalString,
});

export type LoginFormInput = z.input<typeof loginFormSchema>;
export type LoginFormValues = z.output<typeof loginFormSchema>;
export type ProfileFormInput = z.input<typeof profileFormSchema>;
export type ProfileFormValues = z.output<typeof profileFormSchema>;
export type ProfileGenerationInput = z.input<typeof profileGenerationSchema>;
export type ProfileGenerationValues = z.output<typeof profileGenerationSchema>;
export type SiteSettingsFormInput = z.input<typeof siteSettingsFormSchema>;
export type SiteSettingsFormValues = z.output<typeof siteSettingsFormSchema>;
export type SiteSettingsGenerationInput = z.input<typeof siteSettingsGenerationSchema>;
export type SiteSettingsGenerationValues = z.output<typeof siteSettingsGenerationSchema>;
export type ProjectGenerationInput = z.input<typeof projectGenerationSchema>;
export type ProjectGenerationValues = z.output<typeof projectGenerationSchema>;
export type ProjectFormInput = z.input<typeof projectFormSchema>;
export type ProjectFormValues = z.output<typeof projectFormSchema>;
export type SkillFormInput = z.input<typeof skillFormSchema>;
export type SkillFormValues = z.output<typeof skillFormSchema>;
export type ExperienceFormInput = z.input<typeof experienceFormSchema>;
export type ExperienceFormValues = z.output<typeof experienceFormSchema>;
export type EducationFormInput = z.input<typeof educationFormSchema>;
export type EducationFormValues = z.output<typeof educationFormSchema>;
export type SocialLinkFormInput = z.input<typeof socialLinkFormSchema>;
export type SocialLinkFormValues = z.output<typeof socialLinkFormSchema>;
export type MediaAssetFormInput = z.input<typeof mediaAssetFormSchema>;
export type MediaAssetFormValues = z.output<typeof mediaAssetFormSchema>;
