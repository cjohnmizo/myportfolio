export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram"
  | "website";

export type ProjectCategory =
  | "platform"
  | "web-app"
  | "mobile-app"
  | "cms"
  | "dashboard"
  | "design-system";

export interface Metric {
  label: string;
  value: string;
}

export interface Profile {
  id: string;
  fullName: string;
  headline: string;
  currentRole: string;
  location: string;
  email: string;
  shortBio: string;
  longBio: string;
  avatarUrl: string;
  resumeUrl?: string | null;
  githubUsername: string;
  yearsExperience: number;
  isAvailableForHire: boolean;
  metrics: Metric[];
}

export interface SiteSettings {
  id: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutBody: string;
  contactTitle: string;
  contactDescription: string;
  seoTitle: string;
  seoDescription: string;
  footerNote: string;
  primaryAccent: string;
  secondaryAccent: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  category: ProjectCategory;
  status: string;
  year: string;
  sortOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
  coverImage: string;
  galleryImages: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  caseStudyUrl?: string | null;
  techStack: string[];
  metrics: Metric[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  achievements: string[];
  techStack: string[];
  sortOrder: number;
  isPublished: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  location: string;
  grade: string;
  description: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  platform: SocialPlatform;
  url: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface MediaAsset {
  id: string;
  bucket: string;
  path: string;
  publicUrl: string;
  altText: string;
  createdAt: string;
}

export interface PortfolioSnapshot {
  profile: Profile;
  settings: SiteSettings;
  featuredProjects: Project[];
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  socialLinks: SocialLink[];
}
