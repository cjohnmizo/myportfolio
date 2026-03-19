"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Sparkles } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  generateProfileContentAction,
  saveProfileAction,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { StorageUploadField } from "@/components/admin/storage-upload-field";
import type { Profile } from "@/types/portfolio";
import {
  profileFormSchema,
  type ProfileFormInput,
  type ProfileFormValues,
} from "@/validators/admin";

export function ProfileForm({
  profile,
  demoMode,
  aiEnabled,
  skillNames,
}: {
  profile: Profile;
  demoMode: boolean;
  aiEnabled: boolean;
  skillNames: string[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGenerating, startGenerating] = useTransition();
  const [generatorBrief, setGeneratorBrief] = useState(
    `Position ${profile.fullName} as a premium full-stack engineer known for calm execution, product judgment, and building polished systems that teams can trust.`,
  );
  const [generatorTone, setGeneratorTone] = useState(
    "confident, polished, grounded, and recruiter-friendly",
  );
  const [generatorAudience, setGeneratorAudience] = useState(
    "recruiters, hiring managers, founders, product leaders, and serious clients",
  );
  const form = useForm<ProfileFormInput, unknown, ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      id: profile.id,
      fullName: profile.fullName,
      headline: profile.headline,
      currentRole: profile.currentRole,
      location: profile.location,
      email: profile.email,
      shortBio: profile.shortBio,
      longBio: profile.longBio,
      avatarUrl: profile.avatarUrl,
      resumeUrl: profile.resumeUrl ?? "",
      githubUsername: profile.githubUsername,
      yearsExperience: profile.yearsExperience,
      isAvailableForHire: profile.isAvailableForHire,
    },
  });
  const isAvailableForHire = useWatch({
    control: form.control,
    name: "isAvailableForHire",
  });
  const fullName = useWatch({
    control: form.control,
    name: "fullName",
  });
  const currentRole = useWatch({
    control: form.control,
    name: "currentRole",
  });

  const applyGeneratedContent = (generated: Partial<ProfileFormValues>) => {
    const currentValues = form.getValues();

    (Object.keys(generated) as Array<keyof ProfileFormValues>).forEach((key) => {
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
      const yearsExperience =
        typeof values.yearsExperience === "number"
          ? values.yearsExperience
          : Number(values.yearsExperience ?? 0);
      const result = await generateProfileContentAction({
        fullName: values.fullName,
        currentRole: values.currentRole,
        location: values.location,
        githubUsername: values.githubUsername,
        yearsExperience,
        skillNames,
        brief: generatorBrief,
        tone: generatorTone,
        targetAudience: generatorAudience,
        currentHeadline: values.headline,
        currentShortBio: values.shortBio,
        currentLongBio: values.longBio,
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
      const result = await saveProfileAction(values);

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
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
                    Generate profile and about copy
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Draft a stronger headline, short bio, and long bio from your current profile
                    details, experience level, and skill set.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={onGenerate}
                disabled={
                  !aiEnabled ||
                  isGenerating ||
                  fullName.trim().length < 2 ||
                  currentRole.trim().length < 2 ||
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
                ? "The AI uses your real profile details and skill list to create a cleaner first draft."
                : "Set OPENAI_API_KEY in your environment to enable AI generation."}
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" {...form.register("fullName")} />
              <p className="text-xs text-rose-300">{form.formState.errors.fullName?.message}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" {...form.register("headline")} />
              <p className="text-xs text-rose-300">{form.formState.errors.headline?.message}</p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentRole">Current role</Label>
              <Input id="currentRole" {...form.register("currentRole")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...form.register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUsername">GitHub username</Label>
              <Input id="githubUsername" {...form.register("githubUsername")} />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input id="avatarUrl" {...form.register("avatarUrl")} />
              <StorageUploadField
                bucket="avatars"
                label="Upload avatar"
                helper="Upload directly to the avatars bucket and populate the field automatically."
                accept="image/*"
                disabled={demoMode}
                onUploaded={(result) =>
                  form.setValue("avatarUrl", result.publicUrl, { shouldDirty: true })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input id="resumeUrl" {...form.register("resumeUrl")} />
              <StorageUploadField
                bucket="resumes"
                label="Upload resume"
                helper="Upload a PDF resume and store a durable private reference instead of an expiring signed URL."
                accept="application/pdf"
                disabled={demoMode}
                onUploaded={(result) =>
                  form.setValue("resumeUrl", result.storedValue ?? result.publicUrl, {
                    shouldDirty: true,
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of experience</Label>
              <Input id="yearsExperience" type="number" {...form.register("yearsExperience")} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground">
                <Switch
                  checked={isAvailableForHire}
                  onCheckedChange={(checked) =>
                    form.setValue("isAvailableForHire", checked, { shouldDirty: true })
                  }
                />
                Available for hire
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortBio">Short bio</Label>
            <Textarea id="shortBio" className="min-h-24" {...form.register("shortBio")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longBio">Long bio</Label>
            <Textarea id="longBio" className="min-h-40" {...form.register("longBio")} />
          </div>
          <Button type="submit" disabled={isPending || demoMode} className="w-fit">
            Save profile <Save className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
