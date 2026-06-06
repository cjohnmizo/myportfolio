import Link from "next/link";
import { Mail } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function SiteFooter({
  footerNote,
}: {
  footerNote: string;
}) {
  return (
    <footer className="border-border relative overflow-hidden border-t py-10">
      <div className="mizo-pattern pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
        <div className="space-y-4">
          <BrandLogo />
          <div>
            <p className="text-foreground text-lg font-semibold">
              C. John Remthang
            </p>
            <p className="text-secondary mt-1 text-sm font-semibold">
              cjohnmizo
            </p>
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm leading-7">
            {footerNote}
          </p>
          <Link
            href={`mailto:${siteConfig.securityEmail}`}
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition"
          >
            <Mail className="h-4 w-4" />
            {siteConfig.securityEmail}
          </Link>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-primary transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Button asChild variant="outline">
            <Link href="/#contact">Start a project</Link>
          </Button>
        </div>
      </div>
      <div className="border-border text-muted-foreground relative mx-auto mt-8 max-w-7xl border-t px-4 pt-6 text-sm sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
        reserved.
      </div>
    </footer>
  );
}
