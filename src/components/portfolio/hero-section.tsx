import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-logo";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { SocialIcon } from "@/components/portfolio/social-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function HeroSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <section className="border-border border-b py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
        <SectionReveal className="space-y-7">
          <Badge>{snapshot.settings.heroEyebrow}</Badge>
          <div className="space-y-4">
            <h1 className="text-foreground max-w-4xl text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
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
            <Button asChild>
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#contact">
                Contact Me <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
                  className="border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition"
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
          </div>
        </SectionReveal>

        <SectionReveal>
          <Card className="overflow-hidden">
            <CardContent className="space-y-6 p-6">
              <div className="flex items-start gap-4">
                <div className="border-border bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border">
                  <Image
                    src={snapshot.profile.avatarUrl}
                    alt={snapshot.profile.fullName}
                    fill
                    className="object-cover"
                    sizes="80px"
                    priority
                  />
                </div>
                <div className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <BrandMark className="h-9 w-9" />
                    <p className="text-foreground text-lg font-semibold">
                      {snapshot.profile.fullName}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {snapshot.profile.currentRole}
                  </p>
                  <p className="text-muted-foreground inline-flex items-center gap-2 text-sm">
                    <MapPin className="text-secondary h-4 w-4" />
                    {snapshot.profile.location}
                  </p>
                </div>
              </div>

              <div className="border-border bg-muted rounded-lg border p-4">
                <p className="text-foreground text-sm leading-7">
                  {snapshot.profile.shortBio}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {snapshot.profile.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="border-border bg-card rounded-lg border p-4"
                  >
                    <p className="text-muted-foreground text-xs font-medium uppercase">
                      {metric.label}
                    </p>
                    <p className="text-foreground mt-2 text-base font-semibold">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href={`mailto:${snapshot.profile.email}`}>
                  {snapshot.profile.email}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </SectionReveal>
      </div>
    </section>
  );
}
