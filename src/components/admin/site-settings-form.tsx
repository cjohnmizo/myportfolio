"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  generateSiteSettingsContentAction,
  saveSiteSettingsAction,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Profile, SiteSettings } from "@/types/portfolio";
import {
  siteSettingsFormSchema,
  type SiteSettingsFormInput,
  type SiteSettingsFormValues,
} from "@/validators/admin";

export function SiteSettingsForm({
  settings,
  profile,
  demoMode,
  aiEnabled,
}: {
  settings: SiteSettings;
  profile: Profile;
  demoMode: boolean;
  aiEnabled: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGenerating, startGenerating] = useTransition();
  const [generatorBrief, setGeneratorBrief] = useState(
    `Position ${profile.fullName} as a premium full-stack engineer who builds calm, high-trust software across product platforms, admin systems, CMS tools, and polished user experiences.`,
  );
  const [generatorTone, setGeneratorTone] = useState(
    "confident, polished, recruiter-friendly, and credible",
  );
  const [generatorAudience, setGeneratorAudience] = useState(
    "recruiters, hiring managers, product teams, founders, and serious clients",
  );
  const form = useForm<SiteSettingsFormInput, unknown, SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsFormSchema),
    defaultValues: settings,
  });

  const applyGeneratedContent = (generated: Partial<SiteSettingsFormValues>) => {
    const currentValues = form.getValues();

    (Object.keys(generated) as Array<keyof SiteSettingsFormValues>).forEach((key) => {
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
      const result = await generateSiteSettingsContentAction({
        fullName: profile.fullName,
        headline: profile.headline,
        currentRole: profile.currentRole,
        location: profile.location,
        yearsExperience: profile.yearsExperience,
        brief: generatorBrief,
        tone: generatorTone,
        targetAudience: generatorAudience,
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
      const result = await saveSiteSettingsAction(values);

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
                    Generate homepage copy with AI
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Draft hero, about, contact, footer, and SEO copy from a quick positioning
                    brief. You can edit any field before saving.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                onClick={onGenerate}
                disabled={!aiEnabled || isGenerating || generatorBrief.trim().length < 20}
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
                ? "The AI uses your profile details and this brief to produce a polished first draft."
                : "Set OPENAI_API_KEY in your environment to enable AI generation."}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroEyebrow">Hero eyebrow</Label>
            <Input id="heroEyebrow" {...form.register("heroEyebrow")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero title</Label>
            <Textarea id="heroTitle" className="min-h-24" {...form.register("heroTitle")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Hero subtitle</Label>
            <Textarea id="heroSubtitle" className="min-h-24" {...form.register("heroSubtitle")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroDescription">Hero description</Label>
            <Textarea
              id="heroDescription"
              className="min-h-28"
              {...form.register("heroDescription")}
            />
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="aboutTitle">About title</Label>
              <Input id="aboutTitle" {...form.register("aboutTitle")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactTitle">Contact title</Label>
              <Input id="contactTitle" {...form.register("contactTitle")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="aboutBody">About body</Label>
            <Textarea id="aboutBody" className="min-h-28" {...form.register("aboutBody")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactDescription">Contact description</Label>
            <Textarea
              id="contactDescription"
              className="min-h-28"
              {...form.register("contactDescription")}
            />
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO title</Label>
              <Input id="seoTitle" {...form.register("seoTitle")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO description</Label>
              <Input id="seoDescription" {...form.register("seoDescription")} />
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryAccent">Primary accent</Label>
              <Input id="primaryAccent" {...form.register("primaryAccent")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryAccent">Secondary accent</Label>
              <Input id="secondaryAccent" {...form.register("secondaryAccent")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="footerNote">Footer note</Label>
            <Textarea id="footerNote" className="min-h-24" {...form.register("footerNote")} />
          </div>
          <Button type="submit" disabled={isPending || demoMode} className="w-fit">
            Save settings <Save className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
