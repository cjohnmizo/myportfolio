import {
  DatabaseZap,
  GraduationCap,
  Globe2,
  PenTool,
  ServerCog,
  Smartphone,
  Workflow,
} from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, responsive websites for schools, local businesses, NGOs, farms, and personal brands.",
    icon: Globe2,
  },
  {
    title: "Android App Development",
    description:
      "Practical Android and Flutter interfaces for student tools, community apps, and field use.",
    icon: Smartphone,
  },
  {
    title: "LMS / Coaching Platforms",
    description:
      "Class flows, lesson access, student dashboards, staff controls, and learning content structure.",
    icon: GraduationCap,
  },
  {
    title: "Firebase App Development",
    description:
      "Firebase and Firestore-backed apps for authentication, data, updates, and lightweight products.",
    icon: DatabaseZap,
  },
  {
    title: "Laravel System Development",
    description:
      "Maintainable Laravel systems for content, records, roles, publishing, and internal workflows.",
    icon: ServerCog,
  },
  {
    title: "UI/UX Redesign and Optimization",
    description:
      "Cleaner layouts, improved spacing, better mobile screens, and simpler user paths for existing products.",
    icon: PenTool,
  },
];

function ServiceMiniVisual({ item }: { item: (typeof services)[number] }) {
  return (
    <div className="system-visual border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground relative flex h-16 w-16 items-center justify-center rounded-2xl border transition duration-300 group-hover:scale-105">
      <div className="border-secondary/25 bg-secondary/20 absolute right-2 bottom-2 h-5 w-8 rounded-lg border" />
      <div className="absolute top-2 left-2 h-2 w-6 rounded-full bg-current opacity-40" />
      <item.icon className="relative z-10 h-6 w-6" />
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="dashboard-band relative py-20 sm:py-24">
      <div className="via-primary/40 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Services"
            title="Practical digital products without unnecessary complexity"
            description="Focused support for small teams that need clean websites, Android apps, LMS platforms, Firebase tools, Laravel systems, or a better UI for something already built."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item, index) => (
            <SectionReveal key={item.title} delay={0.03 * index}>
              <Card className="light-sweep group hover:border-primary/45 h-full transition duration-300 hover:-translate-y-1">
                <CardContent className="space-y-5 p-5">
                  <ServiceMiniVisual item={item} />
                  <div>
                    <h3 className="text-foreground text-lg leading-snug font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-7">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-primary inline-flex items-center gap-2 text-xs font-semibold">
                    <Workflow className="h-3.5 w-3.5" />
                    <span>Plan, build, refine, deploy</span>
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
