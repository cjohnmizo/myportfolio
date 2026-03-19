import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";

import { SectionReveal } from "@/components/portfolio/section-reveal";
import { SocialIcon } from "@/components/portfolio/social-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSnapshot } from "@/types/portfolio";
import { siteConfig } from "@/lib/site";

export function HeroSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  const hasResume = Boolean(snapshot.profile.resumeUrl);
  const resumeHref = hasResume
    ? snapshot.profile.resumeUrl!
    : `mailto:${snapshot.profile.email}?subject=${encodeURIComponent("Resume request from cjohnmizo.in")}`;
  const isExternalResume =
    hasResume &&
    /^(https?:)?\/\//.test(snapshot.profile.resumeUrl ?? "");

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <SectionReveal className="space-y-8">
          <div className="space-y-6">
            <Badge>{snapshot.settings.heroEyebrow}</Badge>
            <div className="space-y-4">
              <h1 className="max-w-4xl font-mono text-5xl font-semibold tracking-tight text-gradient sm:text-6xl xl:text-7xl">
                {snapshot.settings.heroTitle}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                {snapshot.settings.heroSubtitle}
              </p>
              <p className="max-w-2xl text-base leading-7 text-slate-300/85">
                {snapshot.settings.heroDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/projects">
                Explore case studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href={resumeHref}
                target={isExternalResume ? "_blank" : undefined}
                rel={isExternalResume ? "noreferrer noopener" : undefined}
              >
                {hasResume ? "Download resume" : "Request resume"}{" "}
                <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {snapshot.socialLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <SocialIcon platform={link.platform} className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <Card className="glass-panel overflow-hidden">
            <CardContent className="space-y-8 p-8">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src={snapshot.profile.avatarUrl}
                    alt={snapshot.profile.fullName}
                    fill
                    className="object-cover"
                    sizes="96px"
                    priority
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-foreground">{snapshot.profile.fullName}</p>
                  <div className="space-y-2">
                    <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-400">
                      Also known as
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {siteConfig.publicIdentityLabels.map((alias) => (
                        <Badge key={alias} variant="muted">
                          {alias}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{snapshot.profile.currentRole}</p>
                  <p className="inline-flex items-center gap-2 text-sm text-slate-300">
                    <MapPin className="h-4 w-4 text-secondary" />
                    {snapshot.profile.location}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5">
                <p className="text-sm leading-7 text-slate-100">{snapshot.profile.shortBio}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {snapshot.profile.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SectionReveal>
      </div>
    </section>
  );
}
