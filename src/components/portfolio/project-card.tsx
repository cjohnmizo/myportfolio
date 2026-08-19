import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getProjectPreviewAlt,
  getProjectStatusLabel,
} from "@/lib/portfolio/project-presentation";
import type { Project } from "@/types/portfolio";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
  variant?: "compact" | "detailed";
}) {
  const statusLabel = getProjectStatusLabel(project.status);

  return (
    <Card className="group flex h-full flex-col overflow-hidden shadow-none transition hover:-translate-y-1">
      <div className="bg-muted relative aspect-[16/9] overflow-hidden border-b border-border">
        <Image
          src={project.coverImage}
          alt={getProjectPreviewAlt(project)}
          fill
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{statusLabel}</Badge>
          <Badge variant="muted">{project.category}</Badge>
          <Badge variant="muted">{project.year}</Badge>
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6">{project.excerpt}</p>
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
              <Link href={project.demoUrl} target="_blank" rel="noreferrer noopener">
                View <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button asChild size="sm" variant="outline">
              <Link href={project.githubUrl} target="_blank" rel="noreferrer noopener">
                GitHub <Github className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
