import {
  Accessibility,
  Gauge,
  LayoutDashboard,
  MapPinned,
  School,
  Smartphone,
  Wrench,
} from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const trustBadges = [
  { label: "Mizoram-based developer", icon: MapPinned },
  { label: "School and NGO systems", icon: School },
  { label: "LMS platforms", icon: Wrench },
  { label: "Operations dashboards", icon: LayoutDashboard },
  { label: "Mobile app development", icon: Smartphone },
];

const practicalPoints = [
  {
    title: "Clear daily workflows",
    description:
      "Forms, tables, actions, and permissions are arranged for daily use, not just for screenshots.",
  },
  {
    title: "Responsive layouts",
    description:
      "Pages are shaped for small phones, tablets, laptops, and desktop screens without cramped controls.",
  },
  {
    title: "Maintainable code",
    description:
      "Reusable components, typed data, and simple structure keep future updates easier to handle.",
  },
  {
    title: "Human usability",
    description:
      "The focus stays on useful paths for students, staff, administrators, customers, and local users.",
  },
  {
    title: "Fast and accessible interfaces",
    description:
      "Performance, focus states, readable contrast, and reduced-motion support are treated as part of the build.",
  },
];

export function TrustSection() {
  return (
    <section
      data-dashboard-label="Trust matrix"
      className="dashboard-band py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Built for practical use"
                title="Premium visuals still need honest systems"
                description="Every project is presented clearly: private work stays private, live demos are linked when available, and the design keeps attention on what the system actually does."
              />
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((item) => (
                  <Badge key={item.label} variant="muted">
                    <item.icon className="mr-2 h-3.5 w-3.5" />
                    {item.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {practicalPoints.map((point, index) => (
                <SectionReveal key={point.title} delay={0.04 * index}>
                  <Card className="light-sweep hover:border-primary/40 h-full shadow-none transition duration-300 hover:-translate-y-1">
                    <CardContent className="space-y-4 p-5">
                      <div className="border-primary/20 bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl border">
                        <Gauge className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-foreground text-base font-semibold">
                          {point.title}
                        </h3>
                        <p className="text-muted-foreground mt-3 text-sm leading-7">
                          {point.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </SectionReveal>
              ))}
              <SectionReveal delay={0.24}>
                <Card className="border-secondary/25 h-full shadow-none">
                  <CardContent className="space-y-4 p-5">
                    <div className="border-secondary/25 bg-secondary/10 text-secondary flex h-11 w-11 items-center justify-center rounded-2xl border">
                      <Accessibility className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-base font-semibold">
                        Client-ready presentation
                      </h3>
                      <p className="text-muted-foreground mt-3 text-sm leading-7">
                        Project cards include problem, solution, role, stack,
                        status, and a clear path to more details.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
