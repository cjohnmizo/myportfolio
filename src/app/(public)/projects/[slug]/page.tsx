import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/portfolio/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjectBySlug } from "@/lib/portfolio/repository";

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
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="py-20 sm:py-24">
      <PageShell>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Badge>{project.category}</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {project.demoUrl ? (
                <Button asChild>
                  <Link href={project.demoUrl} target="_blank">
                    Live demo
                  </Link>
                </Button>
              ) : null}
              {project.githubUrl ? (
                <Button asChild variant="outline">
                  <Link href={project.githubUrl} target="_blank">
                    GitHub
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          <Card>
            <CardContent className="space-y-5 p-6">
              <div>
                <p className="section-kicker text-xs text-primary">Project story</p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  Case study sections are ready
                </h2>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">{project.challenge}</p>
              <p className="text-sm leading-7 text-muted-foreground">{project.solution}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageShell>
    </main>
  );
}
