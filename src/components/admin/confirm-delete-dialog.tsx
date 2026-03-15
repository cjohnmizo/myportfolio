"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ConfirmDeleteDialog({
  title,
  description,
  onConfirm,
}: {
  title: string;
  description: string;
  onConfirm: () => Promise<{ status: "success" | "error"; message: string }>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-slate-950/50">
          <AlertDialog.Title className="text-xl font-semibold text-foreground">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-3 text-sm leading-7 text-muted-foreground">
            {description}
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button variant="ghost">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                variant="outline"
                disabled={isPending}
                onClick={(event) => {
                  event.preventDefault();
                  startTransition(async () => {
                    const result = await onConfirm();

                    if (result.status === "error") {
                      toast.error(result.message);
                      return;
                    }

                    toast.success(result.message);
                  });
                }}
              >
                Confirm delete
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
