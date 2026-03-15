import Link from "next/link";
import { ArrowRight, FolderKanban, ShieldCheck, Sparkles } from "lucide-react";

import { PageShell } from "@/components/portfolio/page-shell";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSnapshot } from "@/types/portfolio";

const roadmap = [
  {
    title: "Architecture and schema",
    description:
      "Typed models, Supabase schema, RLS policies, and deployment-friendly env boundaries.",
    icon: ShieldCheck,
  },
  {
    title: "Public portfolio experience",
    description:
      "Premium recruiter-facing storytelling, case studies, GitHub activity, and SEO coverage.",
    icon: Sparkles,
  },
  {
    title: "Secure admin CMS",
    description:
      "Protected routes, CRUD workflows, media uploads, and content controls for fast iteration.",
    icon: FolderKanban,
  },
];

export function FoundationPreview({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <main className="pb-16">
      <section className="py-20 sm:py-28">
        <PageShell>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Badge>{snapshot.settings.heroEyebrow}</Badge>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-gradient sm:text-6xl">
                {snapshot.settings.heroTitle}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                {snapshot.settings.heroSubtitle} {snapshot.settings.heroDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/projects">
                    Explore projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/login">Preview admin</Link>
                </Button>
              </div>
            </div>

            <Card className="glass-panel">
              <CardContent className="space-y-5 p-8">
                <p className="section-kicker text-xs text-secondary">Foundation snapshot</p>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {snapshot.profile.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </PageShell>
      </section>

      <section className="py-12" id="about">
        <PageShell>
          <SectionHeading
            eyebrow="Stage 1"
            title="Platform foundation is in place"
            description="This first build step establishes the app architecture, typed content layer, Supabase contracts, and the route map we’ll continue filling out."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {roadmap.map((item) => (
              <Card key={item.title}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <section className="py-12" id="projects">
        <PageShell>
          <SectionHeading
            eyebrow="Seeded content"
            title="Initial data is already modeled for dynamic rendering"
            description="The portfolio now reads from a structured repository layer, with Supabase as the primary data source and local seed data as a safe build-time fallback."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {snapshot.projects.slice(0, 3).map((project) => (
              <Card key={project.id}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="muted">{project.category}</Badge>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{project.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>
    </main>
  );
}
