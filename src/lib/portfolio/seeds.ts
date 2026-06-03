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
      "I build practical digital systems for schools, NGOs, coaching centres, businesses, farms, and community projects.",
    longBio:
      "I am a developer and IT professional from Mizoram, focused on practical software systems that are clear, responsive, maintainable, and useful for real users. My work includes school and institution websites, coaching LMS platforms, admin dashboards, CMS tools, mobile applications, and digital systems for local organizations. I also teach IT and ITeS subjects, which helps me understand first-time computer users, day-to-day workflows, and why a system should remain useful after launch.",
    avatarUrl: "/profile.jpg",
    resumeUrl: null,
    githubUsername: "cjohnmizo",
    yearsExperience: 6,
    isAvailableForHire: true,
    metrics: [
      { label: "Based in", value: "Mizoram" },
      { label: "Work focus", value: "Web / LMS / Dashboards" },
      {
        label: "Available for",
        value:
          "Freelance projects, school/NGO systems, LMS platforms, dashboards, and mobile apps",
      },
    ],
  },
  settings: {
    id: "settings-1",
    heroEyebrow: "Developer and IT professional from Mizoram",
    heroTitle:
      "I build practical digital systems for schools, NGOs, businesses, and communities.",
    heroSubtitle:
      "Developer from Mizoram focused on clean websites, LMS platforms, admin dashboards, mobile apps, and maintainable systems that are useful after launch.",
    heroDescription:
      "The portfolio uses a restrained Mizo digital craft direction: clean developer interfaces, subtle geometric accents, and project details grounded in real work.",
    aboutTitle: "Mizo digital craft for practical software systems",
    aboutBody:
      "I work with schools, NGOs, coaching centres, local businesses, farms, and community projects that need responsive design, maintainable code, useful admin workflows, and software people can actually use.",
    contactTitle: "Have a website, dashboard, LMS, or app to build?",
    contactDescription:
      "Have a school website, LMS, NGO system, dashboard, or mobile app idea? Send a short project brief and I'll review it.",
    seoTitle: "C. John Remthang | Web, LMS, Dashboard & Mobile App Developer",
    seoDescription:
      "Personal portfolio of C. John Remthang, a Mizoram-based developer building practical websites, LMS platforms, dashboards, mobile apps, and digital systems for schools, NGOs, businesses, and communities.",
    footerNote:
      "Building practical digital systems for schools, NGOs, businesses, and communities.",
    primaryAccent: "#7aa7ff",
    secondaryAccent: "#d8a64b",
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
        "I planned the app around a clear directory, concise updates, and offline-aware data access using Flutter, local sync planning, and PowerSync.",
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
      techStack: ["Flutter", "PowerSync", "Offline-first"],
      metrics: [
        {
          label: "My role",
          value:
            "App planning, interface structure, Flutter development, and offline-aware data flow.",
        },
        {
          label: "Key feature",
          value: "Village directory for people, groups, and local information.",
        },
        {
          label: "Key feature",
          value: "News and announcement flow for community updates.",
        },
        {
          label: "Key feature",
          value: "Offline-aware mobile access with PowerSync.",
        },
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
        {
          label: "My role",
          value:
            "Product structure, LMS workflow planning, dashboard UX, and content organization.",
        },
        {
          label: "Key feature",
          value: "Course and lesson structure for coaching content.",
        },
        {
          label: "Key feature",
          value: "Student-friendly access to class materials.",
        },
        {
          label: "Key feature",
          value: "Admin workflow for managing learning resources.",
        },
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
        {
          label: "My role",
          value:
            "Website structure, content workflow, public page design, and enquiry path planning.",
        },
        {
          label: "Key feature",
          value: "Clean product and farm information presentation.",
        },
        {
          label: "Key feature",
          value: "Simple update workflow for business content.",
        },
        {
          label: "Key feature",
          value: "Direct enquiry path for customers and visitors.",
        },
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
      status: "Live demo available",
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
        {
          label: "My role",
          value:
            "Dashboard UI, typed component structure, analytics views, and workflow-focused interactions.",
        },
        {
          label: "Key feature",
          value: "Analytics cards and reporting views for fast scanning.",
        },
        {
          label: "Key feature",
          value: "Task and operations panels for routine admin work.",
        },
        {
          label: "Key feature",
          value: "Reusable layout foundation for internal tools.",
        },
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
        {
          label: "My role",
          value:
            "CMS architecture, admin workflow, role-aware controls, and content management structure.",
        },
        {
          label: "Key feature",
          value: "Structured publishing workflow for editorial content.",
        },
        {
          label: "Key feature",
          value: "Media management and SEO controls in the admin area.",
        },
        {
          label: "Key feature",
          value: "Role-based access with Spatie permissions.",
        },
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
        {
          label: "My role",
          value:
            "System planning, searchable record structure, admin controls, and responsive interface direction.",
        },
        {
          label: "Key feature",
          value: "Searchable records for library and learning resources.",
        },
        {
          label: "Key feature",
          value: "Simple admin controls for school staff workflows.",
        },
        {
          label: "Key feature",
          value: "Responsive resource pages for students and staff.",
        },
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
      name: "React",
      category: "Frontend",
      proficiency: 90,
      icon: "code-xml",
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: "skill-4",
      name: "Tailwind CSS",
      category: "Frontend",
      proficiency: 88,
      icon: "code-xml",
      sortOrder: 4,
      isPublished: true,
    },
    {
      id: "skill-5",
      name: "Laravel",
      category: "Backend",
      proficiency: 86,
      icon: "server",
      sortOrder: 5,
      isPublished: true,
    },
    {
      id: "skill-6",
      name: "REST APIs",
      category: "Backend",
      proficiency: 84,
      icon: "server",
      sortOrder: 6,
      isPublished: true,
    },
    {
      id: "skill-7",
      name: "Authentication",
      category: "Backend",
      proficiency: 84,
      icon: "network",
      sortOrder: 7,
      isPublished: true,
    },
    {
      id: "skill-8",
      name: "Admin Panels",
      category: "Backend",
      proficiency: 86,
      icon: "server",
      sortOrder: 8,
      isPublished: true,
    },
    {
      id: "skill-9",
      name: "Flutter",
      category: "Mobile",
      proficiency: 88,
      icon: "smartphone",
      sortOrder: 9,
      isPublished: true,
    },
    {
      id: "skill-10",
      name: "Android",
      category: "Mobile",
      proficiency: 82,
      icon: "smartphone",
      sortOrder: 10,
      isPublished: true,
    },
    {
      id: "skill-11",
      name: "Firebase",
      category: "Mobile",
      proficiency: 78,
      icon: "database",
      sortOrder: 11,
      isPublished: true,
    },
    {
      id: "skill-12",
      name: "MySQL",
      category: "Database",
      proficiency: 84,
      icon: "database",
      sortOrder: 12,
      isPublished: true,
    },
    {
      id: "skill-13",
      name: "PostgreSQL",
      category: "Database",
      proficiency: 84,
      icon: "database",
      sortOrder: 13,
      isPublished: true,
    },
    {
      id: "skill-14",
      name: "SQLite",
      category: "Database",
      proficiency: 88,
      icon: "database",
      sortOrder: 14,
      isPublished: true,
    },
    {
      id: "skill-15",
      name: "Firestore",
      category: "Database",
      proficiency: 78,
      icon: "database",
      sortOrder: 15,
      isPublished: true,
    },
    {
      id: "skill-16",
      name: "Vercel",
      category: "Deployment",
      proficiency: 86,
      icon: "network",
      sortOrder: 16,
      isPublished: true,
    },
    {
      id: "skill-17",
      name: "Hostinger",
      category: "Deployment",
      proficiency: 80,
      icon: "network",
      sortOrder: 17,
      isPublished: true,
    },
    {
      id: "skill-18",
      name: "GitHub",
      category: "Deployment",
      proficiency: 86,
      icon: "network",
      sortOrder: 18,
      isPublished: true,
    },
    {
      id: "skill-19",
      name: "LMS",
      category: "Focus Areas",
      proficiency: 88,
      icon: "braces",
      sortOrder: 19,
      isPublished: true,
    },
    {
      id: "skill-20",
      name: "CMS",
      category: "Focus Areas",
      proficiency: 86,
      icon: "braces",
      sortOrder: 20,
      isPublished: true,
    },
    {
      id: "skill-21",
      name: "Dashboards",
      category: "Focus Areas",
      proficiency: 88,
      icon: "braces",
      sortOrder: 21,
      isPublished: true,
    },
    {
      id: "skill-22",
      name: "School systems",
      category: "Focus Areas",
      proficiency: 86,
      icon: "braces",
      sortOrder: 22,
      isPublished: true,
    },
    {
      id: "skill-23",
      name: "NGO systems",
      category: "Focus Areas",
      proficiency: 84,
      icon: "braces",
      sortOrder: 23,
      isPublished: true,
    },
    {
      id: "skill-24",
      name: "Community apps",
      category: "Focus Areas",
      proficiency: 84,
      icon: "braces",
      sortOrder: 24,
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
        "Teach basic computer skills and IT-related subjects to Class IX and X students, with a focus on practical digital literacy, first-time computer users, and clear technical foundations.",
      achievements: [
        "Prepare lessons and activities around computer fundamentals, office tools, internet use, and practical IT concepts.",
        "Work with real classroom users, which shapes how I design simple interfaces, clear workflows, and patient onboarding.",
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
        "Work with clients and local organizations to turn practical requirements into responsive, maintainable systems.",
      ],
      techStack: ["Next.js", "Laravel", "Flutter", "MySQL"],
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
