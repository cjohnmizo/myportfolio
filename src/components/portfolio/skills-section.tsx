import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function SkillsSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const groupedSkills = Object.entries(
    snapshot.skills.reduce<Record<string, typeof snapshot.skills>>(
      (accumulator, skill) => {
        accumulator[skill.category] ??= [];
        accumulator[skill.category].push(skill);
        return accumulator;
      },
      {},
    ),
  );

  return (
    <section id="skills" className="dashboard-band py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Skills"
            title="Stack grouped around product experience"
            description="The toolset is organized by what it helps ship: polished interfaces, LMS and CMS flows, mobile screens, data foundations, and launch-ready delivery."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groupedSkills.map(([category, skills]) => (
            <SectionReveal key={category}>
              <Card className="light-sweep hover:border-primary/45 h-full shadow-none transition duration-300 hover:-translate-y-1">
                <CardContent className="space-y-5 p-5">
                  <h3 className="text-foreground text-base font-semibold">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill.id} variant="muted">
                        {skill.name}
                      </Badge>
                    ))}
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
