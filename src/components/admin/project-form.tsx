"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { saveProjectAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Project, ProjectCategory } from "@/types/portfolio";
import {
  projectFormSchema,
  type ProjectFormInput,
  type ProjectFormValues,
} from "@/validators/admin";

const categories: ProjectCategory[] = [
  "platform",
  "web-app",
  "mobile-app",
  "cms",
  "dashboard",
  "design-system",
];

function formatLines(items: string[]) {
  return items.join("\n");
}

function formatMetrics(project: Project) {
  return project.metrics.map((metric) => `${metric.label}: ${metric.value}`).join("\n");
}

export function ProjectForm({
  project,
  demoMode,
}: {
  project: Project;
  demoMode: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<ProjectFormInput, unknown, ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      id: project.id,
      slug: project.slug,
      title: project.title,
      excerpt: project.excerpt,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      impact: project.impact,
      category: project.category,
      status: project.status,
      year: project.year,
      sortOrder: project.sortOrder,
      isFeatured: project.isFeatured,
      isPublished: project.isPublished,
      coverImage: project.coverImage,
      galleryImagesText: formatLines(project.galleryImages),
      demoUrl: project.demoUrl ?? "",
      githubUrl: project.githubUrl ?? "",
      caseStudyUrl: project.caseStudyUrl ?? "",
      techStackText: formatLines(project.techStack),
      metricsText: formatMetrics(project),
    },
  });
  const isFeatured = useWatch({ control: form.control, name: "isFeatured" });
  const isPublished = useWatch({ control: form.control, name: "isPublished" });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveProjectAction(values);

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/admin/projects");
      router.refresh();
    });
  });

  return (
    <Card>
      <CardContent className="p-6">
        <form className="grid gap-5" onSubmit={onSubmit}>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Project title</Label>
              <Input id="title" {...form.register("title")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...form.register("slug")} />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                {...form.register("category")}
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-foreground"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-slate-950">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" {...form.register("status")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" {...form.register("year")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" className="min-h-24" {...form.register("excerpt")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" className="min-h-28" {...form.register("description")} />
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea id="challenge" className="min-h-28" {...form.register("challenge")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea id="solution" className="min-h-28" {...form.register("solution")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="impact">Impact</Label>
              <Textarea id="impact" className="min-h-28" {...form.register("impact")} />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover image URL</Label>
              <Input id="coverImage" {...form.register("coverImage")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="galleryImagesText">Gallery images</Label>
              <Textarea
                id="galleryImagesText"
                className="min-h-24"
                placeholder="One URL per line"
                {...form.register("galleryImagesText")}
              />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input id="demoUrl" {...form.register("demoUrl")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input id="githubUrl" {...form.register("githubUrl")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caseStudyUrl">Case study URL</Label>
              <Input id="caseStudyUrl" {...form.register("caseStudyUrl")} />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="techStackText">Tech stack</Label>
              <Textarea
                id="techStackText"
                className="min-h-24"
                placeholder="One technology per line"
                {...form.register("techStackText")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metricsText">Metrics</Label>
              <Textarea
                id="metricsText"
                className="min-h-24"
                placeholder="Label: Value"
                {...form.register("metricsText")}
              />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-[180px_1fr_1fr]">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort order</Label>
              <Input id="sortOrder" type="number" {...form.register("sortOrder")} />
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground">
              <Switch
                checked={isFeatured}
                onCheckedChange={(checked) =>
                  form.setValue("isFeatured", checked, { shouldDirty: true })
                }
              />
              Featured project
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground">
              <Switch
                checked={isPublished}
                onCheckedChange={(checked) =>
                  form.setValue("isPublished", checked, { shouldDirty: true })
                }
              />
              Published
            </label>
          </div>
          <Button type="submit" disabled={isPending || demoMode} className="w-fit">
            Save project <Save className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
