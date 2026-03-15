import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { StructuredData } from "@/components/portfolio/structured-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioSnapshot, getProjectBySlug } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const snapshot = await getPortfolioSnapshot();

  return snapshot.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [project.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, snapshot] = await Promise.all([
    getProjectBySlug(slug),
    getPortfolioSnapshot(),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = snapshot.projects
    .filter((item) => item.id !== project.id)
    .slice(0, 2);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.excerpt,
          url: `${siteConfig.url}/projects/${project.slug}`,
          image: project.coverImage,
          creator: {
            "@type": "Person",
            name: snapshot.profile.fullName,
          },
          keywords: project.techStack,
        }}
      />
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

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionReveal className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge>{project.category}</Badge>
              <Badge variant="secondary">{project.status}</Badge>
              <Badge variant="muted">{project.year}</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{project.excerpt}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.demoUrl ? (
                <Button asChild>
                  <Link href={project.demoUrl} target="_blank">
                    Live demo <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              {project.githubUrl ? (
                <Button asChild variant="outline">
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> Source
                  </Link>
                </Button>
              ) : null}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.05}>
            <Card className="h-fit">
              <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            { label: "Challenge", value: project.challenge },
            { label: "Solution", value: project.solution },
            { label: "Impact", value: project.impact },
          ].map((item, index) => (
            <SectionReveal key={item.label} delay={0.04 * index}>
              <Card className="h-full">
                <CardContent className="space-y-3 p-6">
                  <p className="section-kicker text-xs text-primary">{item.label}</p>
                  <p className="text-sm leading-7 text-muted-foreground">{item.value}</p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-10">
          <Card>
            <CardContent className="space-y-5 p-6">
              <div>
                <p className="section-kicker text-xs text-primary">Tech stack</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">
                  Technologies used in delivery
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
              <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
        </SectionReveal>

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
    </>
  );
}
