"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { saveSiteSettingsAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSettings } from "@/types/portfolio";
import {
  siteSettingsFormSchema,
  type SiteSettingsFormInput,
  type SiteSettingsFormValues,
} from "@/validators/admin";

export function SiteSettingsForm({
  settings,
  demoMode,
}: {
  settings: SiteSettings;
  demoMode: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SiteSettingsFormInput, unknown, SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsFormSchema),
    defaultValues: settings,
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveSiteSettingsAction(values);

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
