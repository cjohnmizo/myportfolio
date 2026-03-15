import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-foreground">
          {siteConfig.shortName}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/projects" className="transition hover:text-foreground">
            Archive
          </Link>
          <Link
            href="/admin/login"
            className="rounded-full border border-white/10 px-4 py-2 text-foreground transition hover:bg-white/5"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
