import type { PortfolioSnapshot } from "@/types/portfolio";

export const portfolioSeed: PortfolioSnapshot = {
  profile: {
    id: "profile-1",
    fullName: "C. John Remthang",
    headline: "Developer and IT Professional",
    currentRole: "Developer / IT & ITeS Teacher",
    location: "Mizoram, India",
    email: "contact@cjohnmizo.in",
    shortBio:
      "I build practical websites, dashboards, learning platforms, and mobile apps for businesses, schools, local organizations, and community projects.",
    longBio:
      "I am a developer and IT professional from Mizoram, focused on building useful digital tools that are clear, reliable, and easy to maintain. My work includes websites, admin dashboards, LMS platforms, CMS tools, and mobile applications. I also teach IT and ITeS subjects, which helps me explain technical ideas in a simple and practical way.",
    avatarUrl: "/profile.jpg",
    resumeUrl: null,
    githubUsername: "cjohnmizo",
    yearsExperience: 6,
    isAvailableForHire: true,
    metrics: [
      { label: "Based in", value: "Mizoram" },
      { label: "Work focus", value: "Web / LMS / Mobile" },
      { label: "Available for", value: "Selected projects" },
    ],
  },
  settings: {
    id: "settings-1",
    heroEyebrow: "Developer and IT professional from Mizoram",
    heroTitle:
      "I build practical websites, dashboards, and mobile apps for real-world use.",
    heroSubtitle:
      "I help small businesses, schools, institutions, NGOs, and community projects move their work online with simple and reliable software.",
    heroDescription:
      "My focus is clear interfaces, maintainable code, and systems that are useful after launch. This portfolio shows selected work across web platforms, learning tools, admin systems, and mobile apps.",
    aboutTitle: "Practical software for local and professional needs",
    aboutBody:
      "I work on digital products that solve everyday problems: publishing information, managing records, supporting classes, improving admin workflows, and helping organizations communicate better online.",
    contactTitle: "Have a website, dashboard, LMS, or app to build?",
    contactDescription:
      "Send a short message about the project, timeline, and what you need the software to do. I am open to selected client work, school or NGO projects, and development roles.",
    seoTitle: "C. John Remthang | CJohn Mizo | Developer Portfolio",
    seoDescription:
      "Portfolio of C. John Remthang, also known as CJohn Mizo, a developer and IT professional from Mizoram building websites, dashboards, LMS platforms, and mobile apps.",
    footerNote:
      "Portfolio of C. John Remthang, focused on practical software for businesses, schools, institutions, NGOs, and community use.",
    primaryAccent: "#111827",
    secondaryAccent: "#0f766e",
  },
  featuredProjects: [],
  projects: [
    {
      id: "project-1",
      slug: "liankhawpui-community-platform",
      title: "Liankhawpui",
      excerpt:
        "Village directory and news app for Khawlian, focused on announcements, organization details, and offline-friendly access.",
      description:
        "Liankhawpui is a community platform designed to make local information easier to find and share. It brings announcements, organization details, and useful community updates into a mobile-first experience.",
      challenge:
        "Community information is often spread across messages, calls, and informal updates. The project needed a simple structure that people can understand quickly, including users with inconsistent connectivity.",
      solution:
        "I planned the app around a clear directory, concise updates, and offline-aware data access using Flutter, Supabase, and PowerSync.",
      impact:
        "The project gives the community a clearer place for trusted information and reduces the friction of sharing updates across different groups.",
      category: "mobile-app",
      status: "Private",
      year: "2026",
      sortOrder: 1,
      isFeatured: true,
      isPublished: true,
      coverImage: "/projects/liankhawpui-community-platform.png",
      galleryImages: ["/projects/liankhawpui-community-platform.png"],
      demoUrl: null,
      githubUrl: "https://github.com/cjohnmizo/liankhawpui",
      caseStudyUrl: "https://github.com/cjohnmizo/liankhawpui#readme",
      techStack: ["Flutter", "Supabase", "PowerSync"],
      metrics: [
        { label: "Status", value: "Private build" },
        { label: "Focus", value: "Community access" },
      ],
    },
    {
      id: "project-2",
      slug: "tz-coaching-lms",
      title: "TZ Coaching LMS",
      excerpt:
        "Learning management platform for coaching content, student access, class materials, and admin workflows.",
      description:
        "TZ Coaching LMS is designed for a coaching or training environment that needs a practical way to organize classes, learning materials, student access, and administrative updates.",
      challenge:
        "The main challenge is keeping learning content and student workflows simple enough for day-to-day use while still giving administrators control over courses and updates.",
      solution:
        "The product direction focuses on clear course structure, readable lesson pages, student-friendly navigation, and admin tools that avoid unnecessary complexity.",
      impact:
        "The platform is intended to help coaching teams manage learning resources more consistently and make class materials easier for students to access.",
      category: "platform",
      status: "Private",
      year: "2026",
      sortOrder: 2,
      isFeatured: true,
      isPublished: true,
      coverImage: "/projects/tz-coaching-lms.png",
      galleryImages: ["/projects/tz-coaching-lms.png"],
      demoUrl: null,
      githubUrl: null,
      caseStudyUrl: null,
      techStack: ["LMS", "Dashboard", "Content Management"],
      metrics: [
        { label: "Status", value: "Private build" },
        { label: "Focus", value: "Learning workflow" },
      ],
    },
    {
      id: "project-3",
      slug: "gaby-farm",
      title: "Gaby Farm",
      excerpt:
        "Farm website and admin workflow for product visibility, updates, and simple business communication.",
      description:
        "Gaby Farm is a business-focused web project for presenting farm information, products, updates, and simple contact paths in a clean and trustworthy way.",
      challenge:
        "A small business site needs to look credible without becoming complicated to update. The content structure has to stay clear for both visitors and administrators.",
      solution:
        "The design direction keeps the public pages simple while supporting practical content updates, product information, and direct enquiry paths.",
      impact:
        "The project helps the business present itself clearly online and gives customers an easier way to understand products and get in touch.",
      category: "web-app",
      status: "Private",
      year: "2026",
      sortOrder: 3,
      isFeatured: true,
      isPublished: true,
      coverImage: "/projects/gaby-farm.png",
      galleryImages: ["/projects/gaby-farm.png"],
      demoUrl: null,
      githubUrl: null,
      caseStudyUrl: null,
      techStack: ["Web", "CMS", "Admin"],
      metrics: [
        { label: "Status", value: "Private build" },
        { label: "Focus", value: "Business presence" },
      ],
    },
    {
      id: "project-4",
      slug: "smart-modern-admin-dashboard",
      title: "Smart Modern Admin Dashboard",
      excerpt:
        "Operations dashboard for analytics, tasks, role-aware controls, and day-to-day reporting.",
      description:
        "Smart Modern Admin Dashboard is an internal tool concept focused on making operational data, tasks, and reporting easier to scan and manage.",
      challenge:
        "Admin dashboards can become crowded quickly. The goal was to keep the interface readable while still supporting useful reporting and task flows.",
      solution:
        "I used a structured layout, reusable components, and typed data flows to keep the dashboard consistent across analytics, tasks, and management views.",
      impact:
        "The project provides a reusable foundation for internal tools where clarity and speed matter more than decorative UI.",
      category: "dashboard",
      status: "Live",
      year: "2026",
      sortOrder: 4,
      isFeatured: true,
      isPublished: true,
      coverImage: "/projects/smart-modern-admin-dashboard.png",
      galleryImages: ["/projects/smart-modern-admin-dashboard.png"],
      demoUrl: "https://smad-cjohnmizo.vercel.app/",
      githubUrl: "https://github.com/cjohnmizo/Smart-Modern-Admin-Dashboard",
      caseStudyUrl:
        "https://github.com/cjohnmizo/Smart-Modern-Admin-Dashboard#readme",
      techStack: ["Next.js", "TypeScript", "MongoDB"],
      metrics: [
        { label: "Status", value: "Live demo" },
        { label: "Focus", value: "Admin workflow" },
      ],
    },
    {
      id: "project-5",
      slug: "tualchher-cms",
      title: "Tualchher CMS",
      excerpt:
        "Publishing and admin platform for structured content, media handling, SEO controls, and role-based access.",
      description:
        "Tualchher CMS is a publishing platform for teams that need structured content management, media workflows, redirects, role permissions, and SEO controls in one admin area.",
      challenge:
        "The CMS needed to support serious editorial work without making the admin interface difficult for everyday users.",
      solution:
        "I organized the system around role-aware controls, repeatable forms, media management, and clear publishing workflows.",
      impact:
        "The platform gives administrators better control over content operations while keeping the interface predictable and maintainable.",
      category: "cms",
      status: "Private",
      year: "2026",
      sortOrder: 5,
      isFeatured: true,
      isPublished: true,
      coverImage: "/projects/tualchher-cms-dashboard.png",
      galleryImages: ["/projects/tualchher-cms-dashboard.png"],
      demoUrl: null,
      githubUrl: "https://github.com/cjohnmizo/Tualchher_CMS",
      caseStudyUrl: "https://github.com/cjohnmizo/Tualchher_CMS#readme",
      techStack: ["Laravel 12", "Tailwind CSS", "MySQL", "Spatie Permissions"],
      metrics: [
        { label: "Status", value: "Private build" },
        { label: "Focus", value: "Publishing workflow" },
      ],
    },
    {
      id: "project-6",
      slug: "library-lms-tools",
      title: "Library and LMS Tools",
      excerpt:
        "School-focused tools for cataloguing, learning resources, student access, and simple institution workflows.",
      description:
        "This work covers library and learning-management ideas for schools or institutions that need practical systems for records, resources, and student access.",
      challenge:
        "Schools often need software that is easy to understand, affordable to maintain, and useful for staff who may not have technical support every day.",
      solution:
        "The approach is to keep the product structure simple: searchable records, clear resource pages, useful admin controls, and responsive layouts.",
      impact:
        "The work supports better organization of learning resources and gives institutions a clearer path to managing records online.",
      category: "platform",
      status: "Selected work",
      year: "2026",
      sortOrder: 6,
      isFeatured: false,
      isPublished: true,
      coverImage: "/projects/library-lms-tools.png",
      galleryImages: ["/projects/library-lms-tools.png"],
      demoUrl: null,
      githubUrl: null,
      caseStudyUrl: null,
      techStack: ["Library System", "LMS", "Database"],
      metrics: [
        { label: "Status", value: "Selected work" },
        { label: "Focus", value: "School workflow" },
      ],
    },
  ],
  skills: [
    {
      id: "skill-1",
      name: "Next.js",
      category: "Frontend",
      proficiency: 92,
      icon: "code-xml",
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: "skill-2",
      name: "TypeScript",
      category: "Frontend",
      proficiency: 90,
      icon: "braces",
      sortOrder: 2,
      isPublished: true,
    },
    {
      id: "skill-3",
      name: "Laravel",
      category: "Backend",
      proficiency: 86,
      icon: "server",
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: "skill-4",
      name: "Supabase",
      category: "Backend",
      proficiency: 88,
      icon: "database",
      sortOrder: 4,
      isPublished: true,
    },
    {
      id: "skill-5",
      name: "Flutter",
      category: "Mobile App",
      proficiency: 88,
      icon: "smartphone",
      sortOrder: 5,
      isPublished: true,
    },
    {
      id: "skill-6",
      name: "PostgreSQL / MySQL",
      category: "Database",
      proficiency: 84,
      icon: "database",
      sortOrder: 6,
      isPublished: true,
    },
    {
      id: "skill-7",
      name: "GitHub / Vercel",
      category: "Tools",
      proficiency: 86,
      icon: "network",
      sortOrder: 7,
      isPublished: true,
    },
  ],
  experiences: [
    {
      id: "experience-1",
      company: "Phunchawng RMSA Secondary School",
      role: "VE Teacher - IT & ITeS",
      location: "Mizoram, India",
      employmentType: "Full-time",
      startDate: "2022-07-01",
      endDate: null,
      summary:
        "Teach basic computer skills and IT-related subjects to Class IX and X students, with a focus on practical digital literacy and clear technical foundations.",
      achievements: [
        "Prepare lessons and activities around computer fundamentals, office tools, internet use, and practical IT concepts.",
        "Help students connect classroom learning with everyday digital tools and further technical study.",
      ],
      techStack: ["Teaching", "Computer Fundamentals", "IT & ITeS"],
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: "experience-2",
      company: "Independent Client and Project Work",
      role: "Developer",
      location: "Mizoram / Remote",
      employmentType: "Contract",
      startDate: "2019-01-01",
      endDate: null,
      summary:
        "Build websites, dashboards, CMS tools, LMS platforms, and mobile apps for practical business, school, and community needs.",
      achievements: [
        "Plan and build project structure, user interfaces, data flows, and deployment workflows.",
        "Work with clients and local organizations to turn real requirements into usable software.",
      ],
      techStack: ["Next.js", "Laravel", "Flutter", "Supabase"],
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
        "Studied software development fundamentals, database systems, programming, and applied computer applications.",
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
