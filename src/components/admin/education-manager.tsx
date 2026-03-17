"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  deleteEducationAction,
  saveEducationAction,
} from "@/app/admin/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Education } from "@/types/portfolio";
import {
  educationFormSchema,
  type EducationFormInput,
  type EducationFormValues,
} from "@/validators/admin";

const blankEducation: EducationFormValues = {
  id: "",
  institution: "",
  degree: "",
  field: "",
  location: "",
  startDate: "",
  endDate: "",
  grade: "",
  description: "",
  sortOrder: 0,
  isPublished: true,
};

export function EducationManager({
  education,
  demoMode,
}: {
  education: Education[];
  demoMode: boolean;
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(education[0]?.id ?? null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<EducationFormInput, unknown, EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: blankEducation,
  });
  const isPublished = useWatch({ control: form.control, name: "isPublished" });

  const selectedEducation = education.find((item) => item.id === selectedId);

  useEffect(() => {
    form.reset(
      selectedEducation
        ? {
            id: selectedEducation.id,
            institution: selectedEducation.institution,
            degree: selectedEducation.degree,
            field: selectedEducation.field,
            location: selectedEducation.location,
            startDate: selectedEducation.startDate,
            endDate: selectedEducation.endDate ?? "",
            grade: selectedEducation.grade,
            description: selectedEducation.description,
            sortOrder: selectedEducation.sortOrder,
            isPublished: selectedEducation.isPublished,
          }
        : blankEducation,
    );
  }, [form, selectedEducation]);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveEducationAction(values);

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
            <h2 className="text-xl font-semibold text-foreground">Education records</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedId(null);
                form.reset(blankEducation);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
          <div className="space-y-3">
            {education.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  selectedId === item.id
                    ? "border-primary/40 bg-primary/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{item.degree}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.institution}</p>
                  </div>
                  <Badge variant={item.isPublished ? "secondary" : "muted"}>
                    {item.isPublished ? "Published" : "Draft"}
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
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" {...form.register("institution")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" {...form.register("degree")} />
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="field">Field</Label>
                <Input id="field" {...form.register("field")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" {...form.register("grade")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort order</Label>
                <Input id="sortOrder" type="number" {...form.register("sortOrder")} />
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...form.register("location")} />
              </div>
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
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" className="min-h-32" {...form.register("description")} />
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
                Save education <Save className="ml-2 h-4 w-4" />
              </Button>
              {selectedEducation ? (
                <ConfirmDeleteDialog
                  title={`Delete ${selectedEducation.degree}?`}
                  description="This removes the education record from the public portfolio."
                  onConfirm={() => deleteEducationAction(selectedEducation.id)}
                />
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
