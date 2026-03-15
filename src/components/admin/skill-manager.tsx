"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Plus } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { deleteSkillAction, saveSkillAction } from "@/app/admin/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Skill } from "@/types/portfolio";
import {
  skillFormSchema,
  type SkillFormInput,
  type SkillFormValues,
} from "@/validators/admin";

const blankSkill: SkillFormValues = {
  id: "",
  name: "",
  category: "",
  proficiency: 80,
  icon: "code-xml",
  sortOrder: 0,
  isPublished: true,
};

export function SkillManager({
  skills,
  demoMode,
}: {
  skills: Skill[];
  demoMode: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(skills[0]?.id ?? null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<SkillFormInput, unknown, SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: blankSkill,
  });
  const isPublished = useWatch({ control: form.control, name: "isPublished" });

  const selectedSkill = skills.find((skill) => skill.id === selectedId);

  useEffect(() => {
    form.reset(
      selectedSkill
        ? {
            id: selectedSkill.id,
            name: selectedSkill.name,
            category: selectedSkill.category,
            proficiency: selectedSkill.proficiency,
            icon: selectedSkill.icon,
            sortOrder: selectedSkill.sortOrder,
            isPublished: selectedSkill.isPublished,
          }
        : blankSkill,
    );
  }, [form, selectedSkill]);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveSkillAction(values);

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Skills</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedId(null);
                form.reset(blankSkill);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
          <div className="space-y-3">
            {skills.map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() => setSelectedId(skill.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  selectedId === skill.id
                    ? "border-primary/40 bg-primary/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{skill.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{skill.category}</p>
                  </div>
                  <Badge variant={skill.isPublished ? "secondary" : "muted"}>
                    {skill.proficiency}%
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
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Skill name</Label>
                <Input id="name" {...form.register("name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...form.register("category")} />
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="proficiency">Proficiency</Label>
                <Input id="proficiency" type="number" {...form.register("proficiency")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon key</Label>
                <Input id="icon" {...form.register("icon")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort order</Label>
                <Input id="sortOrder" type="number" {...form.register("sortOrder")} />
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
                Save skill <Save className="ml-2 h-4 w-4" />
              </Button>
              {selectedSkill ? (
                <ConfirmDeleteDialog
                  title={`Delete ${selectedSkill.name}?`}
                  description="This removes the skill from the public portfolio and CMS."
                  onConfirm={() => deleteSkillAction(selectedSkill.id)}
                />
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
