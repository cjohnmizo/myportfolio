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
    <section
      id="skills"
      className="border-border border-y bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Skills"
            title="A practical stack for web, mobile, and admin systems"
            description="Grouped by how the tools are used in real projects: frontend interfaces, backend logic, mobile apps, databases, and delivery tools."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {groupedSkills.map(([category, skills]) => (
            <SectionReveal key={category}>
              <Card className="h-full shadow-none">
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
