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
    title: "Websites and public pages",
    description:
      "Clear sites for businesses, schools, organizations, and local projects that need a trustworthy online presence.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Dashboards and admin tools",
    description:
      "Internal tools for records, content, tasks, reports, and workflows that need to stay easy to use.",
    icon: MonitorCog,
  },
  {
    title: "Learning and community systems",
    description:
      "LMS, library, and mobile app work for schools, coaching projects, and community information access.",
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
    <section id="about" className="py-14 sm:py-20">
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
            <Card className="h-full">
              <CardContent className="space-y-5 p-8">
                <p className="text-muted-foreground text-base leading-8">
                  {snapshot.profile.longBio}
                </p>
                <div className="border-border bg-muted rounded-lg border p-4">
                  <p className="text-foreground text-sm font-medium">
                    Online identity:
                    <span className="text-muted-foreground ml-2">
                      {siteConfig.name}, also found as{" "}
                      {siteConfig.publicIdentityLabels.join(", ")}
                    </span>
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border-border bg-card rounded-lg border p-4">
                    <p className="text-muted-foreground text-sm">Best fit</p>
                    <p className="text-foreground mt-2 text-base font-semibold">
                      {snapshot.profile.isAvailableForHire
                        ? "Selected client work, school or NGO projects, and development roles"
                        : "Currently focused on active engagements"}
                    </p>
                  </div>
                  <div className="border-border bg-card rounded-lg border p-4">
                    <p className="text-muted-foreground text-sm">
                      Work standard
                    </p>
                    <p className="text-foreground mt-2 text-base font-semibold">
                      Simple interfaces, maintainable code, and useful workflows
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
                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-muted text-secondary flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">
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
