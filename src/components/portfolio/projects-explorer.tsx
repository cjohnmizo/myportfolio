"use client";

import { startTransition, useDeferredValue, useState } from "react";

import { ProjectCard } from "@/components/portfolio/project-card";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Project } from "@/types/portfolio";

const sortOptions = {
  featured: "Featured first",
  newest: "Newest first",
  title: "Title A-Z",
} as const;

type SortOption = keyof typeof sortOptions;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const deferredSearch = useDeferredValue(search);

  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category)),
  ];

  const visibleProjects = [...projects]
    .filter((project) => {
      const matchesSearch =
        deferredSearch.length === 0 ||
        [
          project.title,
          project.excerpt,
          project.description,
          ...project.techStack,
        ]
          .join(" ")
          .toLowerCase()
          .includes(deferredSearch.toLowerCase());
      const matchesCategory =
        category === "all" || project.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((left, right) => {
      if (sortBy === "title") {
        return left.title.localeCompare(right.title);
      }

      if (sortBy === "newest") {
        return Number(right.year) - Number(left.year);
      }

      return (
        Number(right.isFeatured) - Number(left.isFeatured) ||
        left.sortOrder - right.sortOrder
      );
    });

  return (
    <>
      <SectionReveal>
        <div className="surface-card rounded-2xl p-5">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.55fr_0.35fr]">
            <Input
              value={search}
              onChange={(event) => {
                startTransition(() => setSearch(event.target.value));
              }}
              placeholder="Search by project, stack, or outcome"
              aria-label="Search projects"
            />
            <select
              value={category}
              onChange={(event) => {
                startTransition(() => setCategory(event.target.value));
              }}
              className="border-border bg-input text-foreground focus:border-primary/60 focus:bg-muted h-12 rounded-xl border px-4 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All categories" : item}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(event) => {
                startTransition(() =>
                  setSortBy(event.target.value as SortOption),
                );
              }}
              className="border-border bg-input text-foreground focus:border-primary/60 focus:bg-muted h-12 rounded-xl border px-4 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Sort projects"
            >
              {Object.entries(sortOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-3 text-sm">
            <Badge variant="muted">{visibleProjects.length} results</Badge>
            <span>Search by project name, description, or stack.</span>
          </div>
        </div>
      </SectionReveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project, index) => (
            <SectionReveal key={project.id} delay={0.04 * index}>
              <ProjectCard project={project} priority={index < 2} />
            </SectionReveal>
          ))
        ) : (
          <SectionReveal className="lg:col-span-2">
            <div className="surface-card rounded-2xl p-10 text-center">
              <p className="text-foreground text-2xl font-semibold">
                No projects match that filter.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                Try a different keyword or switch back to all categories to
                explore more of the archive.
              </p>
            </div>
          </SectionReveal>
        )}
      </div>
    </>
  );
}
