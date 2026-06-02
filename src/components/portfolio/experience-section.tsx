import { BriefcaseBusiness } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateLabel } from "@/lib/utils";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function ExperienceSection({
  snapshot,
}: {
  snapshot: PortfolioSnapshot;
}) {
  return (
    <section id="experience" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Experience"
            title="Teaching, client work, and practical software delivery"
            description="A grounded mix of IT teaching and hands-on development work for websites, dashboards, LMS platforms, CMS tools, and mobile apps."
          />
        </SectionReveal>
        <div className="mt-10 space-y-6">
          {snapshot.experiences.map((experience, index) => (
            <SectionReveal key={experience.id} delay={0.05 * index}>
              <Card>
                <CardContent className="grid gap-6 p-6 lg:grid-cols-[220px_1fr]">
                  <div className="space-y-3">
                    <div className="bg-muted text-secondary flex h-11 w-11 items-center justify-center rounded-lg">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {experience.employmentType}
                      </p>
                      <p className="text-foreground mt-2 text-lg font-semibold">
                        {experience.company}
                      </p>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {experience.location}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs uppercase">
                      {formatDateLabel(experience.startDate)} -{" "}
                      {formatDateLabel(experience.endDate)}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-foreground text-2xl font-semibold">
                        {experience.role}
                      </h3>
                      <Badge variant="secondary">
                        {experience.employmentType}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-7">
                      {experience.summary}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {experience.achievements.map((achievement) => (
                        <div
                          key={achievement}
                          className="border-border bg-muted text-foreground rounded-lg border p-4 text-sm leading-7"
                        >
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
