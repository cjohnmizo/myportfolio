import type { PortfolioSnapshot } from "@/types/portfolio";

export const portfolioSeed: PortfolioSnapshot = {
  profile: {
    id: "profile-1",
    fullName: "C. John Remthang",
    headline: "Full-Stack Engineer, System Designer, and Product Builder",
    currentRole: "Full-Stack Engineer",
    location: "Mizoram, India",
    email: "johnchangsan39@gmail.com",
    shortBio:
      "Mizoram-based full-stack engineer building modern web platforms, admin systems, and product experiences with clear UX and dependable architecture.",
    longBio:
      "I build products end to end, from interface design and frontend architecture to backend systems, CMS workflows, and deployment. My strongest work lives where product clarity and technical depth need to meet: polished experiences for users, reliable tools for operators, and maintainable systems for teams.",
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
    heroEyebrow: "Full-stack engineer • system designer • product-minded builder",
    heroTitle: "I build sharp digital products that make complex work feel simple.",
    heroSubtitle:
      "From public-facing platforms to admin systems and delivery-heavy products, I design and ship software with calm architecture and polished execution.",
    heroDescription:
      "This portfolio highlights how I approach full-stack engineering, product thinking, and maintainable delivery across web platforms, dashboards, CMS products, and mobile systems.",
    aboutTitle: "Engineering with product judgment",
    aboutBody:
      "I work best where UX clarity, technical depth, and delivery discipline all matter. My focus is building software that looks sharp, behaves reliably, and stays maintainable long after the first launch.",
    contactTitle: "Let’s build something useful and well-crafted",
    contactDescription:
      "Open to full-stack engineering roles, contract product work, CMS platforms, admin dashboards, and systems that need both technical depth and product polish.",
    seoTitle: "C. John Remthang | Full-Stack Engineer, System Designer, and Product Builder",
    seoDescription:
      "Portfolio of C. John Remthang featuring case studies, full-stack product work, CMS systems, admin platforms, and practical engineering depth.",
    footerNote:
      "Built to communicate engineering quality, product judgment, and the ability to ship maintainable systems end to end.",
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
        "A production-focused CMS with role-based workflows, media handling, and SEO controls for content-heavy teams.",
      description:
        "Tualchher CMS is a modular publishing platform designed for teams that need more than a simple admin panel. It brings together structured content management, permissions, redirect control, media workflows, and SEO tooling inside a calm, maintainable interface.",
      challenge:
        "The challenge was to build a CMS powerful enough for real editorial operations without overwhelming administrators with cluttered screens or fragile workflows.",
      solution:
        "I shaped the product around modular information architecture, role-aware controls, and reusable UI patterns so editors can move quickly while the system stays predictable behind the scenes.",
      impact:
        "The result is a cleaner publishing workflow, stronger operational control, and a platform that can grow with new modules without losing usability.",
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
        { label: "Core modules", value: "10+" },
        { label: "Workflow strength", value: "Editorial + SEO" },
      ],
    },
    {
      id: "project-2",
      slug: "liankhawpui-community-platform",
      title: "Liankhawpui Community Platform",
      excerpt:
        "A community platform designed for announcements, directories, and dependable communication in uneven connectivity conditions.",
      description:
        "Liankhawpui is a mobile-first community platform built for structured updates, directory access, and resilient communication where usability and reliability matter as much as feature count.",
      challenge:
        "The platform had to stay approachable for everyday users while remaining dependable in low-connectivity scenarios and easy for administrators to manage.",
      solution:
        "I paired a mobile-first interface with Supabase-backed data modelling and sync-friendly architecture to keep the experience simple, resilient, and maintainable.",
      impact:
        "The product improves communication flow for the community and reduces the coordination overhead that usually comes with scattered tools.",
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
        { label: "Reliability", value: "Offline-aware" },
      ],
    },
    {
      id: "project-3",
      slug: "smart-modern-admin-dashboard",
      title: "Smart Modern Admin Dashboard",
      excerpt:
        "A modern operations dashboard that combines analytics, task management, and role-aware workflows in one focused interface.",
      description:
        "This admin dashboard centralizes reporting, task workflows, and operational visibility into a single management surface with strong hierarchy and a clear decision-making flow.",
      challenge:
        "The goal was to create an admin experience that felt fast and usable under real operational pressure without turning into a visually noisy internal tool.",
      solution:
        "I used a composable UI architecture, typed data flows, and focused information hierarchy to keep the dashboard scalable, readable, and easy to extend.",
      impact:
        "The result is a reusable foundation for internal tooling that balances visibility, control, and long-term maintainability.",
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
        { label: "Built for", value: "Operations teams" },
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
        "Teach vocational IT while translating real software concepts into practical learning, digital problem-solving, and career-ready technical confidence.",
      achievements: [
        "Designed hands-on learning around software workflows, web technologies, and practical IT problem solving.",
        "Helped students connect classroom concepts with real product-building and digital system practices.",
      ],
      techStack: ["Teaching", "Applied IT", "Curriculum Planning"],
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
        "Delivered web platforms, CMS products, dashboards, and mobile applications from discovery to deployment for clients who needed both execution and technical judgment.",
      achievements: [
        "Owned solution architecture, implementation, iteration, and release across client-facing products.",
        "Balanced UX polish, delivery speed, and long-term maintainability across multiple builds.",
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
      degree: "Bachelor of Computer Applications",
      field: "Computer Applications",
      startDate: "2017-07-01",
      endDate: "2020-06-01",
      location: "Mizoram, India",
      grade: "A",
      description:
        "Completed a computer applications program with strong grounding in software development lifecycle practices, database systems, programming fundamentals, and applied problem solving.",
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
