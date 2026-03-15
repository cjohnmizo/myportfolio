import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Built for performance and clarity.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/projects" className="transition hover:text-foreground">
            Projects
          </Link>
          <Link href="/admin/login" className="transition hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
