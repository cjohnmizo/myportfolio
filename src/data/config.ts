import {
    Code2, Phone, ExternalLink, Mail, MapPin,
    Github, Linkedin, Facebook, Instagram,
    LayoutDashboard, CheckCheck, UploadCloud,
    MessageSquareShare, Zap, Globe
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
        headline: "Digital Artisan",
        subheadline: "Full-Stack Developer & IT Educator",
        description: "I build pixel-perfect, engaging, and accessible digital experiences — minimalist by design, functional by code.",
        cta: {
            primary: "View My Work",
            secondary: "Get in Touch"
        }
    },

    about: {
        title: "About Me",
        bio: [
            "I'm a Full-Stack Developer based in Mizoram, India, with expertise in building modern web and mobile applications. With a Master's in Computer Application and over 6 years of development experience, I specialize in React, Next.js, and Flutter.",
            "Currently serving as a Vocational IT Teacher with the Government of Mizoram while working with clients worldwide on freelance projects. I'm passionate about clean code, user experience, and delivering solutions that make a real impact.",
            "My approach combines technical expertise with a deep understanding of business needs. Whether it's a complex web application, a cross-platform mobile app, or a full-stack solution, I focus on creating scalable, maintainable code that solves real problems."
        ],
        stats: [
            { label: "Location", value: "Mizoram, India", icon: MapPin },
            { label: "Experience", value: "6+ Years", icon: Code2 },
            { label: "Languages", value: "English, Mizo", icon: Globe }
        ],
        status: "Available for Hire"
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
                    { name: "Framer Motion", level: 85 }
                ]
            },
            {
                name: "Mobile",
                items: [
                    { name: "Flutter / Dart", level: 92 },
                    { name: "React Native", level: 85 },
                    { name: "iOS / Android", level: 88 }
                ]
            },
            {
                name: "Backend & Cloud",
                items: [
                    { name: "Node.js", level: 88 },
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
                icon: Phone
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
                icon: Zap
            }
        ]
    },

    projects: {
        title: "Selected Works",
        items: [
            {
                title: "Liankhawpui Directory",
                description: "News & Community Directory for Khawlian Village. Real-time updates, emergency contacts, and business listings.",
                tags: ["Flutter", "Firebase", "Android"],
                image: "https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                status: "Deployed",
                year: "2024",
                links: {
                    code: "#",
                    demo: "#"
                }
            },
            {
                title: "Smart Modern Admin Dashboard",
                description: "Premium SaaS-grade admin dashboard with glassmorphism UI, dark theme, user management, analytics, and news system.",
                tags: ["Next.js", "TypeScript", "MongoDB"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                status: "Live",
                year: "2024",
                links: {
                    code: "https://github.com/cjohnmizo/Smart-Modern-Admin-Dashboard",
                    demo: "https://smad-cjohnmizo.vercel.app/"
                }
            },
            {
                title: "Personal Portfolio",
                description: "Premium developer portfolio with 3D effects, parallax scroll, spotlight cards, glassmorphism, and light/dark mode.",
                tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                status: "Live",
                year: "2025",
                links: {
                    code: "https://github.com/cjohnmizo/cjohnmizo",
                    demo: "https://cjohnmizo.vercel.app"
                }
            }
        ]
    },

    contact: {
        title: "Get in Touch",
        email: "johnchangsan39@gmail.com",
        address: "Khawlian, Saitual Mizoram, 796261",
        statusOptions: ["Open to Opportunities", "Freelance & Full-Time"]
    },

    process: {
        title: "How I Work",
        description: "A refined process to turn your ideas into polished, production-ready software.",
        steps: [
            {
                title: "Discovery",
                description: "Understanding your goals, target audience, and project scope through deep-dive consultations.",
                icon: Globe
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
                icon: MessageSquareShare
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
