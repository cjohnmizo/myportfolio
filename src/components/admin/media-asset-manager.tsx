"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  deleteMediaAssetAction,
  saveMediaAssetAction,
} from "@/app/admin/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StorageUploadField } from "@/components/admin/storage-upload-field";
import type { MediaAsset } from "@/types/portfolio";
import {
  mediaAssetFormSchema,
  type MediaAssetFormInput,
  type MediaAssetFormValues,
} from "@/validators/admin";

const blankMediaAsset: MediaAssetFormValues = {
  id: "",
  bucket: "media",
  path: "",
  publicUrl: "https://",
  altText: "",
};

export function MediaAssetManager({
  assets,
  demoMode,
}: {
  assets: MediaAsset[];
  demoMode: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(assets[0]?.id ?? null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<MediaAssetFormInput, unknown, MediaAssetFormValues>({
    resolver: zodResolver(mediaAssetFormSchema),
    defaultValues: blankMediaAsset,
  });

  const selectedAsset = assets.find((item) => item.id === selectedId);

  useEffect(() => {
    form.reset(
      selectedAsset
        ? {
            id: selectedAsset.id,
            bucket: selectedAsset.bucket,
            path: selectedAsset.path,
            publicUrl: selectedAsset.publicUrl,
            altText: selectedAsset.altText,
          }
        : blankMediaAsset,
    );
  }, [form, selectedAsset]);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await saveMediaAssetAction(values);

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
            <h2 className="text-xl font-semibold text-foreground">Asset records</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedId(null);
                form.reset(blankMediaAsset);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
          <div className="space-y-3">
            {assets.length > 0 ? (
              assets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => setSelectedId(asset.id)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                    selectedId === asset.id
                      ? "border-primary/40 bg-primary/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <p className="font-medium text-foreground">{asset.path}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{asset.bucket}</p>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-muted-foreground">
                No media assets recorded yet. Storage upload integration can populate this library.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <form className="grid gap-5" onSubmit={onSubmit}>
            <StorageUploadField
              bucket="media"
              label="Upload to media bucket"
              helper="Upload a file, then save or refine its metadata below."
              disabled={demoMode}
              onUploaded={(result) => {
                form.setValue("bucket", result.bucket, { shouldDirty: true });
                form.setValue("path", result.path, { shouldDirty: true });
                form.setValue("publicUrl", result.publicUrl, { shouldDirty: true });
              }}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bucket">Bucket</Label>
                <Input id="bucket" {...form.register("bucket")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="path">Path</Label>
                <Input id="path" {...form.register("path")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicUrl">Public URL</Label>
              <Input id="publicUrl" {...form.register("publicUrl")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="altText">Alt text</Label>
              <Input id="altText" {...form.register("altText")} />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={isPending || demoMode}>
                Save asset <Save className="ml-2 h-4 w-4" />
              </Button>
              {selectedAsset ? (
                <ConfirmDeleteDialog
                  title={`Delete ${selectedAsset.path}?`}
                  description="This removes the media record from the CMS."
                  onConfirm={() => deleteMediaAssetAction(selectedAsset.id)}
                />
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
