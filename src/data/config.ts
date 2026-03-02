import {
    Code2, Smartphone, ExternalLink, MapPin,
    Github, Linkedin, Facebook, Instagram,
    LayoutDashboard, CheckCheck, UploadCloud,
    Headphones, Terminal, Search, Globe
} from "lucide-react";

export const config = {
    meta: {
        title: "C. John Remthang | Full-Stack Developer",
        description: "Portfolio of C. John Remthang, a full-stack developer creating practical web, mobile, and CMS products.",
        url: "https://cjohnmizo.vercel.app",
        keywords: ["Full-Stack Developer", "Product Engineer", "Laravel Developer", "Next.js Developer", "Flutter Developer", "Mizoram", "C. John Remthang"],
        author: "C. John Remthang",
        twitterHandle: "@cjohnmizo"
    },

    profile: {
        name: "C. John Remthang",
        shortName: "CJOHNMIZO",
        title: "Full-Stack Developer",
        location: "Mizoram, India",
        email: "johnchangsan39@gmail.com",
        resumeLink: "/resume",
        socials: [
            { name: "Github", href: "https://github.com/cjohnmizo/", icon: Github },
            { name: "LinkedIn", href: "https://www.linkedin.com/in/c-john-remthang/", icon: Linkedin },
            { name: "Facebook", href: "https://www.facebook.com/john.changsan.9", icon: Facebook },
            { name: "Instagram", href: "https://www.instagram.com/c.john_mizo/", icon: Instagram }
        ]
    },

    hero: {
        headline: "Building Useful Software for Real People",
        subheadline: "Full-Stack Developer from Mizoram",
        description: "I turn ideas into stable web, mobile, and CMS products that are simple to use and maintain.",
        cta: {
            primary: "See My Work",
            secondary: "Let's Talk"
        }
    },

    about: {
        title: "About Me",
        bio: [
            "I'm John, a full-stack developer from Mizoram, India. I build web and mobile products that solve real user and business needs.",
            "With 6+ years of experience and an MCA background, I work across planning, architecture, development, and deployment.",
            "I serve as a Vocational IT Teacher with the Government of Mizoram and also partner with clients on freelance product and CMS work."
        ],
        stats: [
            { label: "Experience", value: "6+ Years", icon: Code2 },
            { label: "Focus", value: "Web + Mobile + CMS", icon: Globe },
            { label: "Location", value: "Mizoram, India", icon: MapPin }
        ],
        status: "Open for Select Projects"
    },

    skills: {
        title: "Technical Skills",
        categories: [
            {
                name: "Frontend Engineering",
                items: [
                    { name: "React / Next.js", level: 95 },
                    { name: "TypeScript", level: 90 },
                    { name: "Tailwind CSS", level: 95 },
                    { name: "Bootstrap", level: 90 },
                    { name: "Framer Motion", level: 85 }
                ]
            },
            {
                name: "Mobile Development",
                items: [
                    { name: "Flutter / Dart", level: 92 },
                    { name: "Android Studio", level: 90 },
                    { name: "iOS / Android", level: 88 }
                ]
            },
            {
                name: "Backend & Data",
                items: [
                    { name: "Node.js", level: 88 },
                    { name: "Laravel", level: 85 },
                    { name: "PostgreSQL", level: 85 },
                    { name: "Firebase", level: 90 },
                    { name: "Supabase", level: 85 }
                ]
            }
        ]
    },

    services: {
        title: "What I Do",
        items: [
            {
                title: "Web Development",
                description: "I build modern responsive web apps with clean UI and scalable architecture.",
                features: ["Next.js / React Build", "Responsive UX", "Performance-first Delivery"],
                icon: Code2
            },
            {
                title: "Mobile Apps",
                description: "I build cross-platform mobile apps with polished UX and production-ready workflows.",
                features: ["Flutter Architecture", "Android + iOS Delivery", "Release-ready Build"],
                icon: Smartphone
            },
            {
                title: "Full-Stack Solutions",
                description: "I deliver complete systems from API and database design to deployment.",
                features: ["Data Modeling", "API + Admin Systems", "Deployment + Monitoring"],
                icon: ExternalLink
            },
            {
                title: "Technical Consulting",
                description: "I support architecture decisions, implementation planning, and code quality improvements.",
                features: ["Architecture Review", "Implementation Roadmap", "Quality Optimization"],
                icon: Terminal
            }
        ]
    },

    projects: {
        title: "Selected Works",
        items: [
            {
                title: "Tualchher CMS",
                description: "Modular CMS with role permissions, media management, SEO tools, redirect rules, and activity logs.",
                tags: ["Laravel 12", "TailwindCSS", "MySQL", "Spatie"],
                image: "/projects/tualchher-cms-dashboard.png",
                status: "Private",
                year: "2026",
                links: {
                    code: "https://github.com/cjohnmizo/Tualchher_CMS",
                    demo: "#",
                    docs: "https://github.com/cjohnmizo/Tualchher_CMS#readme"
                }
            },
            {
                title: "Liankhawpui",
                description: "Community app for news, announcements, and directory workflows with offline-first sync and role-based access.",
                tags: ["Flutter", "Supabase", "PowerSync"],
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                status: "Proprietary",
                year: "2026",
                links: {
                    code: "https://github.com/cjohnmizo/liankhawpui",
                    demo: "https://github.com/cjohnmizo/liankhawpui",
                    docs: "https://github.com/cjohnmizo/liankhawpui#readme"
                }
            },
            {
                title: "Smart Modern Admin Dashboard",
                description: "Full-stack admin system with secure auth, analytics, task management, and role-based access.",
                tags: ["Next.js", "TypeScript", "MongoDB"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                status: "Live",
                year: "2026",
                links: {
                    code: "https://github.com/cjohnmizo/Smart-Modern-Admin-Dashboard",
                    demo: "https://smad-cjohnmizo.vercel.app/",
                    docs: "https://github.com/cjohnmizo/Smart-Modern-Admin-Dashboard#readme"
                }
            },
            {
                title: "Portfolio Collection",
                description: "Collection of 10 production-ready portfolio templates for developers, creators, and startup builders.",
                tags: ["Bootstrap 5", "HTML", "CSS"],
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                status: "Live",
                year: "2026",
                links: {
                    code: "https://github.com/cjohnmizo/Portfolio-Collection",
                    demo: "https://portfolio-collection.vercel.app",
                    docs: "https://github.com/cjohnmizo/Portfolio-Collection#readme"
                }
            }
        ]
    },

    contact: {
        title: "Get in Touch",
        email: "johnchangsan39@gmail.com",
        address: "Khawlian, Saitual Mizoram, 796261",
        statusOptions: ["Freelance Collaboration", "Technical Consulting"]
    },

    process: {
        title: "How I Work",
        description: "A clear process from idea to production-ready software.",
        steps: [
            {
                title: "Discovery",
                description: "Understand goals, constraints, users, and priorities.",
                icon: Search
            },
            {
                title: "Planning",
                description: "Define architecture, choose stack, and map realistic milestones.",
                icon: LayoutDashboard
            },
            {
                title: "Development",
                description: "Build in iterations with clean standards and regular updates.",
                icon: Code2
            },
            {
                title: "Testing",
                description: "Validate reliability, usability, and performance before release.",
                icon: CheckCheck
            },
            {
                title: "Deployment",
                description: "Deploy with proper setup, rollout checks, and release notes.",
                icon: UploadCloud
            },
            {
                title: "Support",
                description: "Provide post-launch support, maintenance, and focused improvements.",
                icon: Headphones
            }
        ]
    },

    testimonials: {
        title: "Client Feedback",
        description: "What clients say about working with me.",
        items: [
            {
                name: "Product Client",
                role: "Operations Lead",
                content: "John turned complex requirements into a clean system and delivered milestones on schedule.",
                image: "/profile.jpg"
            },
            {
                name: "Startup Founder",
                role: "Founder",
                content: "Strong technical ownership, clear communication, and excellent execution from planning to deployment.",
                image: "/profile.jpg"
            },
            {
                name: "Community Partner",
                role: "Project Coordinator",
                content: "The final product was stable, easy to use, and matched our real workflow needs from day one.",
                image: "/profile.jpg"
            }
        ]
    }
};

