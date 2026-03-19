import type { PortfolioSnapshot } from "@/types/portfolio";

export const portfolioSeed: PortfolioSnapshot = {
  profile: {
    id: "profile-1",
    fullName: "C. John Remthang",
    headline: "Full-Stack Engineer, System Designer, and Product Builder",
    currentRole: "Full-Stack Engineer",
    location: "Mizoram, India",
    email: "contact@cjohnmizo.in",
    shortBio:
      "I turn complex workflows into clean, high-trust digital products, blending frontend polish, backend rigor, and product judgment across web, mobile, and admin systems.",
    longBio:
      "My best work starts where requirements are messy, stakes are real, and the product needs both clarity and technical depth. I design and ship software end to end: shaping product direction, designing interfaces, architecting frontend and backend systems, and making sure the final result stays maintainable after launch. I am especially strong at turning operational complexity into calm user experiences, reliable admin tools, and platforms teams can confidently grow on.",
    avatarUrl: "/profile.jpg",
    resumeUrl: "#contact",
    githubUsername: "cjohnmizo",
    yearsExperience: 6,
    isAvailableForHire: true,
    metrics: [
      { label: "Years shipping products", value: "6+" },
      { label: "Delivery range", value: "Web + Mobile + CMS" },
      { label: "Build standard", value: "Performance-first" },
    ],
  },
  settings: {
    id: "settings-1",
    heroEyebrow: "Full-stack engineer / system designer / product-minded builder",
    heroTitle:
      "I design and ship software that feels premium in front and dependable behind the scenes.",
    heroSubtitle:
      "From public platforms to internal tools and content systems, I build software that helps teams move faster without sacrificing usability, structure, or long-term maintainability.",
    heroDescription:
      "This portfolio is a focused view into how I think about product quality, system design, and execution: clear interfaces for users, dependable workflows for operators, and architecture that stays steady as the product grows.",
    aboutTitle: "Product storytelling through engineering",
    aboutBody:
      "I build for the full lifecycle, not just the first release. That means sharper product framing, stronger implementation decisions, and systems that still feel coherent when real users and internal teams depend on them every day.",
    contactTitle: "Let's build something useful, polished, and durable",
    contactDescription:
      "Open to full-stack engineering roles, product-focused contracts, admin platforms, CMS systems, and ambitious software that needs both execution quality and design judgment.",
    seoTitle: "C. John Remthang | Full-Stack Engineer, System Designer, and Product Builder",
    seoDescription:
      "Portfolio of C. John Remthang featuring premium case studies in full-stack product engineering, admin systems, CMS architecture, and polished delivery.",
    footerNote:
      "Built to show how I combine engineering depth, product judgment, and polished execution into software teams can trust.",
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
        "A role-aware publishing platform built to help content teams move faster while keeping structure, media workflows, and SEO controls under control.",
      description:
        "Tualchher CMS is a production-ready publishing platform for content teams that need more than a basic admin panel. It brings structured content operations, media handling, redirect management, role-based permissions, and SEO tooling into one composed editorial workspace.",
      challenge:
        "The challenge was to build a system powerful enough for real editorial operations without letting the interface become noisy, intimidating, or fragile for day-to-day administrators.",
      solution:
        "I organized the product around modular information architecture, role-aware controls, and repeatable UI patterns so editors can publish with confidence while the system remains predictable and extensible behind the scenes.",
      impact:
        "The result is a calmer editorial workflow, better operational control, and a CMS foundation that can expand feature by feature without losing usability or governance.",
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
        { label: "Operational modules", value: "10+" },
        { label: "Control layers", value: "Roles + Media + SEO" },
      ],
    },
    {
      id: "project-2",
      slug: "liankhawpui-community-platform",
      title: "Liankhawpui Community Platform",
      excerpt:
        "A mobile-first community platform designed to keep announcements, directories, and essential communication accessible even when connectivity is inconsistent.",
      description:
        "Liankhawpui is a community platform designed around clear communication, trusted information access, and resilient mobile usage. It gives users one dependable place for announcements, directory information, and essential updates without burying them in clutter.",
      challenge:
        "The platform needed to feel simple for everyday community use while still staying dependable in low-connectivity scenarios and manageable for administrators behind the scenes.",
      solution:
        "I paired a mobile-first interface with Supabase-backed data modelling and sync-aware architecture so the experience stays approachable for users, resilient in the field, and maintainable for future growth.",
      impact:
        "The result is a stronger communication backbone for the community, with less coordination friction and a clearer path for sharing trusted information at scale.",
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
        { label: "Primary flows", value: "Updates + Directory + Access" },
        { label: "Connectivity design", value: "Offline-aware sync" },
      ],
    },
    {
      id: "project-3",
      slug: "smart-modern-admin-dashboard",
      title: "Smart Modern Admin Dashboard",
      excerpt:
        "A modern operations workspace that combines analytics, task flows, and role-aware controls into one clear dashboard built for day-to-day execution.",
      description:
        "This admin dashboard centralizes reporting, task management, and operational visibility into a single interface with strong visual hierarchy and a faster decision-making flow for internal teams.",
      challenge:
        "The goal was to create an internal tool that stayed fast, readable, and actionable under real operational pressure without collapsing into the usual clutter of enterprise dashboards.",
      solution:
        "I used composable UI architecture, typed data flows, and focused information hierarchy to create a workspace that scales with new modules while staying readable and deliberate.",
      impact:
        "The result is a reusable internal-product foundation that improves operational visibility, keeps workflows focused, and creates a stronger base for future tooling.",
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
        { label: "Decision surfaces", value: "Analytics + Tasks + Reporting" },
        { label: "Operator benefit", value: "Faster visibility" },
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
        "Teach vocational IT while translating real software concepts into hands-on learning, practical problem solving, and career-ready technical confidence for students.",
      achievements: [
        "Designed hands-on learning around software workflows, web technologies, and practical IT problem solving.",
        "Helped students connect classroom concepts with real product-building, digital systems, and professional technical thinking.",
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
        "Delivered web platforms, CMS products, dashboards, and mobile applications from discovery through deployment for clients who needed both shipping speed and sound technical judgment.",
      achievements: [
        "Owned solution architecture, implementation, iteration, and release across client-facing products and operator-facing systems.",
        "Balanced UX polish, delivery speed, and long-term maintainability across multiple production-oriented builds.",
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
