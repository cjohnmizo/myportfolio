import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function FeaturedProjectsSection({
  snapshot,
}: {
  snapshot: PortfolioSnapshot;
}) {
  return (
    <section id="projects" className="dashboard-band relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Featured projects"
              title="Selected work with real project context"
              description="A quick look at practical web, Android, LMS, dashboard, and portfolio work. Live links appear only where a real URL exists."
            />
            <Link
              href="/projects"
              className="text-primary inline-flex items-center text-sm font-semibold transition hover:text-[#0a1931]"
            >
              View all projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </SectionReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {snapshot.featuredProjects.map((project, index) => (
            <SectionReveal key={project.id} delay={0.05 * index}>
              <ProjectCard
                project={project}
                priority={index === 0}
                variant="compact"
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
