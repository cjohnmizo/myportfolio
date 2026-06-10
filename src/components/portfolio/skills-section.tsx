import {
  Cloud,
  Code2,
  Database,
  Layers3,
  Smartphone,
  TerminalSquare,
} from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSnapshot } from "@/types/portfolio";

const skillGroups = [
  {
    category: "Frontend",
    description: "Readable interfaces, responsive layouts, and polished web screens.",
    icon: Code2,
  },
  {
    category: "Backend",
    description: "Laravel, PHP, APIs, roles, content flows, and system foundations.",
    icon: TerminalSquare,
  },
  {
    category: "Mobile",
    description: "Android, Kotlin, Flutter, and mobile-first product flows.",
    icon: Smartphone,
  },
  {
    category: "Database",
    description: "MySQL, PostgreSQL, Supabase, Firestore, and practical data structure.",
    icon: Database,
  },
  {
    category: "Deployment",
    description: "Vercel, Hostinger, GitHub, Firebase Hosting, and delivery support.",
    icon: Cloud,
  },
  {
    category: "Focus Areas",
    description: "LMS, CMS, dashboards, school systems, NGO systems, and community apps.",
    icon: Layers3,
  },
] as const;

export function SkillsSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const skillsByCategory = snapshot.skills.reduce<
    Record<string, typeof snapshot.skills>
  >((accumulator, skill) => {
    accumulator[skill.category] ??= [];
    accumulator[skill.category].push(skill);
    return accumulator;
  }, {});

  const groupedSkills = skillGroups.map((group) => ({
    ...group,
    skills: skillsByCategory[group.category] ?? [],
  })).filter((group) => group.skills.length > 0);

  return (
    <section id="skills" className="dashboard-band py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Skills"
            title="A practical stack grouped by delivery need"
            description="The stack stays organized around the work clients usually need: frontend, backend, mobile, data, delivery, and UI/UX cleanup."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groupedSkills.map((group, index) => (
            <SectionReveal key={group.category} delay={0.03 * index}>
              <Card className="hover:border-primary/45 h-full shadow-none transition duration-300 hover:-translate-y-1">
                <CardContent className="space-y-5 p-5">
                  <div className="flex items-start gap-4">
                    <div className="border-primary/20 bg-primary/10 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border">
                      <group.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-base font-semibold">
                        {group.category}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-6">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
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
