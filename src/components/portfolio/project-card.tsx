import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TiltCard } from "@/components/portfolio/tilt-card";
import { Badge } from "@/components/ui/badge";
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
    <TiltCard className="h-full">
      <Card className="group h-full overflow-hidden transition duration-300 hover:border-primary/40">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            {project.isFeatured ? <Badge>Featured</Badge> : null}
            <Badge variant="muted">{project.year}</Badge>
          </div>
        </div>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold text-foreground">{project.title}</h3>
              <Badge variant="secondary">{project.category}</Badge>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">{project.excerpt}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <Badge key={item} variant="muted">
                {item}
              </Badge>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-lg font-semibold text-foreground">{metric.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center text-sm font-semibold text-primary"
            >
              View case study <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </TiltCard>
  );
}
