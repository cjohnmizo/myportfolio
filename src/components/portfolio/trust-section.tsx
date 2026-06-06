import {
  CheckCircle2,
  ClipboardList,
  Code2,
  Compass,
  Rocket,
  SearchCheck,
} from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const processSteps = [
  {
    title: "Understand",
    description:
      "Clarify the goal, users, content, budget, timeline, and what the first useful version should do.",
    icon: SearchCheck,
  },
  {
    title: "Design",
    description:
      "Shape the structure, key screens, navigation, and visual direction before adding unnecessary detail.",
    icon: Compass,
  },
  {
    title: "Build",
    description:
      "Implement responsive pages, app flows, data handling, and reusable components with maintainable code.",
    icon: Code2,
  },
  {
    title: "Test",
    description:
      "Check layout, links, forms, mobile spacing, content, performance, and the core user paths.",
    icon: ClipboardList,
  },
  {
    title: "Deliver",
    description:
      "Deploy, hand over the working version, and keep the next improvement path clear.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="dashboard-band py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Process"
              title="A simple working process from rough idea to launch"
              description="The approach stays practical: understand the real need, design the usable path, build carefully, test the details, and deliver something maintainable."
            />
            <div className="flex flex-wrap gap-2">
              <Badge variant="muted">Mobile-first</Badge>
              <Badge variant="muted">Clear handoff</Badge>
              <Badge variant="muted">Verified links</Badge>
              <Badge variant="muted">Maintainable code</Badge>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <SectionReveal key={step.title} delay={0.04 * index}>
              <Card className="light-sweep hover:border-primary/40 h-full shadow-none transition duration-300 hover:-translate-y-1">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="border-primary/20 bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl border">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-muted-foreground text-sm font-semibold">
                      0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-foreground text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-7">
                      {step.description}
                    </p>
                  </div>
                  <CheckCircle2 className="text-secondary mt-auto h-4 w-4" />
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
