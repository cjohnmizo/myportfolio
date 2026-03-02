import {
    Code2, Smartphone, ExternalLink, MapPin,
    Github, Linkedin, Facebook, Instagram,
    LayoutDashboard, CheckCheck, UploadCloud,
    Headphones, Terminal, Search, Globe
} from "lucide-react";

export const config = {
    meta: {
        title: "C. John Remthang | Full-Stack Developer",
        description: "Portfolio of C. John Remthang, a Full-Stack Developer and IT Educator based in Mizoram. Specializing in Flutter, React, and Modern Web Technologies.",
        url: "https://cjohnmizo.vercel.app",
        keywords: ["Mobile App Developer", "Flutter Developer", "Web Developer", "Mizoram", "IT Educator", "C. John Remthang"],
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
        headline: "Calm, Scalable Digital Products",
        subheadline: "Full-Stack Product Engineer",
        description: "I design and build reliable software systems with clean interfaces, measurable performance, and strong long-term maintainability.",
        cta: {
            primary: "Explore Projects",
            secondary: "Start a Conversation"
        }
    },

    about: {
        title: "About Me",
        bio: [
            "I am a full-stack developer based in Mizoram, India, focused on building production-ready web and mobile products. With an MCA and 6+ years of hands-on experience, I specialize in React, Next.js, Laravel, and Flutter.",
            "Alongside my role as a Vocational IT Teacher with the Government of Mizoram, I collaborate on freelance product builds and internal tools for clients and communities.",
            "My process is simple: understand business constraints, define a clean technical approach, and ship stable software that is easy to operate and evolve."
        ],
        stats: [
            { label: "Location", value: "Mizoram, India", icon: MapPin },
            { label: "Experience", value: "6+ Years", icon: Code2 },
            { label: "Languages", value: "English, Mizo", icon: Globe }
        ],
        status: "Open for Select Projects"
    },

    skills: {
        title: "Technical Skills",
        categories: [
            {
                name: "Frontend",
                items: [
                    { name: "React / Next.js", level: 95 },
                    { name: "TypeScript", level: 90 },
                    { name: "Tailwind CSS", level: 95 },
                    { name: "Bootstrap", level: 90 },
                    { name: "Framer Motion", level: 85 }
                ]
            },
            {
                name: "Mobile",
                items: [
                    { name: "Flutter / Dart", level: 92 },
                    { name: "Android Studio", level: 90 },
                    { name: "iOS / Android", level: 88 }
                ]
            },
            {
                name: "Backend & Cloud",
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
                description: "Custom web applications built with React, Next.js, and modern frameworks. Optimized for performance and accessibility.",
                features: ["React & Next.js", "Responsive Design", "Performance Optimization"],
                icon: Code2
            },
            {
                title: "Mobile Apps",
                description: "Cross-platform mobile applications using Flutter. Native performance with a single codebase.",
                features: ["Flutter & Dart", "iOS & Android", "Native Compilation"],
                icon: Smartphone
            },
            {
                title: "Full-Stack Solutions",
                description: "End-to-end development from database design to deployment. API integration and cloud infrastructure.",
                features: ["REST APIs", "Database Design", "Cloud Deployment"],
                icon: ExternalLink
            },
            {
                title: "Technical Consulting",
                description: "Expert guidance on technology stack selection, code review, architecture planning, and optimization.",
                features: ["Code Audits", "System Architecture", "Stack Optimization"],
                icon: Terminal
            }
        ]
    },

    projects: {
        title: "Selected Works",
        items: [
            {
                title: "Tualchher CMS",
                description: "Modular production CMS with role-based access, publishing workflows, media library, SEO controls, and activity logging.",
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
                description: "Khawlian news and directory app with offline-first sync, role-based access, announcements, and in-app reading modules.",
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
                description: "Full-stack admin dashboard with secure auth, analytics, todo workflows, and role-based user management in a responsive premium UI.",
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
                description: "Collection of 10 production-ready Bootstrap portfolio templates for developers, creators, and founders.",
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
        statusOptions: ["Freelance Projects", "Product Consulting"]
    },

    process: {
        title: "How I Work",
        description: "A disciplined, collaborative process that turns ideas into dependable production software.",
        steps: [
            {
                title: "Discovery",
                description: "Understanding your goals, target audience, and project scope through deep-dive consultations.",
                icon: Search
            },
            {
                title: "Planning",
                description: "Architectural blueprint, technology selection, and milestone-driven roadmap creation.",
                icon: LayoutDashboard
            },
            {
                title: "Development",
                description: "Iterative, test-driven coding with continuous integration and regular progress updates.",
                icon: Code2
            },
            {
                title: "Testing",
                description: "Rigorous quality assurance covering functionality, performance, security, and cross-device compatibility.",
                icon: CheckCheck
            },
            {
                title: "Deployment",
                description: "Production environment setup, CI/CD pipeline configuration, and seamless launch coordination.",
                icon: UploadCloud
            },
            {
                title: "Support",
                description: "Ongoing maintenance, monitoring, feature iteration, and dedicated technical support.",
                icon: Headphones
            }
        ]
    },

    testimonials: {
        title: "Client Feedback",
        description: "What clients say about working with me.",
        items: [
            {
                name: "Sarah Mitchell",
                role: "Product Manager, TechStart Inc",
                content: "Working with John was an excellent experience. The project was delivered on time with exceptional quality and attention to detail.",
                image: "/profile.jpg"
            },
            {
                name: "David Chen",
                role: "CEO, Digital Solutions Ltd",
                content: "Professional, skilled, and reliable. John transformed our ideas into a beautiful, functional application that exceeded our expectations.",
                image: "/profile.jpg"
            },
            {
                name: "Priya Sharma",
                role: "Founder, StartupHub",
                content: "Great communication throughout the project. The technical expertise and problem-solving skills were impressive.",
                image: "/profile.jpg"
            }
        ]
    }
};

