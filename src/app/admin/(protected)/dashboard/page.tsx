import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminSnapshot } from "@/lib/portfolio/admin-repository";

export default async function AdminDashboardPage() {
  const snapshot = await getAdminSnapshot();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Content command center"
        description="Track the overall portfolio shape, featured work, and the content surfaces that matter most for public presentation."
        actions={
          <Button asChild>
            <Link href="/admin/projects/new">Create project</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Projects"
          value={String(snapshot.projects.length)}
          helper={`${snapshot.projects.filter((project) => project.isPublished).length} currently published`}
        />
        <AdminStatCard
          label="Featured projects"
          value={String(snapshot.projects.filter((project) => project.isFeatured).length)}
          helper="Highlighted across the homepage and archive"
        />
        <AdminStatCard
          label="Skills"
          value={String(snapshot.skills.length)}
          helper="Used for the expertise section and public signal"
        />
        <AdminStatCard
          label="Media assets"
          value={String(snapshot.mediaAssets.length)}
          helper="Tracked records linked to portfolio content"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="section-kicker text-xs text-primary">Recent projects</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Project overview</h2>
              </div>
              <Button asChild variant="outline">
                <Link href="/admin/projects">Manage</Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Project</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Publish</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {snapshot.projects.slice(0, 5).map((project) => (
                    <tr key={project.id}>
                      <td className="px-4 py-4">
                        <p className="font-medium text-foreground">{project.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{project.category}</p>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{project.status}</td>
                      <td className="px-4 py-4">
                        <Badge variant={project.isPublished ? "secondary" : "muted"}>
                          {project.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <div>
              <p className="section-kicker text-xs text-primary">Site profile</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Current public messaging</h2>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-sm text-muted-foreground">Hero title</p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {snapshot.settings.heroTitle}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact prompt</p>
                <p className="mt-2 text-sm leading-7 text-slate-200/90">
                  {snapshot.settings.contactDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>{snapshot.settings.primaryAccent}</Badge>
                <Badge variant="secondary">{snapshot.settings.secondaryAccent}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
