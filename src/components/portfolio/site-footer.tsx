import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function SiteFooter({
  contactEmail,
  footerNote,
}: {
  contactEmail: string;
  footerNote: string;
}) {
  return (
    <footer className="border-border relative overflow-hidden border-t py-10">
      <div className="mizo-pattern pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
        <div className="space-y-4">
          <BrandLogo />
          <p className="text-muted-foreground max-w-2xl text-sm leading-7">
            {footerNote}
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <Link href="/about" className="hover:text-primary transition">
              About
            </Link>
            <Link href="/projects" className="hover:text-primary transition">
              Projects
            </Link>
            <Link href="/#contact" className="hover:text-primary transition">
              Contact
            </Link>
          </div>
          <Button asChild variant="outline">
            <Link href={`mailto:${contactEmail}`}>Start a project</Link>
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
