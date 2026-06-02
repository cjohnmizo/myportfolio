import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/portfolio";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden shadow-none transition-colors hover:border-slate-400">
      <div className="border-border bg-muted relative aspect-[16/10] overflow-hidden border-b">
        <Image
          src={project.coverImage}
          alt={`${project.title} project preview`}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{project.status}</Badge>
          <Badge variant="muted">{project.category}</Badge>
          <Badge variant="muted">{project.year}</Badge>
        </div>

        <div className="space-y-3">
          <h3 className="text-foreground text-xl leading-snug font-semibold">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-7">
            {project.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((item) => (
            <Badge key={item} variant="muted">
              {item}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Button asChild size="sm">
            <Link href={`/projects/${project.slug}`}>
              Details <ArrowRight className="ml-2 h-4 w-4" />
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
