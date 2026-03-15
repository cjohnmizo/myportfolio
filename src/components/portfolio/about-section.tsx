import { BriefcaseBusiness, Orbit, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSnapshot } from "@/types/portfolio";

const highlights = [
  {
    title: "Product-minded engineering",
    description: "I optimize for user outcomes, not just implementation completeness.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Systems that scale calmly",
    description: "Architecture choices are made for clarity, maintainability, and future change.",
    icon: Orbit,
  },
  {
    title: "Delivery with operational trust",
    description: "I build admin surfaces and content systems that teams can safely use day to day.",
    icon: ShieldCheck,
  },
];

export function AboutSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
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
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-muted-foreground">Availability</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      {snapshot.profile.isAvailableForHire
                        ? "Open for selected roles and contracts"
                        : "Currently focused on active engagements"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-muted-foreground">Primary focus</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      Product platforms, admin systems, and polished user interfaces
                    </p>
                  </div>
                </div>
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
