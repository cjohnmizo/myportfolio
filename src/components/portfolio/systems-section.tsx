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
    title: "School command pages",
    description:
      "Public pages for notices, admissions, departments, staff information, and contact paths.",
    icon: GraduationCap,
  },
  {
    title: "Coaching LMS spaces",
    description:
      "Course lanes, class materials, student access, and staff workflows for coaching centres.",
    icon: Building2,
  },
  {
    title: "Operations dashboards",
    description:
      "Scan-friendly panels for records, reports, content, users, and routine management tasks.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Community information hubs",
    description:
      "Digital tools for announcements, directories, local updates, and community information access.",
    icon: Handshake,
  },
  {
    title: "Mobile product views",
    description:
      "Flutter and Android app interfaces built around practical field use and responsive data flows.",
    icon: Smartphone,
  },
  {
    title: "Business and farm sites",
    description:
      "Trustworthy sites for products, services, updates, enquiries, and local business visibility.",
    icon: DatabaseZap,
  },
  {
    title: "Publishing workspaces",
    description:
      "Publishing workflows, media handling, permissions, SEO controls, and structured content.",
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
            title="Useful systems presented with cinematic clarity"
            description="The work is broad, but the standard is consistent: strong hierarchy, responsive screens, useful actions, and a polished dashboard mood that still stays practical."
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
