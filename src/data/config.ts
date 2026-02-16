import * as Lucide from "lucide-react";

const {
    Code2, Phone, ExternalLink, Mail, ArrowDown, MapPin, Github, Linkedin, Facebook, Instagram,
    LayoutDashboard, CheckCheck, UploadCloud, MessageSquareShare
} = Lucide as any;

const Globe = (Lucide as any).Globe || (Lucide as any).Globe2 || (Lucide as any).Earth;
const Zap = (Lucide as any).Zap || (Lucide as any).ZapIcon;

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
        typingStrings: [
            "BUILDING_SCALABLE_WEB_SOLUTIONS",
            "MOBILE_FIRST_ARCHITECTURE",
            "SYSTEM_OPTIMIZATION"
        ],
        description: "Transforming ideas into production-ready applications using React, Next.js, and Modern Tech Stack.",
        cta: {
            primary: "EXECUTE_PROJECTS >",
            secondary: "CONTACT_ME"
        }
    },

    about: {
        title: "USER_PROFILE",
        bio: [
            "I'm a Full-Stack Developer based in Mizoram, India, with expertise in building modern web and mobile applications. With a Master's in Computer Application and over 6 years of development experience, I specialize in React, Next.js, and Flutter.",
            "Currently serving as a Vocational IT Teacher with the Government of Mizoram while working with clients worldwide on freelance projects. I'm passionate about clean code, user experience, and delivering solutions that make a real impact.",
            "My approach combines technical expertise with a deep understanding of business needs. Whether it's a complex web application, a cross-platform mobile app, or a full-stack solution, I focus on creating scalable, maintainable code that solves real problems."
        ],
        stats: [
            { label: "Coordinates", value: "Mizoram, India", icon: MapPin },
            { label: "Experience_Level", value: "Level 6+ (Years)", icon: Code2 },
            { label: "Language_Pack", value: "English, Mizo", icon: Globe }
        ],
        status: "ONLINE & READY"
    },

    skills: {
        title: "SYSTEM_CAPABILITIES",
        categories: [
            {
                name: "Frontend_Architecture",
                items: [
                    { name: "React / Next.js", level: 95 },
                    { name: "TypeScript", level: 90 },
                    { name: "Tailwind CSS", level: 95 },
                    { name: "Framer Motion", level: 85 }
                ]
            },
            {
                name: "Mobile_Development",
                items: [
                    { name: "Flutter / Dart", level: 92 },
                    { name: "React Native", level: 85 },
                    { name: "iOS / Android", level: 88 }
                ]
            },
            {
                name: "Backend_Protocol",
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
        title: "AVAILABLE_PROTOCOLS",
        items: [
            {
                title: "Web_App_Development",
                description: "Custom web applications built with React, Next.js, and modern frameworks. Optimized for high performance.",
                features: ["React & Next.js", "Responsive_UI", "Performance_Ops"],
                icon: Code2
            },
            {
                title: "Mobile_Architecture",
                description: "Cross-platform mobile applications using Flutter. Native performance with a single codebase.",
                features: ["Flutter / Dart", "iOS & Android", "Native_Compilation"],
                icon: Phone
            },
            {
                title: "Full-Stack_Systems",
                description: "End-to-end development from database design to deployment. API integration and cloud infrastructure.",
                features: ["API_Endpoints", "Database_Schema", "Cloud_Deploy"],
                icon: ExternalLink
            },
            {
                title: "Technical_Consulting",
                description: "Expert guidance on technology stack selection, code review, architecture planning, and optimization.",
                features: ["Code_Audits", "System_Design", "Tech_Stack_Optimization"],
                icon: Zap
            }
        ]
    },

    projects: {
        title: "MISSION_LOGS",
        items: [
            {
                title: "Liankhawpui_Directory",
                description: "News & Community Directory for Khawlian Village. Real-time updates, emergency contacts, and business listings.",
                tags: ["Flutter", "Firebase", "Android"],
                image: "https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                status: "DEPLOYED",
                links: {
                    code: "#",
                    demo: "#"
                }
            },
            {
                title: "Govt_Higher_Sec_Saitual",
                description: "Official academic portal for GHSS Saitual. Features student management, attendance tracking, and digital notice board.",
                tags: ["React", "Node.js", "MongoDB"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                status: "ONLINE",
                links: {
                    code: "#",
                    demo: "https://ghsssaitual.in/"
                }
            },
            {
                title: "Zokhawthar_Welfare",
                description: "Community welfare management system handling member database, donations, and event scheduling.",
                tags: ["Next.js", "TypeScript", "Supabase"],
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                status: "ACTIVE",
                links: {
                    code: "#",
                    demo: "#"
                }
            }
        ]
    },

    contact: {
        title: "ESTABLISH_UPLINK",
        email: "johnchangsan39@gmail.com",
        address: "Khawlian, Saitual Mizoram, 796261",
        statusOptions: ["OPEN_TO_OPPORTUNITIES", "FREELANCE / FULL_TIME"]
    },

    process: {
        title: "SYSTEM_PROTOCOL",
        description: "Executing precise algorithms to transform requirements into deployed solutions.",
        steps: [
            {
                title: "Discovery",
                description: "System analysis and requirements gathering to establish core parameters.",
                icon: Globe
            },
            {
                title: "Planning",
                description: "Architectural design and technology stack selection for optimal performance.",
                icon: LayoutDashboard
            },
            {
                title: "Development",
                description: "Iterative coding sequences with continuous integration and real-time updates.",
                icon: Code2
            },
            {
                title: "Testing",
                description: "Rigorous quality assurance protocols to ensure system integrity and security.",
                icon: CheckCheck
            },
            {
                title: "Deployment",
                description: "Production environment configuration and seamless system launch.",
                icon: UploadCloud
            },
            {
                title: "Support",
                description: "Ongoing system maintenance, patch management, and technical assistance.",
                icon: MessageSquareShare
            }
        ]
    },

    testimonials: {
        title: "USER_FEEDBACK",
        description: "Authenticated logs from client interactions and successful deployments.",
        items: [
            {
                name: "Sarah Mitchell",
                role: "Product Manager, TechStart Inc",
                content: "Working with John was an excellent experience. The project was delivered on time with exceptional quality and attention to detail.",
                image: "/profile.jpg" // Using placeholder
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
