import { env } from "@/lib/env";

export const siteConfig = {
  name: "C. John Remthang",
  shortName: "cjohnmizo",
  publicIdentityLabels: ["C. John", "CJohn Mizo", "cjohnmizo"],
  alternateNames: ["C. John", "CJohn Mizo", "C John Remthang", "John Remthang"],
  domain: "cjohnmizo.in",
  url: env.NEXT_PUBLIC_SITE_URL,
  title: "C. John Remthang | CJohn Mizo | Full-Stack Engineer Portfolio",
  description:
    "Portfolio of C. John Remthang, also known online as C. John, CJohn Mizo, and cjohnmizo, built with Next.js, Supabase, and a recruiter-first product experience.",
  keywords: [
    "C. John Remthang",
    "C John Remthang",
    "C. John",
    "C John",
    "CJohn Mizo",
    "John Remthang",
    "cjohnmizo",
    "cjohnmizo.in",
    "full-stack developer",
    "software engineer",
    "Next.js portfolio",
    "TypeScript developer",
    "Supabase",
    "developer portfolio",
  ],
  locale: "en_US",
  adminEmail: env.ADMIN_EMAIL,
  defaultOgImage: "/profile.jpg",
  navItems: [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
};
