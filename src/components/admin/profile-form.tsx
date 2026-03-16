"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { saveProfileAction } from "@/app/admin/actions";
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

export function ProfileForm({ profile, demoMode }: { profile: Profile; demoMode: boolean }) {
  const [isPending, startTransition] = useTransition();
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

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveProfileAction(values);

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });
  });

  return (
    <Card>
      <CardContent className="p-6">
        <form className="grid gap-5" onSubmit={onSubmit}>
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
