import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/portfolio";

function getStatusLabel(status: string) {
  if (status.toLowerCase() === "private") {
    return "Private client project - details available on request.";
  }

  return status;
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Card className="light-sweep group border-primary/10 hover:border-primary/45 flex h-full flex-col overflow-hidden shadow-none transition duration-300 hover:-translate-y-1">
      <div className="border-border bg-muted relative overflow-hidden border-b">
        <div className="mizo-pattern absolute inset-0 opacity-10" />
        <div className="relative aspect-[16/9]">
          <Image
            src={project.coverImage}
            alt={`${project.title} project preview`}
            fill
            priority={priority}
            className="object-cover opacity-90 mix-blend-luminosity transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{project.category}</Badge>
          <Badge variant="muted">{project.year}</Badge>
        </div>

        <div className="space-y-3">
          <p className="text-primary text-xs font-semibold uppercase">
            Digital case file
          </p>
          <h3 className="text-foreground text-xl leading-snug font-semibold">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-7">
            {project.excerpt}
          </p>
        </div>

        <div className="grid gap-3">
          <div className="border-border bg-background/35 rounded-2xl border p-4">
            <p className="text-secondary text-xs font-semibold uppercase">
              Problem
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {project.challenge}
            </p>
          </div>
          <div className="border-border bg-background/35 rounded-2xl border p-4">
            <p className="text-primary text-xs font-semibold uppercase">
              Solution
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="border-secondary/20 bg-secondary/10 text-secondary rounded-2xl border p-4 text-sm leading-6">
          {getStatusLabel(project.status)}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((item) => (
            <Badge key={item} variant="muted">
              {item}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Button asChild size="sm">
            <Link href={`/projects/${project.slug}`}>
              Open case file <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {project.demoUrl ? (
            <Button asChild size="sm" variant="outline">
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                View <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button asChild size="sm" variant="outline">
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
      </CardContent>
    </Card>
  );
}
