import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CircleCheckBig,
  Compass,
  Github,
  Layers3,
  UserRound,
} from "lucide-react";

import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getProjectFeatures,
  getProjectPreviewAlt,
  getProjectRole,
  getProjectStatusLabel,
  getSupportingProjectMetrics,
} from "@/lib/portfolio/project-presentation";
import type { Project } from "@/types/portfolio";

function uniqueGalleryImages(project: Project) {
  return Array.from(
    new Set([project.coverImage, ...project.galleryImages].filter(Boolean)),
  );
}

const storySectionMeta = {
  challenge: {
    title: "Problem",
    icon: Compass,
  },
  solution: {
    title: "Solution",
    icon: Layers3,
  },
  impact: {
    title: "Result",
    icon: CircleCheckBig,
  },
} as const;

export function ProjectCaseStudy({
  project,
  relatedProjects,
}: {
  project: Project;
  relatedProjects: Project[];
}) {
  const galleryImages = uniqueGalleryImages(project);
  const statusLabel = getProjectStatusLabel(project.status);
  const features = getProjectFeatures(project);
  const supportingMetrics = getSupportingProjectMetrics(project);
  const projectFacts = [
    { label: "Type", value: project.category },
    { label: "Role", value: getProjectRole(project) },
    { label: "Status", value: statusLabel },
    { label: "Year", value: project.year },
  ];
  const storySections = [
    { key: "challenge", value: project.challenge },
    { key: "solution", value: project.solution },
    { key: "impact", value: project.impact },
  ] as const;

  return (
    <main className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <Link
            href="/projects"
            className="text-secondary inline-flex items-center text-sm font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects
          </Link>
        </SectionReveal>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_360px]">
          <div className="space-y-8">
            <SectionReveal className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge>{statusLabel}</Badge>
                <Badge variant="muted">{project.category}</Badge>
                <Badge variant="muted">{project.year}</Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-foreground max-w-5xl text-4xl leading-tight font-semibold sm:text-5xl">
                  {project.title}
                </h1>
                <p className="text-muted-foreground max-w-3xl text-lg leading-8">
                  {project.excerpt}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <Button asChild>
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      View project <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button asChild variant="outline">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      GitHub <Github className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="border-border bg-muted relative overflow-hidden rounded-lg border">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={project.coverImage}
                    alt={getProjectPreviewAlt(project)}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>
              </div>
            </SectionReveal>

            <SectionReveal>
              <Card className="shadow-none">
                <CardContent className="space-y-4 p-6">
                  <p className="section-kicker text-secondary text-xs font-semibold">
                    Overview
                  </p>
                  <h2 className="text-foreground text-2xl font-semibold">
                    What this case file covers
                  </h2>
                  <p className="text-muted-foreground text-sm leading-8">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>

            {features.length > 0 ? (
              <SectionReveal>
                <Card className="border-primary/20 shadow-none">
                  <CardContent className="space-y-5 p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary rounded-lg p-3">
                        <UserRound className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="section-kicker text-secondary text-xs font-semibold">
                          Role and features
                        </p>
                        <h2 className="text-foreground mt-2 text-2xl font-semibold">
                          What I handled in this build
                        </h2>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-8">
                      {getProjectRole(project)}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {features.map((feature) => (
                        <div
                          key={feature}
                          className="border-border bg-background/35 flex gap-3 rounded-2xl border p-4"
                        >
                          <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                          <p className="text-muted-foreground text-sm leading-6">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            ) : null}

            <div className="grid gap-5 lg:grid-cols-3">
              {storySections.map((item) => {
                const meta = storySectionMeta[item.key];
                const Icon = meta.icon;

                return (
                  <SectionReveal key={item.key}>
                    <Card className="h-full shadow-none">
                      <CardContent className="space-y-4 p-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted text-secondary rounded-lg p-3">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h2 className="text-foreground text-xl font-semibold">
                            {meta.title}
                          </h2>
                        </div>
                        <p className="text-muted-foreground text-sm leading-8">
                          {item.value}
                        </p>
                      </CardContent>
                    </Card>
                  </SectionReveal>
                );
              })}
            </div>

            {galleryImages.length > 1 ? (
              <section className="space-y-5">
                <SectionReveal>
                  <div>
                    <p className="section-kicker text-secondary text-xs font-semibold">
                      Visuals
                    </p>
                    <h2 className="text-foreground mt-2 text-2xl font-semibold">
                      Screens and project assets
                    </h2>
                  </div>
                </SectionReveal>
                <div className="grid gap-5 md:grid-cols-2">
                  {galleryImages.map((image, index) => (
                    <SectionReveal key={`${image}-${index}`}>
                      <div className="border-border bg-muted relative aspect-[16/10] overflow-hidden rounded-lg border">
                        <Image
                          src={image}
                          alt={getProjectPreviewAlt(
                            project,
                            `visual ${index + 1}`,
                          )}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </SectionReveal>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <SectionReveal className="xl:sticky xl:top-24 xl:h-fit">
            <div className="space-y-5">
              <Card className="shadow-none">
                <CardContent className="p-0">
                  <div className="border-border border-b p-5">
                    <p className="section-kicker text-secondary text-xs font-semibold">
                      Project details
                    </p>
                    <h2 className="text-foreground mt-2 text-xl font-semibold">
                      At a glance
                    </h2>
                  </div>
                  <div className="divide-border divide-y">
                    {projectFacts.map((item) => (
                      <div key={item.label} className="grid gap-2 px-5 py-4">
                        <p className="text-muted-foreground text-sm">
                          {item.label}
                        </p>
                        <p className="text-foreground text-sm leading-6 font-medium">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none">
                <CardContent className="space-y-4 p-5">
                  <p className="section-kicker text-secondary text-xs font-semibold">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((item) => (
                      <Badge key={item} variant="muted">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {supportingMetrics.length > 0 ? (
                <Card className="shadow-none">
                  <CardContent className="space-y-3 p-5">
                    {supportingMetrics.map((metric, index) => (
                      <div
                        key={`${metric.label}-${index}`}
                        className="border-border bg-muted rounded-lg border p-4"
                      >
                        <p className="text-muted-foreground text-sm">
                          {metric.label}
                        </p>
                        <p className="text-foreground mt-2 text-base font-semibold">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </SectionReveal>
        </div>

        {relatedProjects.length > 0 ? (
          <section className="mt-14">
            <SectionReveal>
              <div>
                <p className="section-kicker text-secondary text-xs font-semibold">
                  More work
                </p>
                <h2 className="text-foreground mt-2 text-2xl font-semibold">
                  Related projects
                </h2>
              </div>
            </SectionReveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {relatedProjects.map((item) => (
                <SectionReveal key={item.id}>
                  <ProjectCard project={item} />
                </SectionReveal>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
