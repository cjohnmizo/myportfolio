import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  MonitorCog,
} from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import type { PortfolioSnapshot } from "@/types/portfolio";

const highlights = [
  {
    title: "Web apps with clear structure",
    description:
      "Public websites and app screens built around useful content, strong hierarchy, and reliable contact paths.",
    icon: BriefcaseBusiness,
  },
  {
    title: "LMS, Firebase, and Laravel flows",
    description:
      "Practical learning, content, records, roles, and database workflows for teams that need simple control.",
    icon: MonitorCog,
  },
  {
    title: "Android and UI/UX improvements",
    description:
      "Flutter/Kotlin mobile flows, cleaner spacing, clearer actions, and responsive layouts for existing products.",
    icon: BookOpenCheck,
  },
];

export function AboutSection({
  snapshot,
  showFullStoryLink = true,
}: {
  snapshot: PortfolioSnapshot;
  showFullStoryLink?: boolean;
}) {
  return (
    <section id="about" className="dashboard-band relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="About"
            title={snapshot.settings.aboutTitle}
            description={snapshot.settings.aboutBody}
          />
        </SectionReveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionReveal>
            <Card className="border-primary/20 h-full">
              <CardContent className="space-y-5 p-8">
                <p className="text-muted-foreground text-base leading-8">
                  {snapshot.profile.longBio}
                </p>
                <div className="border-primary/20 bg-primary/10 rounded-2xl border p-4">
                  <p className="text-foreground text-sm font-medium">
                    Online identity:{" "}
                    <span className="text-muted-foreground">
                      {siteConfig.name}, also found as{" "}
                      {siteConfig.publicIdentityLabels.join(", ")}
                    </span>
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border-border bg-background/35 rounded-2xl border p-4">
                    <p className="text-muted-foreground text-sm">Best fit</p>
                    <p className="text-foreground mt-2 text-base font-semibold">
                      {snapshot.profile.isAvailableForHire
                        ? "Selected client work, school systems, LMS builds, and polished web interfaces"
                        : "Currently focused on active engagements"}
                    </p>
                  </div>
                  <div className="border-border bg-background/35 rounded-2xl border p-4">
                    <p className="text-muted-foreground text-sm">
                      Work standard
                    </p>
                    <p className="text-foreground mt-2 text-base font-semibold">
                      Polished surfaces, simple paths, maintainable code
                    </p>
                  </div>
                </div>
                {showFullStoryLink ? (
                  <div className="pt-2">
                    <Button asChild variant="outline">
                      <Link href="/about">
                        Read full background{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </SectionReveal>

          <div className="grid gap-6">
            {highlights.map((item, index) => (
              <SectionReveal key={item.title} delay={0.05 * index}>
                <Card className="hover:border-secondary/45 transition duration-300 hover:-translate-y-1">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="border-secondary/25 bg-secondary/10 text-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-7">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
