import {
  Building2,
  ChartNoAxesCombined,
  DatabaseZap,
  GraduationCap,
  Handshake,
  Newspaper,
  Smartphone,
} from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Card, CardContent } from "@/components/ui/card";

const systems = [
  {
    title: "School and institution websites",
    description:
      "Clean public websites for notices, admissions, departments, staff information, and contact workflows.",
    icon: GraduationCap,
  },
  {
    title: "Coaching LMS platforms",
    description:
      "Course structures, class materials, student access, and simple admin tools for coaching centres.",
    icon: Building2,
  },
  {
    title: "Admin dashboards",
    description:
      "Operational panels for records, reports, content, users, and routine management tasks.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "NGO and community systems",
    description:
      "Digital tools for announcements, directories, local updates, and community information access.",
    icon: Handshake,
  },
  {
    title: "Mobile apps",
    description:
      "Flutter and Android app interfaces built around practical field use and responsive data flows.",
    icon: Smartphone,
  },
  {
    title: "Business and farm websites",
    description:
      "Trustworthy sites for products, services, updates, enquiries, and local business visibility.",
    icon: DatabaseZap,
  },
  {
    title: "CMS and content tools",
    description:
      "Publishing workflows, media handling, role permissions, SEO controls, and structured content.",
    icon: Newspaper,
  },
];

function SystemMiniVisual({ item }: { item: (typeof systems)[number] }) {
  return (
    <div className="system-visual border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground relative flex h-16 w-16 items-center justify-center rounded-2xl border transition duration-300 group-hover:scale-105">
      <div className="border-secondary/25 bg-secondary/20 absolute right-2 bottom-2 h-5 w-8 rounded-lg border" />
      <div className="absolute top-2 left-2 h-2 w-6 rounded-full bg-current opacity-40" />
      <item.icon className="relative z-10 h-6 w-6" />
    </div>
  );
}

export function SystemsSection() {
  return (
    <section id="systems" className="relative py-16 sm:py-24">
      <div className="via-primary/40 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="Systems I build"
            title="Practical digital systems with a memorable visual identity"
            description="The work is broad, but the standard is consistent: clear user paths, maintainable structure, responsive interfaces, and useful software after launch."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {systems.map((item, index) => (
            <SectionReveal key={item.title} delay={0.03 * index}>
              <Card className="light-sweep group hover:border-primary/45 h-full transition duration-300 hover:-translate-y-1">
                <CardContent className="space-y-5 p-5">
                  <SystemMiniVisual item={item} />
                  <div>
                    <h3 className="text-foreground text-base leading-snug font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-7">
                      {item.description}
                    </p>
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
