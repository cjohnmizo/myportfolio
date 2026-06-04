import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Film,
  Gauge,
  Layers3,
  Mail,
  Sparkles,
} from "lucide-react";

import { SectionReveal } from "@/components/portfolio/section-reveal";
import { SocialIcon } from "@/components/portfolio/social-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PortfolioSnapshot } from "@/types/portfolio";

const sceneCards = [
  {
    label: "Dashboard UI",
    detail: "premium command-center layouts",
    icon: Gauge,
  },
  {
    label: "LMS Flow",
    detail: "clear course and student paths",
    icon: Layers3,
  },
  {
    label: "Mobile Views",
    detail: "responsive, readable screens",
    icon: Sparkles,
  },
  {
    label: "Static Portfolio",
    detail: "fast pages with clean content flow",
    icon: Film,
  },
];

export function HeroSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <section className="dashboard-hero border-border relative overflow-hidden border-b py-10 sm:py-14 lg:min-h-[calc(100svh-74px)] lg:py-16">
      <div className="mizo-pattern absolute inset-0 [animation:pattern-drift_34s_linear_infinite] opacity-[0.07]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f7fbff] to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:px-8">
        <SectionReveal className="space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{snapshot.settings.heroEyebrow}</Badge>
          </div>

          <div className="space-y-5">
            <p className="text-secondary text-sm font-semibold">
              C. John Remthang
            </p>
            <h1 className="text-foreground max-w-5xl text-4xl leading-[1.04] font-semibold sm:text-5xl lg:text-6xl">
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
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {sceneCards.map((card) => (
              <div
                key={card.label}
                className="dashboard-tile group flex items-start gap-3 rounded-2xl p-4"
              >
                <div className="border-primary/25 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition">
                  <card.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    {card.label}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm leading-6">
                    {card.detail}
                  </p>
                </div>
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
                  className="border-border bg-card/64 text-muted-foreground hover:border-primary/50 hover:text-foreground inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5"
                >
                  <SocialIcon platform={link.platform} className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08} className="w-full lg:justify-self-end">
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="hero-photo-shell border-border/70 relative overflow-hidden rounded-[2rem] border bg-white/62 p-2 shadow-[0_32px_90px_rgba(45,86,136,0.2)] backdrop-blur-xl">
              <div className="hero-photo-crop relative aspect-[4/5] overflow-hidden rounded-[1.55rem] border border-white/80 bg-[#dceaff]">
                <Image
                  src={snapshot.profile.avatarUrl}
                  alt={snapshot.profile.fullName}
                  fill
                  priority
                  className="hero-photo-image object-cover object-[50%_34%]"
                  sizes="(max-width: 768px) 88vw, 420px"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_48%,rgba(16,35,63,0.08))]" />
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
