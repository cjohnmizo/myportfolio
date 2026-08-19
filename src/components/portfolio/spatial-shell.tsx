import Link from "next/link";
import { Github } from "lucide-react";

import type { PortfolioSnapshot } from "@/types/portfolio";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function SpatialShell({
  snapshot,
  children,
}: {
  snapshot: PortfolioSnapshot;
  children: React.ReactNode;
}) {
  return (
    <div className="spatial-shell">
      <header className="spatial-nav">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 text-foreground">
            <img
              src="/brand/cjohnmizo-favicon.png"
              alt=""
              width={28}
              height={28}
              className="size-7 rounded-sm object-cover"
            />
            <span className="font-heading text-sm tracking-wide">
              {snapshot.profile.fullName}
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-xs tracking-[0.16em] uppercase text-muted-foreground sm:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={`https://github.com/${snapshot.profile.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="font-heading text-foreground">{snapshot.profile.fullName}</p>
            <p className="mt-1 max-w-sm">{snapshot.settings.footerNote}</p>
          </div>
          <p className="text-xs tracking-wide uppercase">
            {snapshot.profile.location} · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
