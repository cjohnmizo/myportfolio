import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getProjectFeatures,
  getProjectPreviewAlt,
  getProjectRole,
  getProjectStatusLabel,
} from "@/lib/portfolio/project-presentation";
import type { Project } from "@/types/portfolio";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const features = getProjectFeatures(project).slice(0, 3);
  const statusLabel = getProjectStatusLabel(project.status);

  return (
    <Card className="light-sweep group border-primary/10 hover:border-primary/45 flex h-full flex-col overflow-hidden shadow-none transition duration-300 hover:-translate-y-1">
      <div className="border-border bg-muted project-preview-frame relative overflow-hidden border-b p-3">
        <div className="mizo-pattern absolute inset-0 opacity-10" />
        <div className="project-preview-surface bg-card relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/70">
          <Image
            src={project.coverImage}
            alt={getProjectPreviewAlt(project)}
            fill
            priority={priority}
            className="object-cover opacity-95 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2">
            <span className="border-primary/25 bg-background/80 text-primary rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur">
              Scene preview
            </span>
            <span className="border-border bg-background/80 text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium backdrop-blur">
              {project.category}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.14),transparent_34%,rgba(122,167,255,0.08)_72%,transparent)]" />
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{project.category}</Badge>
          <Badge variant="muted">{project.year}</Badge>
        </div>

        <div className="space-y-3">
          <p className="text-primary text-xs font-semibold uppercase">
            Project case file
          </p>
          <h3 className="text-foreground text-xl leading-snug font-semibold">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-7">
            {project.excerpt}
          </p>
        </div>

        <div className="border-border bg-background/35 flex items-start gap-3 rounded-2xl border p-4">
          <div className="border-secondary/25 bg-secondary/10 text-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
            <UserRound className="h-4 w-4" />
          </div>
          <div>
            <p className="text-secondary text-xs font-semibold uppercase">
              My role
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {getProjectRole(project)}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="border-border bg-background/35 rounded-2xl border p-4">
            <p className="text-secondary text-xs font-semibold uppercase">
              Brief
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {project.challenge}
            </p>
          </div>
          <div className="border-border bg-background/35 rounded-2xl border p-4">
            <p className="text-primary text-xs font-semibold uppercase">
              Build direction
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {project.solution}
            </p>
          </div>
        </div>

        {features.length > 0 ? (
          <div className="border-primary/15 bg-primary/10 rounded-2xl border p-4">
            <p className="text-primary text-xs font-semibold uppercase">
              Key features
            </p>
            <ul className="mt-3 space-y-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="text-muted-foreground flex gap-2 text-sm leading-6"
                >
                  <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="border-secondary/20 bg-secondary/10 text-secondary flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{statusLabel}</span>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((item) => (
              <Badge key={item} variant="muted">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Button asChild size="sm">
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`Open ${project.title} case file`}
            >
              Open case file <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {project.demoUrl ? (
            <Button asChild size="sm" variant="outline">
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`View ${project.title}`}
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
                aria-label={`Open ${project.title} GitHub repository`}
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
