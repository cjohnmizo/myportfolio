import type { PortfolioSnapshot } from "@/types/portfolio";

export const portfolioSeed: PortfolioSnapshot = {
  profile: {
    id: "profile-1",
    fullName: "C. John Remthang",
    headline: "Dashboard and Web Systems Developer",
    currentRole: "Developer / Dashboard & LMS Builder",
    location: "Mizoram, India",
    email: "contact@cjohnmizo.in",
    shortBio:
      "I turn rough ideas into polished websites, learning platforms, mobile interfaces, and dashboard-style systems.",
    longBio:
      "I am a Mizoram-based developer focused on polished but practical digital products: clean public websites, learning workspaces, content systems, mobile apps, and dashboard interfaces that feel premium without becoming confusing. My teaching background keeps the work grounded in real users, clear onboarding, readable screens, and software that remains useful after the first launch.",
    avatarUrl: "/profile.jpg",
    resumeUrl: null,
    githubUsername: "cjohnmizo",
    yearsExperience: 6,
    isAvailableForHire: true,
    metrics: [
      { label: "Design mood", value: "Sapphire dashboard interface" },
      { label: "Core work", value: "Web / LMS / Mobile / Systems UI" },
      {
        label: "Best fit",
        value: "Schools, coaching teams, NGOs, small businesses, and founders",
      },
    ],
  },
  settings: {
    id: "settings-1",
    heroEyebrow: "Polished digital command centers",
    heroTitle:
      "I build polished digital dashboards for schools, teams, and local businesses.",
    heroSubtitle:
      "A Mizoram-based developer building fast portfolio sites, LMS flows, mobile apps, and operations dashboards with a calm sapphire interface style.",
    heroDescription:
      "Each project is presented like a focused command center: the goal, the workflow, the build direction, and the next action are clear from the first screen.",
    aboutTitle: "Practical software shaped like a premium control room",
    aboutBody:
      "The work is built for people who need usable software, not decoration. Every screen has a clear purpose, responsive layout, direct actions, and enough visual presence to feel memorable.",
    contactTitle: "Have a digital system that needs a sharper interface?",
    contactDescription:
      "Send the idea, timeline, and links you already have. I will review the project and shape the next version around clear content, user flow, and a premium dashboard feel.",
    seoTitle: "C. John Remthang | Dashboard, LMS & Web Developer",
    seoDescription:
      "Portfolio of C. John Remthang, a Mizoram-based developer building dashboard interfaces, LMS platforms, mobile apps, websites, and practical digital systems.",
    footerNote:
      "Building practical digital systems for schools, teams, and local businesses.",
    primaryAccent: "#1a3d63",
    secondaryAccent: "#4a7fa7",
  },
  featuredProjects: [],
  projects: [
    {
      id: "project-1",
      slug: "liankhawpui-community-platform",
      title: "Liankhawpui",
      excerpt:
        "A mobile-first community hub for village updates, directories, and trusted local information.",
      description:
        "Liankhawpui is shaped as a calm community information hub for Khawlian. The experience brings announcements, local groups, useful contacts, and village updates into one mobile-first surface.",
      challenge:
        "Important updates can become scattered across calls, messages, and informal groups. The interface needed to feel simple, trusted, and readable even for users with inconsistent connectivity.",
      solution:
        "I organized the app around a clear directory, concise news cards, and offline-aware data planning with Flutter and PowerSync.",
      impact:
        "The project gives the community a cleaner place to find local information and reduces the friction of repeating the same updates across many channels.",
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
            "App planning, interface structure, Flutter development, and offline-aware data flow design.",
        },
        {
          label: "Key feature",
          value: "Village directory for groups, contacts, and local details.",
        },
        {
          label: "Key feature",
          value: "News and announcement flow for community updates.",
        },
        {
          label: "Key feature",
          value: "Offline-aware mobile access planning with PowerSync.",
        },
        { label: "Focus", value: "Community access" },
      ],
    },
    {
      id: "project-2",
      slug: "tz-coaching-lms",
      title: "TZ Coaching LMS",
      excerpt:
        "A focused learning workspace for classes, study materials, student access, and staff control.",
      description:
        "TZ Coaching LMS is a learning workspace concept for coaching teams that need organized classes, readable materials, student access, and simple day-to-day management.",
      challenge:
        "Learning platforms often become heavy and confusing. The product needed a cleaner path for students while still giving staff enough control over courses and updates.",
      solution:
        "I shaped the experience around course lanes, lesson cards, clear student navigation, and a dashboard-style staff view that avoids unnecessary clutter.",
      impact:
        "The direction helps coaching teams keep learning resources consistent and gives students a simpler way to find what they need.",
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
      techStack: ["LMS", "Dashboard UI", "Content Flow"],
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
          value: "Staff workflow for managing learning resources.",
        },
        { label: "Focus", value: "Learning workflow" },
      ],
    },
    {
      id: "project-3",
      slug: "gaby-farm",
      title: "Gaby Farm",
      excerpt:
        "A clean business presence for farm products, updates, credibility, and direct enquiries.",
      description:
        "Gaby Farm is a business-facing website direction for presenting farm information, product details, updates, and contact paths with a calm premium feel.",
      challenge:
        "The site needed to feel credible and polished without becoming difficult to update or too heavy for visitors who just want clear information.",
      solution:
        "I kept the structure focused on product visibility, simple page sections, update-ready content, and direct enquiry paths.",
      impact:
        "The project gives the business a clearer online presence and makes it easier for customers to understand products and make contact.",
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
      techStack: ["Web", "Content Workflow", "Responsive UI"],
      metrics: [
        {
          label: "My role",
          value:
            "Website structure, public page design, content workflow planning, and enquiry path design.",
        },
        {
          label: "Key feature",
          value: "Clean product and farm information presentation.",
        },
        {
          label: "Key feature",
          value: "Simple update flow for business content.",
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
      title: "Smart Modern Dashboard",
      excerpt:
        "A polished operations dashboard for analytics, tasks, records, and quick reporting.",
      description:
        "Smart Modern Dashboard is a polished operations interface for teams that need analytics, task flow, and records in one fast-scanning command center.",
      challenge:
        "Operational screens can become crowded quickly. The goal was to create a more polished dashboard without losing scan speed or everyday usability.",
      solution:
        "I used a structured layout, strong visual hierarchy, reusable components, and typed data flows to keep analytics, tasks, and management views consistent.",
      impact:
        "The project provides a reusable dashboard foundation where premium visual style supports clarity instead of hiding the workflow.",
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
          value: "Task and operations panels for routine work.",
        },
        {
          label: "Key feature",
          value: "Reusable layout foundation for internal tools.",
        },
        { label: "Focus", value: "Operations workflow" },
      ],
    },
    {
      id: "project-5",
      slug: "tualchher-cms",
      title: "Tualchher CMS",
      excerpt:
        "A publishing workspace for structured content, media, SEO controls, and role-aware workflows.",
      description:
        "Tualchher CMS is a publishing workspace for teams that need structured content, media management, redirects, role permissions, and SEO controls in one predictable interface.",
      challenge:
        "The CMS needed to support serious editorial work without making the interface feel intimidating for everyday content users.",
      solution:
        "I organized the system around role-aware controls, repeatable forms, media handling, and clear publishing states.",
      impact:
        "The platform gives content teams stronger control over publishing while keeping the workflow predictable and maintainable.",
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
      techStack: ["Laravel 12", "Tailwind CSS", "MySQL", "Permissions"],
      metrics: [
        {
          label: "My role",
          value:
            "CMS architecture, publishing workflow, role-aware controls, and content management structure.",
        },
        {
          label: "Key feature",
          value: "Structured publishing workflow for editorial content.",
        },
        {
          label: "Key feature",
          value: "Media management and SEO controls in the workspace.",
        },
        {
          label: "Key feature",
          value: "Role-based access for safer content operations.",
        },
        { label: "Focus", value: "Publishing workflow" },
      ],
    },
    {
      id: "project-6",
      slug: "library-lms-tools",
      title: "Library and LMS Tools",
      excerpt:
        "School-focused tools for cataloguing, learning resources, student access, and staff workflows.",
      description:
        "This work covers library and learning-management tools for schools or institutions that need practical systems for records, resources, and student access.",
      challenge:
        "Schools often need software that is easy to understand, affordable to maintain, and useful for staff without technical support every day.",
      solution:
        "The approach keeps the structure simple: searchable records, clear resource pages, staff controls, and responsive layouts.",
      impact:
        "The work supports better organization of learning resources and gives institutions a cleaner path to managing records online.",
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
            "System planning, searchable record structure, staff controls, and responsive interface direction.",
        },
        {
          label: "Key feature",
          value: "Searchable records for library and learning resources.",
        },
        {
          label: "Key feature",
          value: "Simple controls for school staff workflows.",
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
      category: "Interface Engineering",
      proficiency: 92,
      icon: "code-xml",
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: "skill-2",
      name: "React",
      category: "Interface Engineering",
      proficiency: 90,
      icon: "code-xml",
      sortOrder: 2,
      isPublished: true,
    },
    {
      id: "skill-3",
      name: "TypeScript",
      category: "Interface Engineering",
      proficiency: 90,
      icon: "braces",
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: "skill-4",
      name: "Tailwind CSS",
      category: "Interface Engineering",
      proficiency: 88,
      icon: "code-xml",
      sortOrder: 4,
      isPublished: true,
    },
    {
      id: "skill-5",
      name: "Dashboard UX",
      category: "Product Experience",
      proficiency: 88,
      icon: "braces",
      sortOrder: 5,
      isPublished: true,
    },
    {
      id: "skill-6",
      name: "LMS Workflows",
      category: "Product Experience",
      proficiency: 88,
      icon: "braces",
      sortOrder: 6,
      isPublished: true,
    },
    {
      id: "skill-7",
      name: "CMS Workflows",
      category: "Product Experience",
      proficiency: 86,
      icon: "braces",
      sortOrder: 7,
      isPublished: true,
    },
    {
      id: "skill-8",
      name: "Responsive Layouts",
      category: "Product Experience",
      proficiency: 90,
      icon: "braces",
      sortOrder: 8,
      isPublished: true,
    },
    {
      id: "skill-9",
      name: "Laravel",
      category: "System Foundations",
      proficiency: 86,
      icon: "server",
      sortOrder: 9,
      isPublished: true,
    },
    {
      id: "skill-10",
      name: "REST APIs",
      category: "System Foundations",
      proficiency: 84,
      icon: "server",
      sortOrder: 10,
      isPublished: true,
    },
    {
      id: "skill-11",
      name: "Authentication",
      category: "System Foundations",
      proficiency: 84,
      icon: "network",
      sortOrder: 11,
      isPublished: true,
    },
    {
      id: "skill-12",
      name: "Flutter",
      category: "Mobile Experience",
      proficiency: 88,
      icon: "smartphone",
      sortOrder: 12,
      isPublished: true,
    },
    {
      id: "skill-13",
      name: "Android",
      category: "Mobile Experience",
      proficiency: 82,
      icon: "smartphone",
      sortOrder: 13,
      isPublished: true,
    },
    {
      id: "skill-14",
      name: "Offline-first Planning",
      category: "Mobile Experience",
      proficiency: 82,
      icon: "database",
      sortOrder: 14,
      isPublished: true,
    },
    {
      id: "skill-15",
      name: "MySQL",
      category: "Data and Storage",
      proficiency: 84,
      icon: "database",
      sortOrder: 15,
      isPublished: true,
    },
    {
      id: "skill-16",
      name: "PostgreSQL",
      category: "Data and Storage",
      proficiency: 84,
      icon: "database",
      sortOrder: 16,
      isPublished: true,
    },
    {
      id: "skill-17",
      name: "SQLite",
      category: "Data and Storage",
      proficiency: 88,
      icon: "database",
      sortOrder: 17,
      isPublished: true,
    },
    {
      id: "skill-18",
      name: "Vercel",
      category: "Launch and Delivery",
      proficiency: 86,
      icon: "network",
      sortOrder: 18,
      isPublished: true,
    },
    {
      id: "skill-19",
      name: "GitHub",
      category: "Launch and Delivery",
      proficiency: 86,
      icon: "network",
      sortOrder: 19,
      isPublished: true,
    },
    {
      id: "skill-20",
      name: "Client Handoff",
      category: "Launch and Delivery",
      proficiency: 82,
      icon: "network",
      sortOrder: 20,
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
        "Teach IT and ITeS to Class IX and X students, with a focus on practical digital literacy, first-time computer users, and clear technical foundations.",
      achievements: [
        "Prepare lessons and activities around computer fundamentals, office tools, internet use, and practical IT concepts.",
        "Bring classroom empathy into interface work: patient onboarding, readable screens, and clear workflows.",
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
        "Build websites, learning platforms, CMS tools, dashboards, and mobile apps for practical business, school, and community needs.",
      achievements: [
        "Shape rough requirements into project structure, user flows, responsive interfaces, and deployment-ready builds.",
        "Use a dashboard style where it helps the product feel clearer, more premium, and easier to scan.",
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
