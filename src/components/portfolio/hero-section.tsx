import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail, MapPin, Sparkles } from "lucide-react";

import { DigitalBuilderMascot } from "@/components/portfolio/digital-builder-mascot";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { SocialIcon } from "@/components/portfolio/social-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSnapshot } from "@/types/portfolio";

const serviceBadges = [
  "Web Development",
  "LMS Platforms",
  "Android Apps",
  "Admin Dashboards",
  "Mizoram-based Developer",
];

export function HeroSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <section className="border-border relative overflow-hidden border-b py-12 sm:py-16 lg:py-20">
      <div className="mizo-pattern absolute inset-0 [animation:pattern-drift_28s_linear_infinite] opacity-[0.08]" />
      <div className="bg-primary/20 absolute top-12 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-[90px]" />
      <div className="bg-secondary/10 absolute top-32 right-0 h-72 w-72 rounded-full blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-8">
        <SectionReveal className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{snapshot.settings.heroEyebrow}</Badge>
            <Badge variant="secondary">cjohnmizo</Badge>
          </div>

          <div className="space-y-5">
            <p className="text-secondary text-sm font-semibold">
              C. John Remthang
            </p>
            <h1 className="text-foreground max-w-5xl text-4xl leading-[1.06] font-semibold sm:text-5xl lg:text-6xl">
              {snapshot.settings.heroTitle}
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-8">
              {snapshot.settings.heroSubtitle}
            </p>
            <p className="text-muted-foreground max-w-2xl text-base leading-7">
              {snapshot.settings.heroDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#contact">
                Start a Project <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {snapshot.profile.resumeUrl ? (
              <Button asChild size="lg" variant="outline">
                <Link
                  href={snapshot.profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  download
                >
                  Download Resume <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : null}
            {/* TODO: Add /resume.pdf or an admin resume URL to show the Download Resume button. */}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
            {serviceBadges.map((badge, index) => (
              <div
                key={badge}
                className="border-border bg-card/60 text-muted-foreground flex [animation:float-soft_7s_ease-in-out_infinite] items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium backdrop-blur"
                style={{ animationDelay: `${index * 180}ms` }}
              >
                <Sparkles className="text-primary h-4 w-4" />
                {badge}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {snapshot.socialLinks
              .filter((link) => ["github", "linkedin"].includes(link.platform))
              .map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5"
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <Card className="light-sweep">
              <CardContent className="space-y-5 p-5">
                <div className="flex items-center gap-4">
                  <div className="border-primary/20 bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border">
                    <Image
                      src={snapshot.profile.avatarUrl}
                      alt={snapshot.profile.fullName}
                      fill
                      className="object-cover"
                      sizes="80px"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-foreground text-lg font-semibold">
                      {snapshot.profile.fullName}
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {snapshot.profile.currentRole}
                    </p>
                    <p className="text-muted-foreground mt-2 inline-flex items-center gap-2 text-sm">
                      <MapPin className="text-primary h-4 w-4" />
                      {snapshot.profile.location}
                    </p>
                  </div>
                </div>
                <div className="border-primary/15 bg-primary/10 rounded-2xl border p-4">
                  <p className="text-foreground text-sm leading-7">
                    {snapshot.profile.shortBio}
                  </p>
                </div>
                <div className="grid gap-3">
                  {snapshot.profile.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="border-border bg-background/40 rounded-2xl border p-4"
                    >
                      <p className="text-muted-foreground text-xs font-semibold uppercase">
                        {metric.label}
                      </p>
                      <p className="text-foreground mt-2 text-sm leading-6 font-semibold">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <DigitalBuilderMascot />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
