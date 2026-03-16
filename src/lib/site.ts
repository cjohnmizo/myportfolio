import { env } from "@/lib/env";

export const siteConfig = {
  name: "C. John Remthang",
  shortName: "cjohnmizo",
  domain: "cjohnmizo.in",
  url: env.NEXT_PUBLIC_SITE_URL,
  title: "Principal-level Full-Stack Developer Portfolio",
  description:
    "Premium developer portfolio and admin CMS for C. John Remthang, built with Next.js, Supabase, and a recruiter-first product experience.",
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
