"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";

import { HeroThreeScene } from "@/components/portfolio/hero-three-scene";
import { ContactSection } from "@/components/portfolio/contact-section";
import { SpatialProjectCard } from "@/components/portfolio/spatial-project-card";
import { Button } from "@/components/ui/button";
import type { PortfolioSnapshot, ProjectCategory } from "@/types/portfolio";

const filters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web-app", label: "Web" },
  { id: "platform", label: "LMS" },
  { id: "mobile-app", label: "App" },
  { id: "dashboard", label: "Dashboard" },
  { id: "cms", label: "CMS" },
];

export function SpatialHome({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const projects = useMemo(
    () =>
      snapshot.projects.filter(
        (project) => project.isPublished && (filter === "all" || project.category === filter),
      ),
    [filter, snapshot.projects],
  );
  const skillGroups = useMemo(() => {
    const groups = new Map<string, string[]>();
    snapshot.skills
      .filter((skill) => skill.isPublished)
      .forEach((skill) => {
        const list = groups.get(skill.category) ?? [];
        list.push(skill.name);
        groups.set(skill.category, list);
      });
    return Array.from(groups.entries());
  }, [snapshot.skills]);

  return (
    <main>
      <section className="relative min-h-svh overflow-hidden">
        <div className="mx-auto grid min-h-svh max-w-6xl grid-cols-1 lg:grid-cols-12">
          <div className="relative z-10 flex flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:col-span-5 lg:pb-20">
            <p className="mb-6 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {snapshot.profile.location} · Spatial studio
            </p>
            <h1 className="font-heading text-5xl leading-none tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block font-medium">C. John</span>
              <span className="mt-1 block font-normal italic">Remthang</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-snug text-foreground/90">
              {snapshot.settings.heroSubtitle}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {snapshot.profile.headline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#work">
                  Enter the work
                  <ArrowDownRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact">
                  Start a project
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="relative h-[58vh] min-h-80 lg:col-span-7 lg:h-auto lg:min-h-svh">
            <HeroThreeScene />
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Selected work</p>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl">Objects in the field</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full border px-3 py-1 text-xs tracking-wide uppercase transition ${
                  filter === item.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {projects.map((project) => (
              <SpatialProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="tilt-stage">
              <div
                className="slab overflow-hidden rounded-xl"
                style={{ transform: "rotateY(-12deg) rotateX(6deg)" }}
              >
                <img
                  src={snapshot.profile.avatarUrl}
                  alt={snapshot.profile.fullName}
                  className="aspect-4/5 w-full object-cover"
                />
                <div className="card-edge-y" aria-hidden="true" />
                <div className="card-edge-x" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">About</p>
            <h2 className="font-heading mt-3 text-3xl sm:text-4xl">{snapshot.settings.aboutTitle}</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90">
              {snapshot.profile.longBio}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {snapshot.settings.aboutBody}
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {snapshot.profile.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border bg-card/60 p-4">
                  <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                    {metric.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Skills</p>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl">A compact toolkit</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map(([category, names]) => (
              <div key={category} className="rounded-xl border border-border bg-card/50 p-5">
                <h3 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  {category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {names.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-border px-2.5 py-1 text-sm"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection snapshot={snapshot} />

      <section className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <p className="text-sm text-muted-foreground">{snapshot.profile.email}</p>
          <Button asChild variant="outline">
            <Link href={`mailto:${snapshot.profile.email}`}>
              Email directly
              <Mail className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
