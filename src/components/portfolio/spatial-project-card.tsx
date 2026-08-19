"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/portfolio";

export function SpatialProjectCard({ project }: { project: Project }) {
  const slab = useRef<HTMLDivElement>(null);

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = slab.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 26}deg) rotateX(${-y * 16}deg) translateZ(36px)`;
  }

  function onLeave() {
    if (slab.current) {
      slab.current.style.transform =
        "rotateY(-14deg) rotateX(7deg) translateZ(0)";
    }
  }

  return (
    <article className="tilt-stage">
      <Link href={`/projects/${project.slug}`} className="block text-left">
        <div
          ref={slab}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="slab group relative"
          style={{ transform: "rotateY(-14deg) rotateX(7deg)" }}
        >
          <div className="project-image-frame relative aspect-4/3 overflow-hidden rounded-xl bg-card">
            <img
              src={project.coverImage}
              alt=""
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
            />
            <div className="project-image-sheen" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/70 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <p className="max-w-sm text-sm leading-relaxed text-foreground">
                {project.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium tracking-wide uppercase text-secondary">
                Read the case
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </div>
          <div className="card-edge-y" aria-hidden="true" />
          <div className="card-edge-x" aria-hidden="true" />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-wide text-muted-foreground uppercase">
          <span>{project.category.replace("-", " ")}</span>
          <span aria-hidden="true">/</span>
          <span className="tabular-nums">{project.year}</span>
          <span className="rounded-full border border-border bg-card/80 px-2 py-0.5">
            {project.status}
          </span>
        </div>
        <h3 className="font-heading mt-1.5 text-xl font-medium tracking-tight sm:text-2xl">
          {project.title}
        </h3>
      </Link>
    </article>
  );
}
