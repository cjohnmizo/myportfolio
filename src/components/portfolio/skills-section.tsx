import { Braces, Code2, Database, Network, Server, Smartphone } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSnapshot } from "@/types/portfolio";

const iconMap = {
  braces: Braces,
  "code-xml": Code2,
  database: Database,
  network: Network,
  server: Server,
  smartphone: Smartphone,
};

export function SkillsSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const groupedSkills = Object.entries(
    snapshot.skills.reduce<Record<string, typeof snapshot.skills>>((accumulator, skill) => {
      accumulator[skill.category] ??= [];
      accumulator[skill.category].push(skill);
      return accumulator;
    }, {}),
  );

  return (
    <section id="skills" className="py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Skills"
            title="Technical depth across product-facing systems"
            description="A focused stack across frontend architecture, data systems, mobile delivery, and the tooling required to keep products maintainable in production."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {groupedSkills.map(([category, skills], index) => (
            <SectionReveal key={category} delay={0.05 * index}>
              <Card className="h-full">
                <CardContent className="space-y-6 p-6">
                  <div>
                    <p className="section-kicker text-xs text-primary">Skill category</p>
                    <h3 className="mt-3 text-xl font-semibold text-foreground">{category}</h3>
                  </div>
                  <div className="space-y-4">
                    {skills.map((skill) => {
                      const Icon = iconMap[skill.icon as keyof typeof iconMap] ?? Code2;
                      return (
                        <div key={skill.id} className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{skill.name}</p>
                                <p className="text-xs text-muted-foreground">{skill.category}</p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-secondary">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-900/70">
                            <div
                              className="h-full rounded-full bg-[linear-gradient(90deg,#6366f1,#22c55e)]"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
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
