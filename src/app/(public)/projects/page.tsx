import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/portfolio/page-shell";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and engineering work from C. John Remthang.",
};

export default async function ProjectsPage() {
  const snapshot = await getPortfolioSnapshot();

  return (
    <main className="py-20 sm:py-24">
      <PageShell>
        <SectionHeading
          eyebrow="Project archive"
          title="Dynamic project routes are now active"
          description="The archive route is live and drawing from the repository layer. Search, filters, and sorting will land in the public UI stage."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {snapshot.projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group">
              <Card className="h-full transition duration-300 group-hover:-translate-y-1 group-hover:border-primary/40">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="muted">{project.category}</Badge>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
                  <p className="text-sm leading-7 text-muted-foreground">{project.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </PageShell>
    </main>
  );
}
