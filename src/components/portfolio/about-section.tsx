import { ArrowRight, BriefcaseBusiness, Orbit, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import type { PortfolioSnapshot } from "@/types/portfolio";

const highlights = [
  {
    title: "Narrative-led product thinking",
    description: "I shape the story a product needs to tell before I decide how the interface or system should behave.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Systems that scale calmly",
    description: "Architecture decisions are made for clarity, maintainability, and growth without operational chaos.",
    icon: Orbit,
  },
  {
    title: "Execution teams can trust",
    description: "I build admin surfaces, workflows, and delivery systems that hold up under real day-to-day use.",
    icon: ShieldCheck,
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
    <section id="about" className="py-18 sm:py-24">
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
                <p className="text-lg leading-8 text-slate-200/90">{snapshot.profile.longBio}</p>
                <div className="rounded-2xl border border-secondary/20 bg-secondary/10 p-4">
                  <p className="text-sm font-medium text-foreground">
                    Online identity:
                    <span className="ml-2 text-muted-foreground">
                      {siteConfig.name}, also found as {siteConfig.publicIdentityLabels.join(", ")}
                    </span>
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-muted-foreground">Best fit</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      {snapshot.profile.isAvailableForHire
                        ? "Open for selected roles, product builds, and high-trust contract work"
                        : "Currently focused on active engagements"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-muted-foreground">What I optimize for</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      Product clarity, reliable systems, and interfaces people can use with confidence
                    </p>
                  </div>
                </div>
                {showFullStoryLink ? (
                  <div className="pt-2">
                    <Button asChild variant="outline">
                      <Link href="/about">
                        Read full background <ArrowRight className="ml-2 h-4 w-4" />
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
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
