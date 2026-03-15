"use client";

import Link from "next/link";

import { deleteProjectAction } from "@/app/admin/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Button } from "@/components/ui/button";

export function ProjectRowActions({
  projectId,
  projectSlug,
}: {
  projectId: string;
  projectSlug: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild variant="outline" size="sm">
        <Link href={`/admin/projects/${projectId}/edit`}>Edit</Link>
      </Button>
      <ConfirmDeleteDialog
        title="Delete project?"
        description="This removes the project and its tech stack records from the portfolio."
        onConfirm={() => deleteProjectAction(projectId, projectSlug)}
      />
    </div>
  );
}
