import { GraduationCap } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateLabel } from "@/lib/utils";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function EducationSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <section id="education" className="py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Education"
            title="Academic grounding in computer applications and software thinking"
            description="Formal study in computer applications supported by years of hands-on work across web systems, CMS platforms, admin tools, and product delivery."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {snapshot.education.map((item, index) => (
            <SectionReveal key={item.id} delay={0.05 * index}>
              <Card className="h-full">
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.institution}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground">{item.degree}</h3>
                    <p className="mt-1 text-sm text-slate-300">{item.field}</p>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
                    {item.location} • {formatDateLabel(item.startDate)} - {formatDateLabel(item.endDate)}
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
