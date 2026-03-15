import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProjectRowActions } from "@/components/admin/project-row-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";

export default async function AdminProjectsPage() {
  const snapshot = await getAdminSnapshot();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Projects"
        title="Manage case studies and featured work"
        description="Edit project narratives, surface featured work on the homepage, and control publish state from a single table."
        actions={
          <Button asChild>
            <Link href="/admin/projects/new">New project</Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">State</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {snapshot.projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-4 py-4">
                      <p className="font-medium text-foreground">{project.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{project.slug}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={project.isPublished ? "secondary" : "muted"}>
                          {project.isPublished ? "Published" : "Draft"}
                        </Badge>
                        {project.isFeatured ? <Badge>Featured</Badge> : null}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{project.sortOrder}</td>
                    <td className="px-4 py-4">
                      <ProjectRowActions projectId={project.id} projectSlug={project.slug} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
