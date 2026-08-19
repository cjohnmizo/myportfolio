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
    el.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 14}deg) translateZ(28px)`;
  }

  function onLeave() {
    if (slab.current) {
      slab.current.style.transform = "rotateY(-16deg) rotateX(8deg) translateZ(0)";
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
          style={{ transform: "rotateY(-16deg) rotateX(8deg)" }}
        >
          <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-card">
            <img
              src={project.coverImage}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-background/78 p-5 opacity-0 transition-opacity duration-250 group-hover:opacity-100 group-focus-visible:opacity-100">
              <p className="max-w-sm text-sm leading-relaxed text-foreground">
                {project.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium tracking-wide uppercase">
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
          <span className="rounded-full bg-card px-2 py-0.5">{project.status}</span>
        </div>
        <h3 className="font-heading mt-1.5 text-xl font-medium tracking-tight sm:text-2xl">
          {project.title}
        </h3>
      </Link>
    </article>
  );
}
