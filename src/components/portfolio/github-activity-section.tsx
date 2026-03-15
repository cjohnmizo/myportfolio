import Link from "next/link";
import { ArrowUpRight, GitBranchPlus, Star } from "lucide-react";

import { SectionHeading } from "@/components/portfolio/section-heading";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateLabel } from "@/lib/utils";
import type { GitHubActivitySnapshot } from "@/lib/portfolio/github";

export function GitHubActivitySection({
  activity,
}: {
  activity: GitHubActivitySnapshot;
}) {
  return (
    <section id="github" className="py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            eyebrow="GitHub activity"
            title="Public signal that complements the case studies"
            description="Recent repositories and visible activity help recruiters and collaborators quickly validate what I build and how actively I ship."
          />
        </SectionReveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <SectionReveal>
            <Card className="h-full">
              <CardContent className="space-y-6 p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-3xl font-semibold text-foreground">{activity.publicRepos}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Public repos</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-3xl font-semibold text-foreground">{activity.followers}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-3xl font-semibold text-foreground">{activity.events.length}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Recent events</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {activity.repos.map((repo) => (
                    <Link
                      key={repo.id}
                      href={repo.htmlUrl}
                      target="_blank"
                      className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-primary/40"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{repo.name}</h3>
                          <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                            {repo.description}
                          </p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-primary" />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        {repo.language ? <Badge variant="muted">{repo.language}</Badge> : null}
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" /> {repo.stargazersCount} stars
                        </span>
                        <span>Updated {formatDateLabel(repo.updatedAt)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal delay={0.05}>
            <Card className="h-full">
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="section-kicker text-xs text-primary">Recent activity</p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">
                    Recent public events
                  </h3>
                </div>
                <div className="space-y-3">
                  {activity.events.length > 0 ? (
                    activity.events.map((event) => (
                      <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <GitBranchPlus className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{event.type}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{event.repoName}</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                              {formatDateLabel(event.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-muted-foreground">
                      GitHub event data is temporarily unavailable, but the project archive above
                      still reflects the core work and technical direction.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
