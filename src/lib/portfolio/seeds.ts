import type { PortfolioSnapshot } from "@/types/portfolio";

export const portfolioSeed: PortfolioSnapshot = {
  profile: {
    id: "profile-1",
    fullName: "C. John Remthang",
    headline: "Principal-level Full-Stack Engineer and Product Builder",
    currentRole: "Full-Stack Developer",
    location: "Mizoram, India",
    email: "johnchangsan39@gmail.com",
    shortBio:
      "I design and ship high-leverage products that balance elegant UX, reliable systems, and pragmatic delivery.",
    longBio:
      "Over the past six years I have worked across product strategy, frontend architecture, backend systems, CMS platforms, and deployment workflows. My focus is building software that feels polished for users, maintainable for teams, and measurable for businesses.",
    avatarUrl: "/profile.jpg",
    resumeUrl: "#contact",
    githubUsername: "cjohnmizo",
    yearsExperience: 6,
    isAvailableForHire: true,
    metrics: [
      { label: "Years building products", value: "6+" },
      { label: "Systems shipped", value: "18" },
      { label: "Avg. Lighthouse target", value: "95+" },
    ],
  },
  settings: {
    id: "settings-1",
    heroEyebrow: "Full-stack engineer • product designer • system architect",
    heroTitle: "Building premium digital products with engineering depth.",
    heroSubtitle: "Recruiter-friendly portfolio, founder-ready systems, and an admin CMS built for real updates.",
    heroDescription:
      "This platform showcases production work, technical leadership, and a content system that lets the portfolio evolve without code edits.",
    aboutTitle: "Engineer with a product lens",
    aboutBody:
      "I work best where product clarity, visual polish, and system design need to come together. My sweet spot is architecting end-to-end platforms that feel thoughtful from the first scroll to the final deployment.",
    contactTitle: "Let’s build something valuable",
    contactDescription:
      "Open to senior engineering roles, contract product builds, and architecture-heavy collaboration.",
    seoTitle: "C. John Remthang | Full-Stack Engineer Portfolio",
    seoDescription:
      "Premium developer portfolio for C. John Remthang featuring case studies, technical depth, and a secure admin CMS built with Next.js and Supabase.",
    footerNote: "Designed and engineered for performance, clarity, and long-term maintainability.",
    primaryAccent: "#6366f1",
    secondaryAccent: "#22c55e",
  },
  featuredProjects: [],
  projects: [
    {
      id: "project-1",
      slug: "tualchher-cms",
      title: "Tualchher CMS",
      excerpt:
        "A modular publishing platform with governance, media workflows, and SEO tooling for content-heavy teams.",
      description:
        "Tualchher CMS is a full-stack content platform focused on operational clarity. It combines role-based permissions, SEO controls, redirect management, and content tooling inside a polished editorial workflow.",
      challenge:
        "The product needed to support structured publishing, team operations, and technical SEO without turning the interface into enterprise clutter.",
      solution:
        "I designed a modular information architecture with clean editor flows, reusable components, and an admin surface that surfaces the right controls at the right moments.",
      impact:
        "The system cut manual publishing friction and created a more reliable content workflow for administrators and editors.",
      category: "cms",
      status: "Private",
      year: "2026",
      sortOrder: 1,
      isFeatured: true,
      isPublished: true,
      coverImage: "/projects/tualchher-cms-dashboard.png",
      galleryImages: ["/projects/tualchher-cms-dashboard.png"],
      demoUrl: null,
      githubUrl: "https://github.com/cjohnmizo/Tualchher_CMS",
      caseStudyUrl: "https://github.com/cjohnmizo/Tualchher_CMS#readme",
      techStack: ["Laravel 12", "Tailwind CSS", "MySQL", "Spatie Permissions"],
      metrics: [
        { label: "Modules", value: "10+" },
        { label: "Core workflows", value: "Editorial + SEO" },
      ],
    },
    {
      id: "project-2",
      slug: "liankhawpui-community-platform",
      title: "Liankhawpui Community Platform",
      excerpt:
        "A community-first mobile experience with announcements, directory tooling, and offline-aware sync.",
      description:
        "Liankhawpui connects community members through structured updates, role-aware access, and resilient data synchronization designed for real-world connectivity constraints.",
      challenge:
        "The platform had to remain useful in low-connectivity situations while keeping admin workflows dependable and straightforward.",
      solution:
        "I paired a mobile-first UX with Supabase-backed data modeling and sync-friendly architecture, keeping the interface approachable for non-technical users.",
      impact:
        "The product improved communication reliability and reduced coordination overhead for community organizers.",
      category: "mobile-app",
      status: "Proprietary",
      year: "2026",
      sortOrder: 2,
      isFeatured: true,
      isPublished: true,
      coverImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      ],
      demoUrl: null,
      githubUrl: "https://github.com/cjohnmizo/liankhawpui",
      caseStudyUrl: "https://github.com/cjohnmizo/liankhawpui#readme",
      techStack: ["Flutter", "Supabase", "PowerSync"],
      metrics: [
        { label: "Primary surfaces", value: "News + Directory" },
        { label: "Support", value: "Offline-aware" },
      ],
    },
    {
      id: "project-3",
      slug: "smart-modern-admin-dashboard",
      title: "Smart Modern Admin Dashboard",
      excerpt:
        "A full-stack admin platform with analytics, task operations, and role-aware controls for growing teams.",
      description:
        "This dashboard centralizes operational oversight, task management, and analytics into a cohesive management interface with strong information hierarchy.",
      challenge:
        "The goal was to create a productivity-focused admin experience without sacrificing visual clarity or maintainability.",
      solution:
        "I used a composable UI architecture and typed data flows to keep the dashboard scalable, fast, and easy to extend.",
      impact:
        "The project established a reusable foundation for future internal tools and reporting interfaces.",
      category: "dashboard",
      status: "Live",
      year: "2026",
      sortOrder: 3,
      isFeatured: true,
      isPublished: true,
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      ],
      demoUrl: "https://smad-cjohnmizo.vercel.app/",
      githubUrl: "https://github.com/cjohnmizo/Smart-Modern-Admin-Dashboard",
      caseStudyUrl:
        "https://github.com/cjohnmizo/Smart-Modern-Admin-Dashboard#readme",
      techStack: ["Next.js", "TypeScript", "MongoDB"],
      metrics: [
        { label: "Core modules", value: "Analytics + Tasks" },
        { label: "Audience", value: "Operations teams" },
      ],
    },
  ],
  skills: [
    {
      id: "skill-1",
      name: "Next.js",
      category: "Frontend Architecture",
      proficiency: 95,
      icon: "code-xml",
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: "skill-2",
      name: "TypeScript",
      category: "Frontend Architecture",
      proficiency: 93,
      icon: "braces",
      sortOrder: 2,
      isPublished: true,
    },
    {
      id: "skill-3",
      name: "Supabase",
      category: "Backend & Data",
      proficiency: 88,
      icon: "database",
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: "skill-4",
      name: "Flutter",
      category: "Mobile Systems",
      proficiency: 90,
      icon: "smartphone",
      sortOrder: 4,
      isPublished: true,
    },
    {
      id: "skill-5",
      name: "PostgreSQL",
      category: "Backend & Data",
      proficiency: 85,
      icon: "server",
      sortOrder: 5,
      isPublished: true,
    },
    {
      id: "skill-6",
      name: "System Design",
      category: "Architecture",
      proficiency: 91,
      icon: "network",
      sortOrder: 6,
      isPublished: true,
    },
  ],
  experiences: [
    {
      id: "experience-1",
      company: "Government of Mizoram",
      role: "Vocational IT Teacher",
      location: "Mizoram, India",
      employmentType: "Full-time",
      startDate: "2022-07-01",
      endDate: null,
      summary:
        "Teach vocational IT while applying real-world engineering practices to technical instruction, digital systems, and mentoring.",
      achievements: [
        "Designed practical IT learning experiences around real implementation workflows.",
        "Supported digital problem-solving and technology adoption for students and stakeholders.",
      ],
      techStack: ["Teaching", "Curriculum Design", "Applied IT"],
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: "experience-2",
      company: "Independent Client Work",
      role: "Freelance Full-Stack Developer",
      location: "Remote",
      employmentType: "Contract",
      startDate: "2019-01-01",
      endDate: null,
      summary:
        "Partner with clients on CMS platforms, dashboards, mobile apps, and web systems from discovery through deployment.",
      achievements: [
        "Owned architecture, implementation, and release for multiple client-facing products.",
        "Balanced UI polish, maintainability, and delivery speed across projects.",
      ],
      techStack: ["Next.js", "Flutter", "Supabase", "Laravel"],
      sortOrder: 2,
      isPublished: true,
    },
  ],
  education: [
    {
      id: "education-1",
      institution: "Mizoram University",
      degree: "Master of Computer Applications",
      field: "Computer Applications",
      startDate: "2017-07-01",
      endDate: "2020-06-01",
      location: "Mizoram, India",
      grade: "MCA",
      description:
        "Advanced postgraduate training in software development, systems thinking, and applied computer science.",
      sortOrder: 1,
      isPublished: true,
    },
  ],
  socialLinks: [
    {
      id: "social-1",
      label: "GitHub",
      platform: "github",
      url: "https://github.com/cjohnmizo",
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: "social-2",
      label: "LinkedIn",
      platform: "linkedin",
      url: "https://www.linkedin.com/in/c-john-remthang/",
      sortOrder: 2,
      isPublished: true,
    },
    {
      id: "social-3",
      label: "Facebook",
      platform: "facebook",
      url: "https://www.facebook.com/john.changsan.9",
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: "social-4",
      label: "Instagram",
      platform: "instagram",
      url: "https://www.instagram.com/c.john_mizo/",
      sortOrder: 4,
      isPublished: true,
    },
  ],
};

portfolioSeed.featuredProjects = portfolioSeed.projects.filter(
  (project) => project.isFeatured && project.isPublished,
);
