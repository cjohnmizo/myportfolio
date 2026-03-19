import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarRange,
  CircleCheckBig,
  Compass,
  Layers3,
  Sparkles,
} from "lucide-react";

import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/portfolio";

function uniqueGalleryImages(project: Project) {
  return Array.from(new Set([project.coverImage, ...project.galleryImages].filter(Boolean)));
}

function hasPublicBriefLink(value?: string | null) {
  if (!value) {
    return false;
  }

  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return !hostname.includes("github.com");
  } catch {
    return false;
  }
}

const storySectionMeta = {
  challenge: {
    eyebrow: "Problem space",
    title: "The challenge",
    icon: Compass,
  },
  solution: {
    eyebrow: "Approach",
    title: "The solution",
    icon: Layers3,
  },
  impact: {
    eyebrow: "Outcome",
    title: "The impact",
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
  const showPublicBriefLink = hasPublicBriefLink(project.caseStudyUrl);
  const projectFacts = [
    { label: "Project type", value: project.category },
    { label: "Status", value: project.status },
    { label: "Delivery year", value: project.year },
    { label: "Tech stack", value: `${project.techStack.length} tools` },
  ];
  const storySections = [
    { key: "challenge", value: project.challenge },
    { key: "solution", value: project.solution },
    { key: "impact", value: project.impact },
  ] as const;

  return (
    <main className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-semibold text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to archive
          </Link>
        </SectionReveal>

        <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_360px]">
          <div className="space-y-10">
            <SectionReveal className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge>Case study</Badge>
                <Badge variant="secondary">{project.category}</Badge>
                <Badge variant="muted">{project.status}</Badge>
                <Badge variant="muted">{project.year}</Badge>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-5xl font-mono text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                  {project.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                  {project.excerpt}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <Button asChild>
                    <Link href={project.demoUrl} target="_blank">
                      Live demo <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                {showPublicBriefLink && project.caseStudyUrl ? (
                  <Button asChild variant="outline">
                    <Link href={project.caseStudyUrl} target="_blank">
                      Extended brief <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.04}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid gap-px bg-white/10 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-4 bg-white/5 p-6">
                      <p className="section-kicker text-xs text-primary">Overview</p>
                      <h2 className="text-2xl font-semibold text-foreground">
                        What this case study covers
                      </h2>
                      <p className="text-sm leading-8 text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="grid gap-px bg-white/10 sm:grid-cols-2 md:grid-cols-1">
                      {project.metrics.length > 0 ? (
                        project.metrics.map((metric) => (
                          <div key={metric.label} className="bg-white/5 p-6">
                            <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                            <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
                          </div>
                        ))
                      ) : (
                        <div className="bg-white/5 p-6">
                          <p className="text-sm font-medium text-foreground">Outcome snapshot</p>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            Add delivery metrics in the CMS to surface measurable signals here.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {storySections.map((item, index) => {
                const meta = storySectionMeta[item.key];
                const Icon = meta.icon;

                return (
                  <SectionReveal key={item.key} delay={0.1 + index * 0.04}>
                    <Card className="h-full">
                      <CardContent className="space-y-4 p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="section-kicker text-xs text-primary">{meta.eyebrow}</p>
                            <h2 className="mt-3 text-2xl font-semibold text-foreground">
                              {meta.title}
                            </h2>
                          </div>
                          <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                        <p className="text-sm leading-8 text-muted-foreground">{item.value}</p>
                      </CardContent>
                    </Card>
                  </SectionReveal>
                );
              })}
            </div>

            {galleryImages.length > 1 ? (
              <section className="space-y-6">
                <SectionReveal>
                  <div className="flex flex-col gap-3">
                    <p className="section-kicker text-xs text-primary">Visual walkthrough</p>
                    <h2 className="text-3xl font-semibold text-foreground">
                      Screens and surfaces from the build
                    </h2>
                  </div>
                </SectionReveal>
                <div className="grid gap-5 md:grid-cols-2">
                  {galleryImages.map((image, index) => (
                    <SectionReveal key={`${image}-${index}`} delay={0.04 * index}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
                        <Image
                          src={image}
                          alt={`${project.title} gallery ${index + 1}`}
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

            <SectionReveal>
              <Card>
                <CardContent className="grid gap-6 p-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-4">
                    <p className="section-kicker text-xs text-primary">Delivery stack</p>
                    <h2 className="text-2xl font-semibold text-foreground">
                      Tools that shaped execution
                    </h2>
                    <p className="text-sm leading-8 text-muted-foreground">
                      The delivery choices were made to support maintainability, clear operator
                      workflows, and a polished user-facing result, not just feature completeness.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.06} className="xl:sticky xl:top-24 xl:h-fit">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="border-b border-white/10 bg-white/5 p-6">
                    <p className="section-kicker text-xs text-primary">Project snapshot</p>
                    <h2 className="mt-3 text-2xl font-semibold text-foreground">
                      Key facts at a glance
                    </h2>
                  </div>
                  <div className="divide-y divide-white/10">
                    {projectFacts.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-6 px-6 py-5"
                      >
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-right text-sm font-medium capitalize text-foreground">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl border border-secondary/20 bg-secondary/10 p-3 text-secondary">
                      <CalendarRange className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <p className="section-kicker text-xs text-secondary">Delivery signal</p>
                      <h2 className="text-xl font-semibold text-foreground">
                        Why this project stands out
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm leading-8 text-muted-foreground">{project.impact}</p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium text-foreground">
                        Featured metrics and public delivery notes are optimized for recruiter scan
                        speed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SectionReveal>
        </div>

        {relatedProjects.length > 0 ? (
          <section className="mt-16">
            <SectionReveal>
              <div className="flex flex-col gap-3">
                <p className="section-kicker text-xs text-primary">More work</p>
                <h2 className="text-3xl font-semibold text-foreground">Related case studies</h2>
              </div>
            </SectionReveal>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {relatedProjects.map((item, index) => (
                <SectionReveal key={item.id} delay={0.05 * index}>
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
