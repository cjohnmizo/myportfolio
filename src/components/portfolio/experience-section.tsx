import { BriefcaseBusiness } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateLabel } from "@/lib/utils";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function ExperienceSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <section id="experience" className="py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Experience"
            title="Experience across delivery, teaching, and practical technical leadership"
            description="My background combines hands-on product work, freelance execution, and teaching-focused communication, which helps me bridge implementation depth with real-world usability."
          />
        </SectionReveal>
        <div className="mt-10 space-y-6">
          {snapshot.experiences.map((experience, index) => (
            <SectionReveal key={experience.id} delay={0.05 * index}>
              <Card>
                <CardContent className="grid gap-6 p-6 lg:grid-cols-[220px_1fr]">
                  <div className="space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{experience.employmentType}</p>
                      <p className="mt-2 text-lg font-semibold text-foreground">{experience.company}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{experience.location}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {formatDateLabel(experience.startDate)} - {formatDateLabel(experience.endDate)}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-semibold text-foreground">{experience.role}</h3>
                      <Badge variant="secondary">{experience.employmentType}</Badge>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{experience.summary}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {experience.achievements.map((achievement) => (
                        <div key={achievement} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200/90">
                          {achievement}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experience.techStack.map((item) => (
                        <Badge key={item} variant="muted">
                          {item}
                        </Badge>
                      ))}
                    </div>
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
