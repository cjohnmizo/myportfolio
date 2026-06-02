import { GraduationCap } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateLabel } from "@/lib/utils";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function EducationSection({
  snapshot,
}: {
  snapshot: PortfolioSnapshot;
}) {
  return (
    <section id="education" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Education"
            title="Computer applications foundation"
            description="Formal study in computer applications, supported by practical work across websites, databases, admin tools, and learning systems."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {snapshot.education.map((item) => (
            <SectionReveal key={item.id}>
              <Card className="h-full shadow-none">
                <CardContent className="space-y-4 p-6">
                  <div className="bg-muted text-secondary flex h-11 w-11 items-center justify-center rounded-lg">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {item.institution}
                    </p>
                    <h3 className="text-foreground mt-2 text-2xl font-semibold">
                      {item.degree}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {item.field}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-7">
                    {item.description}
                  </p>
                  <div className="border-border bg-muted text-muted-foreground rounded-lg border p-4 text-sm">
                    {item.location} - {formatDateLabel(item.startDate)} -{" "}
                    {formatDateLabel(item.endDate)}
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
