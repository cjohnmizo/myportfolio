import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Download,
  GraduationCap,
  Mail,
  ServerCog,
  Smartphone,
} from "lucide-react";

import { SectionReveal } from "@/components/portfolio/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PortfolioSnapshot } from "@/types/portfolio";

const heroCapabilities = [
  { label: "Web apps", icon: Code2 },
  { label: "Android", icon: Smartphone },
  { label: "LMS", icon: GraduationCap },
  { label: "Laravel", icon: ServerCog },
];

export function HeroSection({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <section className="dashboard-hero border-border relative overflow-hidden border-b py-12 sm:py-16 lg:min-h-[calc(100svh-74px)] lg:py-18">
      <div className="mizo-pattern absolute inset-0 [animation:pattern-drift_34s_linear_infinite] opacity-[0.07]" />
      <div className="from-background absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:px-8">
        <SectionReveal className="space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{snapshot.settings.heroEyebrow}</Badge>
          </div>

          <div className="space-y-5">
            <p className="text-secondary text-sm font-semibold">
              C. John Remthang / C. John Mizo
            </p>
            <h1 className="text-foreground max-w-5xl text-4xl leading-[1.03] font-semibold sm:text-5xl lg:text-6xl">
              {snapshot.settings.heroTitle}
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-8">
              {snapshot.settings.heroSubtitle}
            </p>
            <p className="text-muted-foreground max-w-2xl text-base leading-7">
              {snapshot.settings.heroDescription}
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
                Contact Me <Mail className="ml-2 h-4 w-4" />
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

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {heroCapabilities.map((item) => (
              <div
                key={item.label}
                className="border-border bg-white/58 text-muted-foreground flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm shadow-sm backdrop-blur"
              >
                <item.icon className="text-primary h-4 w-4" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08} className="w-full lg:justify-self-end">
          <div className="hero-visual relative mx-auto w-full max-w-[460px]">
            <div className="hero-code-panel border-border absolute -top-5 left-3 z-10 hidden w-48 rounded-2xl border bg-[#0a1931]/95 p-4 text-white shadow-2xl shadow-[#0a1931]/20 backdrop-blur sm:block">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#b3cfe5]" />
                <span className="h-2 w-2 rounded-full bg-[#4a7fa7]" />
                <span className="h-2 w-2 rounded-full bg-white/70" />
              </div>
              <div className="space-y-2 text-[11px] leading-none font-medium text-white/72">
                <p>
                  <span className="text-[#b3cfe5]">build</span>
                  <span className="text-white">.</span>web()
                </p>
                <p>
                  <span className="text-[#b3cfe5]">ship</span>
                  <span className="text-white">.</span>android()
                </p>
                <p>
                  <span className="text-[#b3cfe5]">support</span>
                  <span className="text-white">.</span>lms()
                </p>
              </div>
            </div>
            <div className="hero-photo-shell border-border/70 relative overflow-hidden rounded-[2rem] border bg-white/64 p-2 shadow-[0_32px_90px_rgba(10,25,49,0.18)] backdrop-blur-xl">
              <div className="hero-photo-crop relative aspect-[4/5] overflow-hidden rounded-[1.55rem] border border-white/80 bg-[#b3cfe5]">
                <Image
                  src={snapshot.profile.avatarUrl}
                  alt={snapshot.profile.fullName}
                  fill
                  priority
                  className="hero-photo-image object-cover object-[50%_34%]"
                  sizes="(max-width: 768px) 88vw, 420px"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_48%,rgba(10,25,49,0.1))]" />
              </div>
            </div>
            <div className="hero-service-panel border-border absolute right-3 -bottom-5 z-10 w-[min(86%,320px)] rounded-2xl border bg-white/82 p-4 shadow-2xl shadow-[#0a1931]/15 backdrop-blur-xl">
              <p className="text-secondary text-xs font-semibold uppercase">
                Practical build focus
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {["Web", "LMS", "Firebase", "Laravel"].map((item) => (
                  <span
                    key={item}
                    className="border-border bg-background/70 rounded-xl border px-3 py-2 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
