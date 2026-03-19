"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Sparkles } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  generateProjectContentAction,
  saveProjectAction,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { StorageUploadField } from "@/components/admin/storage-upload-field";
import type { Profile, Project, ProjectCategory } from "@/types/portfolio";
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
  profile,
  demoMode,
  aiEnabled,
}: {
  project: Project;
  profile: Profile;
  demoMode: boolean;
  aiEnabled: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGenerating, startGenerating] = useTransition();
  const [generatorBrief, setGeneratorBrief] = useState(
    project.title
      ? `Frame ${project.title} as a polished case study that highlights strong product thinking, clean execution, and believable business impact.`
      : "Frame this project as a polished case study that highlights strong product thinking, clean execution, and believable business impact.",
  );
  const [generatorTone, setGeneratorTone] = useState(
    "confident, polished, credible, and recruiter-friendly",
  );
  const [generatorAudience, setGeneratorAudience] = useState(
    "recruiters, hiring managers, product leaders, founders, and serious clients",
  );
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
  const projectTitle = useWatch({ control: form.control, name: "title" });
  const techStackText = useWatch({ control: form.control, name: "techStackText" });

  const applyGeneratedContent = (generated: Partial<ProjectFormValues>) => {
    const currentValues = form.getValues();

    (Object.keys(generated) as Array<keyof ProjectFormValues>).forEach((key) => {
      const nextValue = generated[key];

      if (typeof nextValue === "string" && nextValue !== currentValues[key]) {
        form.setValue(key, nextValue, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    });
  };

  const onGenerate = () => {
    startGenerating(async () => {
      const values = form.getValues();
      const result = await generateProjectContentAction({
        fullName: profile.fullName,
        headline: profile.headline,
        currentRole: profile.currentRole,
        title: values.title,
        category: values.category,
        status: values.status,
        year: values.year,
        techStackText: values.techStackText,
        brief: generatorBrief,
        tone: generatorTone,
        targetAudience: generatorAudience,
        currentExcerpt: values.excerpt,
        currentDescription: values.description,
        currentChallenge: values.challenge,
        currentSolution: values.solution,
        currentImpact: values.impact,
      });

      if (result.status === "error" || !result.data) {
        toast.error(result.message);
        return;
      }

      applyGeneratedContent(result.data);
      toast.success(result.message);
    });
  };

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
          <input type="hidden" {...form.register("id")} />
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
                  AI generator
                </p>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Generate project case study copy
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Draft the excerpt, overview, challenge, solution, and impact from your
                    project details and a quick creative brief.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={onGenerate}
                disabled={
                  !aiEnabled ||
                  isGenerating ||
                  projectTitle.trim().length < 3 ||
                  techStackText.trim().length < 2 ||
                  generatorBrief.trim().length < 20
                }
              >
                Generate draft <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="generatorTone">Tone</Label>
                <Input
                  id="generatorTone"
                  value={generatorTone}
                  onChange={(event) => setGeneratorTone(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="generatorAudience">Target audience</Label>
                <Input
                  id="generatorAudience"
                  value={generatorAudience}
                  onChange={(event) => setGeneratorAudience(event.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <Label htmlFor="generatorBrief">Creative brief</Label>
              <Textarea
                id="generatorBrief"
                className="min-h-28"
                value={generatorBrief}
                onChange={(event) => setGeneratorBrief(event.target.value)}
              />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {aiEnabled
                ? "Fill in the project title and tech stack first, then let AI draft a stronger case-study narrative."
                : "Set OPENAI_API_KEY in your environment to enable AI generation."}
            </p>
          </div>
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
              <StorageUploadField
                bucket="projects"
                label="Upload project cover"
                helper="Upload directly to the projects bucket and populate the cover image field."
                accept="image/*"
                disabled={demoMode}
                onUploaded={(result) =>
                  form.setValue("coverImage", result.publicUrl, { shouldDirty: true })
                }
              />
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
