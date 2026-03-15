"use client";

import { useRef, useTransition } from "react";
import { LoaderCircle, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface UploadResult {
  bucket: string;
  path: string;
  publicUrl: string;
}

export function StorageUploadField({
  bucket,
  label,
  helper,
  onUploaded,
  accept,
  disabled = false,
}: {
  bucket: "avatars" | "projects" | "media" | "resumes";
  label: string;
  helper: string;
  onUploaded: (result: UploadResult) => void;
  accept?: string;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-medium text-foreground">{label}</p>
          <p className="mt-1 text-sm leading-7 text-muted-foreground">{helper}</p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];

              if (!selectedFile) {
                return;
              }

              startTransition(async () => {
                const formData = new FormData();
                formData.set("bucket", bucket);
                formData.set("file", selectedFile);

                const response = await fetch("/api/admin/upload", {
                  method: "POST",
                  body: formData,
                });

                const payload = (await response.json()) as UploadResult & { message?: string };

                if (!response.ok) {
                  toast.error(payload.message ?? "Upload failed.");
                  return;
                }

                onUploaded(payload);
                toast.success("Upload complete.");
              });
            }}
          />
          <Button
            type="button"
            variant="outline"
            disabled={isPending || disabled}
            onClick={() => inputRef.current?.click()}
          >
            {isPending ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-4 w-4" />
            )}
            Upload file
          </Button>
        </div>
      </div>
    </div>
  );
}
