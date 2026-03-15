"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  deleteSocialLinkAction,
  saveSocialLinkAction,
} from "@/app/admin/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { SocialLink, SocialPlatform } from "@/types/portfolio";
import {
  socialLinkFormSchema,
  type SocialLinkFormInput,
  type SocialLinkFormValues,
} from "@/validators/admin";

const blankSocialLink: SocialLinkFormValues = {
  id: "",
  label: "",
  platform: "website",
  url: "https://",
  sortOrder: 0,
  isPublished: true,
};

const platformOptions: SocialPlatform[] = [
  "github",
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "website",
];

export function SocialLinksManager({
  socialLinks,
  demoMode,
}: {
  socialLinks: SocialLink[];
  demoMode: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(socialLinks[0]?.id ?? null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<SocialLinkFormInput, unknown, SocialLinkFormValues>({
    resolver: zodResolver(socialLinkFormSchema),
    defaultValues: blankSocialLink,
  });
  const isPublished = useWatch({ control: form.control, name: "isPublished" });

  const selectedSocialLink = socialLinks.find((item) => item.id === selectedId);

  useEffect(() => {
    form.reset(
      selectedSocialLink
        ? {
            id: selectedSocialLink.id,
            label: selectedSocialLink.label,
            platform: selectedSocialLink.platform,
            url: selectedSocialLink.url,
            sortOrder: selectedSocialLink.sortOrder,
            isPublished: selectedSocialLink.isPublished,
          }
        : blankSocialLink,
    );
  }, [form, selectedSocialLink]);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveSocialLinkAction(values);

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
            <h2 className="text-xl font-semibold text-foreground">Social links</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedId(null);
                form.reset(blankSocialLink);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
          <div className="space-y-3">
            {socialLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => setSelectedId(link.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  selectedId === link.id
                    ? "border-primary/40 bg-primary/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{link.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{link.platform}</p>
                  </div>
                  <Badge variant={link.isPublished ? "secondary" : "muted"}>
                    {link.isPublished ? "Published" : "Draft"}
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
                <Label htmlFor="label">Label</Label>
                <Input id="label" {...form.register("label")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <select
                  id="platform"
                  {...form.register("platform")}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-foreground"
                >
                  {platformOptions.map((platform) => (
                    <option key={platform} value={platform} className="bg-slate-950">
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" {...form.register("url")} />
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
                Save social link <Save className="ml-2 h-4 w-4" />
              </Button>
              {selectedSocialLink ? (
                <ConfirmDeleteDialog
                  title={`Delete ${selectedSocialLink.label}?`}
                  description="This removes the social destination from the public portfolio."
                  onConfirm={() => deleteSocialLinkAction(selectedSocialLink.id)}
                />
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
