import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Download,
  GraduationCap,
  Mail,
  LayoutDashboard,
  MapPin,
  Smartphone,
} from "lucide-react";

import { CinematicHeroStage } from "@/components/portfolio/cinematic-hero-stage";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PortfolioSnapshot } from "@/types/portfolio";

const heroCapabilities = [
  { label: "Web Development", icon: Code2 },
  { label: "LMS Platforms", icon: GraduationCap },
  { label: "Android Apps", icon: Smartphone },
  { label: "Admin Dashboards", icon: LayoutDashboard },
  { label: "Mizoram-based Developer", icon: MapPin },
];

export function HeroSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <section className="dashboard-hero border-border relative overflow-hidden border-b py-12 sm:py-16 lg:min-h-[calc(100svh-74px)] lg:py-18">
      <div className="mizo-pattern absolute inset-0 opacity-[0.06]" />
      <div className="from-background absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:px-8">
        <SectionReveal className="space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{snapshot.settings.heroEyebrow}</Badge>
          </div>

          <div className="space-y-5">
            <p className="text-secondary text-sm font-semibold">
              C. John Remthang | cjohnmizo
            </p>
            <h1 className="text-foreground max-w-5xl text-4xl leading-[1.03] font-semibold sm:text-5xl lg:text-6xl">
              {snapshot.settings.heroTitle}
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-8">
              {snapshot.settings.heroSubtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
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

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
            {heroCapabilities.map((item) => (
              <div
                key={item.label}
                className="border-border bg-card/78 text-muted-foreground flex min-h-11 items-center gap-2 rounded-2xl border px-3 py-2 text-sm shadow-sm backdrop-blur"
              >
                <item.icon className="text-primary h-4 w-4" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08} className="w-full lg:justify-self-end">
          <CinematicHeroStage
            avatarUrl={snapshot.profile.avatarUrl}
            fullName={snapshot.profile.fullName}
          />
        </SectionReveal>
      </div>
    </section>
  );
}
