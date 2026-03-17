"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  deleteExperienceAction,
  saveExperienceAction,
} from "@/app/admin/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Experience } from "@/types/portfolio";
import {
  experienceFormSchema,
  type ExperienceFormInput,
  type ExperienceFormValues,
} from "@/validators/admin";

const blankExperience: ExperienceFormValues = {
  id: "",
  company: "",
  role: "",
  location: "",
  employmentType: "",
  startDate: "",
  endDate: "",
  summary: "",
  achievementsText: "",
  techStackText: "",
  sortOrder: 0,
  isPublished: true,
};

function listText(items: string[]) {
  return items.join("\n");
}

export function ExperienceManager({
  experiences,
  demoMode,
}: {
  experiences: Experience[];
  demoMode: boolean;
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(experiences[0]?.id ?? null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<ExperienceFormInput, unknown, ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: blankExperience,
  });
  const isPublished = useWatch({ control: form.control, name: "isPublished" });

  const selectedExperience = experiences.find((item) => item.id === selectedId);

  useEffect(() => {
    form.reset(
      selectedExperience
        ? {
            id: selectedExperience.id,
            company: selectedExperience.company,
            role: selectedExperience.role,
            location: selectedExperience.location,
            employmentType: selectedExperience.employmentType,
            startDate: selectedExperience.startDate,
            endDate: selectedExperience.endDate ?? "",
            summary: selectedExperience.summary,
            achievementsText: listText(selectedExperience.achievements),
            techStackText: listText(selectedExperience.techStack),
            sortOrder: selectedExperience.sortOrder,
            isPublished: selectedExperience.isPublished,
          }
        : blankExperience,
    );
  }, [form, selectedExperience]);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveExperienceAction(values);

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    });
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Experience records</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedId(null);
                form.reset(blankExperience);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
          <div className="space-y-3">
            {experiences.map((experience) => (
              <button
                key={experience.id}
                type="button"
                onClick={() => setSelectedId(experience.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  selectedId === experience.id
                    ? "border-primary/40 bg-primary/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{experience.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{experience.company}</p>
                  </div>
                  <Badge variant={experience.isPublished ? "secondary" : "muted"}>
                    {experience.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <form className="grid gap-5" onSubmit={onSubmit}>
            <input type="hidden" {...form.register("id")} />
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" {...form.register("company")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" {...form.register("role")} />
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...form.register("location")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment type</Label>
                <Input id="employmentType" {...form.register("employmentType")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort order</Label>
                <Input id="sortOrder" type="number" {...form.register("sortOrder")} />
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start date</Label>
                <Input id="startDate" type="date" {...form.register("startDate")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End date</Label>
                <Input id="endDate" type="date" {...form.register("endDate")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" className="min-h-28" {...form.register("summary")} />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="achievementsText">Achievements</Label>
                <Textarea
                  id="achievementsText"
                  className="min-h-28"
                  placeholder="One item per line"
                  {...form.register("achievementsText")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStackText">Tech stack</Label>
                <Textarea
                  id="techStackText"
                  className="min-h-28"
                  placeholder="One item per line"
                  {...form.register("techStackText")}
                />
              </div>
            </div>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground">
              <Switch
                checked={isPublished}
                onCheckedChange={(checked) =>
                  form.setValue("isPublished", checked, { shouldDirty: true })
                }
              />
              Published
            </label>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={isPending || demoMode}>
                Save experience <Save className="ml-2 h-4 w-4" />
              </Button>
              {selectedExperience ? (
                <ConfirmDeleteDialog
                  title={`Delete ${selectedExperience.role}?`}
                  description="This removes the experience record from the public timeline."
                  onConfirm={() => deleteExperienceAction(selectedExperience.id)}
                />
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
