import Link from "next/link";

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
    <footer className="border-t border-white/5 py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
        <div className="space-y-4">
          <p className="section-kicker text-xs text-primary">cjohnmizo.in</p>
          <h2 className="max-w-xl text-2xl font-semibold text-foreground">
            Thoughtful software, calm systems, and clear case studies.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{footerNote}</p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link href="/projects" className="transition hover:text-foreground">
              Projects
            </Link>
            <Link href="/#contact" className="transition hover:text-foreground">
              Contact
            </Link>
          </div>
          <Button asChild variant="outline">
            <Link href={`mailto:${contactEmail}`}>Start a conversation</Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/5 px-4 pt-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
