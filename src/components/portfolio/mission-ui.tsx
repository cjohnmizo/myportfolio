"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  Mail,
  MapPin,
  Network,
  Radio,
  Rocket,
  School,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { TextAnimate } from "@/components/animations/TextAnimate";
import {
  HoverCard,
  StaggerGrid,
  StaggerItem,
} from "@/components/animations/motion-wrappers";
import { ContactSection } from "@/components/portfolio/contact-section";
import { HeroThreeScene } from "@/components/portfolio/hero-three-scene";
import {
  AnimatedBadge,
  FloatingElement,
  GradientMeshBg,
  SpotlightCard,
  TextReveal,
} from "@/components/reactbits";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  commandLinks,
  practicalTrustPoints,
  skillGroups,
  systemMissions,
} from "@/lib/portfolio/mission-content";
import {
  getProjectFeatures,
  getProjectPreviewAlt,
  getProjectRole,
  getProjectStatusLabel,
} from "@/lib/portfolio/project-presentation";
import { getProjectMissionHref } from "@/lib/portfolio/project-routes";
import { cn } from "@/lib/utils";
import type { PortfolioSnapshot, Project } from "@/types/portfolio";

const iconMap = {
  school: School,
  graduation: GraduationCap,
  dashboard: LayoutDashboard,
  network: Network,
  mobile: Smartphone,
  leaf: Leaf,
  cms: FileText,
};

const arsenalIcons = {
  Frontend: Code2,
  Backend: Server,
  Mobile: Smartphone,
  Database: Database,
  Deployment: Cloud,
  "Focus Areas": Cpu,
};

const missionBadges = [
  "Web Development",
  "LMS Platforms",
  "Android Apps",
  "Admin Dashboards",
  "Mizoram-based Developer",
];

function MotionBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.58,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function CinematicBackground({ dense = false }: { dense?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <GradientMeshBg className="opacity-70" />
      <div className="mizo-pattern absolute inset-0 opacity-[0.06]" />
      <div className="mission-grid absolute inset-0" />
      <div
        className={cn(
          "mission-portal absolute top-[-10rem] right-[-12rem]",
          dense && "opacity-90",
        )}
      />
      <div className="from-background absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t to-transparent" />
    </div>
  );
}

export function MissionPageHeader({
  eyebrow,
  title,
  description,
  badges,
}: {
  eyebrow: string;
  title: string;
  description: string;
  badges?: string[];
}) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <CinematicBackground />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionBlock className="max-w-4xl space-y-6">
          <Badge>{eyebrow}</Badge>
          <div className="space-y-4">
            <h1 className="text-foreground text-4xl leading-tight font-semibold sm:text-6xl">
              <TextReveal>{title}</TextReveal>
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg leading-8">
              {description}
            </p>
          </div>
          {badges?.length ? (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <AnimatedBadge
                  key={badge}
                  delay={index * 0.04}
                  className="border-border bg-card/80 text-secondary border"
                  variant="scale"
                >
                  {badge}
                </AnimatedBadge>
              ))}
            </div>
          ) : null}
        </MotionBlock>
      </div>
    </section>
  );
}

function MissionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  return (
    <Button asChild variant={variant === "outline" ? "outline" : "default"}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export function SplashScreen() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hasEntered = window.localStorage.getItem("cjohnmizo-mission-entered");
    if (!hasEntered) {
      return;
    }

    const timeout = window.setTimeout(() => {
      router.replace("/home");
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [router]);

  const enterPortfolio = () => {
    window.localStorage.setItem("cjohnmizo-mission-entered", "true");
    router.push("/home");
  };

  const bootLines = [
    "Initializing Digital Craft System...",
    "Loading Mission Archive...",
    "Connecting to cjohnmizo Command Center...",
  ];

  return (
    <main className="splash-screen relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <CinematicBackground dense />
      <motion.div
        className="splash-orbit"
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <MotionBlock className="space-y-7">
          <div className="border-primary/25 bg-primary/10 text-primary inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold">
            <span className="bg-primary h-2 w-2 rounded-full shadow-[0_0_18px_rgba(22,163,74,0.38)]" />
            cjohnmizo mission system
          </div>

          <div className="space-y-4">
            <p className="text-secondary text-sm font-semibold">
              C. John Remthang
            </p>
            <h1 className="text-foreground max-w-4xl text-5xl leading-none font-semibold sm:text-7xl">
              Cinematic 3D Mission Portfolio
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-8">
              Building practical digital systems for schools, NGOs, businesses,
              and communities.
            </p>
          </div>

          <div className="text-secondary border-border bg-card space-y-3 rounded-3xl border p-4 font-mono text-sm">
            {bootLines.map((line, index) => (
              <motion.p
                key={line}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.18 }}
              >
                <span className="text-primary">&gt;</span> {line}
              </motion.p>
            ))}
          </div>

          <button
            type="button"
            onClick={enterPortfolio}
            className="mission-launch-button group text-primary-foreground inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl px-6 text-base font-semibold"
          >
            Enter Portfolio
            <Rocket className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
        </MotionBlock>

        <FloatingElement
          amplitude={12}
          duration={5}
          className="hidden lg:block"
        >
          <div className="splash-console border-border bg-card relative min-h-[34rem] rounded-[2rem] border p-5">
            <div className="mission-grid absolute inset-0 opacity-70" />
            <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-5">
              <div className="flex items-center justify-between">
                <span className="text-secondary font-mono text-xs">
                  COMMAND CORE / ONLINE
                </span>
                <span className="bg-primary h-3 w-3 rounded-full shadow-[0_0_18px_rgba(22,163,74,0.36)]" />
              </div>
              <div className="grid place-items-center">
                <div className="splash-core grid h-56 w-56 place-items-center rounded-full">
                  <Terminal className="text-primary h-16 w-16" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["WEB", "LMS", "APP"].map((item) => (
                  <div
                    key={item}
                    className="border-border bg-muted rounded-2xl border p-4"
                  >
                    <p className="text-secondary font-mono text-xs">{item}</p>
                    <div className="bg-primary/60 mt-3 h-1.5 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FloatingElement>
      </div>
    </main>
  );
}

export function HomeCommandCenter({
  snapshot,
}: {
  snapshot: PortfolioSnapshot;
}) {
  return (
    <main>
      <section className="dashboard-hero border-border relative overflow-hidden border-b py-14 sm:py-18 lg:min-h-[calc(100svh-7rem)]">
        <HeroThreeScene />
        <CinematicBackground />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_470px] lg:items-center lg:px-8">
          <MotionBlock className="space-y-7">
            <Badge>{snapshot.settings.heroEyebrow}</Badge>
            <div className="space-y-4">
              <p className="text-secondary text-sm font-semibold">
                Welcome back / {snapshot.profile.fullName} / cjohnmizo
              </p>
              <TextAnimate
                text={snapshot.settings.heroTitle}
                mode="words"
                as="h1"
                className="text-foreground max-w-5xl text-4xl leading-[1.03] font-semibold sm:text-6xl"
                delay={0.1}
              />
              <p className="text-muted-foreground max-w-3xl text-lg leading-8">
                {snapshot.settings.heroSubtitle}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <MissionLink href="/projects">
                View Mission Archive <ArrowRight className="ml-2 h-4 w-4" />
              </MissionLink>
              <MissionLink href="/contact" variant="outline">
                Start a Project <Mail className="ml-2 h-4 w-4" />
              </MissionLink>
            </div>
            <div className="flex flex-wrap gap-2">
              {missionBadges.map((badge, index) => (
                <AnimatedBadge
                  key={badge}
                  delay={index * 0.04}
                  className="border-border bg-card/78 text-muted-foreground border"
                  variant="scale"
                >
                  {badge}
                </AnimatedBadge>
              ))}
            </div>
          </MotionBlock>

          <MotionBlock
            delay={0.12}
            className="relative min-h-[28rem] lg:min-h-[38rem]"
          >
            <div className="hero-three-space" aria-hidden="true" />
          </MotionBlock>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MissionPageHeader
            eyebrow="Command Center"
            title="Choose the next mission."
            description="Each route now opens as a focused mission page, so clients can inspect identity, systems, projects, stack, journey, and contact without scrolling through one long page."
          />
          <div className="-mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {commandLinks.map((item, index) => (
              <MissionTile
                key={item.href}
                href={item.href}
                title={item.title}
                description={item.description}
                code={item.code}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function MissionTile({
  title,
  description,
  href,
  code,
  index,
}: {
  title: string;
  description: string;
  href: string;
  code: string;
  index: number;
}) {
  return (
    <MotionBlock delay={index * 0.05}>
      <SpotlightCard
        className="h-full rounded-3xl"
        spotlightColor="rgba(125, 211, 199, 0.24)"
      >
        <Link
          href={href}
          className="mission-card-3d group flex h-full min-h-56 flex-col justify-between rounded-3xl p-5"
        >
          <div className="space-y-4">
            <span className="text-secondary font-mono text-xs">{code}</span>
            <h2 className="text-foreground text-xl font-semibold">{title}</h2>
            <p className="text-muted-foreground text-sm leading-6">
              {description}
            </p>
          </div>
          <span className="text-primary mt-8 inline-flex items-center text-sm font-semibold">
            Open mission{" "}
            <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      </SpotlightCard>
    </MotionBlock>
  );
}

export function AboutMission({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <main>
      <MissionPageHeader
        eyebrow="Origin Mission"
        title="A practical developer profile built around real users."
        description="C. John Remthang is a Mizoram-based developer and digital product creator focused on useful websites, LMS platforms, dashboards, mobile apps, Firebase tools, Laravel systems, and UI/UX improvements."
        badges={[
          "Mizoram, India",
          "Teaching background",
          "Client-friendly systems",
        ]}
      />
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <MotionBlock>
            <div className="mission-profile-card border-border bg-card relative overflow-hidden rounded-[2rem] border p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={snapshot.profile.avatarUrl}
                  alt={`${snapshot.profile.fullName} profile photo`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
              <div className="mt-5 space-y-2">
                <p className="text-secondary text-sm font-semibold">
                  Online identity: C. John Remthang
                </p>
                <h2 className="text-foreground text-2xl font-semibold">
                  {snapshot.profile.currentRole}
                </h2>
                <p className="text-muted-foreground inline-flex items-center gap-2 text-sm">
                  <MapPin className="text-primary h-4 w-4" />
                  {snapshot.profile.location}
                </p>
              </div>
            </div>
          </MotionBlock>

          <div className="space-y-5">
            <MotionBlock className="mission-briefing rounded-[2rem] p-6">
              <p className="text-muted-foreground text-base leading-8">
                {snapshot.profile.longBio}
              </p>
            </MotionBlock>

            <div className="grid gap-4 sm:grid-cols-2">
              {snapshot.profile.metrics.map((metric, index) => (
                <MotionBlock key={metric.label} delay={index * 0.04}>
                  <div className="mission-card-3d h-full rounded-3xl p-5">
                    <p className="text-secondary text-xs font-semibold uppercase">
                      {metric.label}
                    </p>
                    <p className="text-foreground mt-3 text-sm leading-6 font-semibold">
                      {metric.value}
                    </p>
                  </div>
                </MotionBlock>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function SystemsMission() {
  return (
    <main>
      <MissionPageHeader
        eyebrow="Systems I Build"
        title="Mission modules for practical digital work."
        description="Clean, maintainable systems for schools, coaching centres, NGOs, businesses, farms, and community projects."
        badges={["Web", "LMS", "Dashboards", "Mobile", "CMS"]}
      />
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-3">
          {systemMissions.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Cpu;

            return (
              <MotionBlock key={item.title} delay={index * 0.04}>
                <SpotlightCard className="h-full rounded-3xl">
                  <div className="mission-card-3d group h-full rounded-3xl p-6">
                    <div className="border-primary/25 bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl border">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-foreground mt-6 text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm leading-7">
                      {item.description}
                    </p>
                    <Link
                      href="/contact"
                      className="text-primary mt-6 inline-flex items-center text-sm font-semibold"
                    >
                      Brief this system <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </SpotlightCard>
              </MotionBlock>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export function ProjectsMission({ projects }: { projects: Project[] }) {
  return (
    <main>
      <MissionPageHeader
        eyebrow="Mission Archive"
        title="Project case files with real context."
        description="Open each mission file to inspect the problem, solution, role, feature set, stack, status, and practical usefulness."
        badges={[
          "Liankhawpui",
          "TZ Coaching LMS",
          "Gaby Farm",
          "SMAD",
          "Tualchher CMS",
        ]}
      />
      <section className="pb-20">
        <StaggerGrid
          className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
          stagger={0.08}
        >
          {projects
            .filter((project) => project.title !== "Library and LMS Tools")
            .map((project, index) => (
              <StaggerItem key={project.id}>
                <ProjectMissionCard project={project} index={index} />
              </StaggerItem>
            ))}
        </StaggerGrid>
      </section>
    </main>
  );
}

function ProjectMissionCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const features = getProjectFeatures(project).slice(0, 2);

  return (
    <MotionBlock delay={index * 0.05}>
      <SpotlightCard
        className="h-full rounded-[2rem]"
        spotlightColor="rgba(22, 163, 74, 0.12)"
      >
        <HoverCard
          as="article"
          className="mission-card-3d grid h-full overflow-hidden rounded-[2rem] md:grid-cols-[0.95fr_1.05fr]"
        >
          <Link
            href={getProjectMissionHref(project)}
            className="project-preview-frame bg-muted border-border relative min-h-64 overflow-hidden border-b md:border-r md:border-b-0"
          >
            <Image
              src={project.coverImage}
              alt={getProjectPreviewAlt(project)}
              fill
              className="object-cover transition duration-700 hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="from-background/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            <span className="border-primary/25 bg-background/80 text-primary absolute top-4 left-4 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur">
              {project.category}
            </span>
          </Link>

          <div className="flex flex-col gap-5 p-5">
            <div>
              <p className="text-secondary text-xs font-semibold uppercase">
                Mission case file
              </p>
              <h2 className="text-foreground mt-2 text-2xl font-semibold">
                {project.title}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {project.excerpt}
              </p>
            </div>

            <div className="grid gap-3">
              <BriefLine label="Problem" value={project.challenge} />
              <BriefLine label="Solution" value={project.solution} />
            </div>

            {features.length ? (
              <div className="grid gap-2">
                {features.map((feature) => (
                  <p
                    key={feature}
                    className="text-muted-foreground flex gap-2 text-sm leading-6"
                  >
                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                    {feature}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="mt-auto flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((item) => (
                <Badge key={item} variant="muted">
                  {item}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={getProjectMissionHref(project)}>
                  Open Mission File <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Badge variant="secondary">
                {getProjectStatusLabel(project.status)}
              </Badge>
            </div>
          </div>
        </HoverCard>
      </SpotlightCard>
    </MotionBlock>
  );
}

function BriefLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border bg-muted rounded-2xl border p-4">
      <p className="text-secondary text-xs font-semibold uppercase">{label}</p>
      <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-6">
        {value}
      </p>
    </div>
  );
}

export function SkillsMission() {
  return (
    <main>
      <MissionPageHeader
        eyebrow="Tech Arsenal"
        title="A grouped stack for practical delivery."
        description="The stack is organized by the kind of work it supports: frontend interfaces, backend systems, mobile apps, database layers, deployments, and practical product focus areas."
      />
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon =
              arsenalIcons[group.title as keyof typeof arsenalIcons] ?? Cpu;

            return (
              <MotionBlock key={group.title} delay={index * 0.05}>
                <div className="mission-card-3d h-full rounded-3xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="border-primary/25 bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl border">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-foreground text-xl font-semibold">
                      {group.title}
                    </h2>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item, itemIndex) => (
                      <AnimatedBadge
                        key={item}
                        delay={itemIndex * 0.025}
                        className="border-border bg-background/60 text-muted-foreground border"
                        variant="scale"
                      >
                        {item}
                      </AnimatedBadge>
                    ))}
                  </div>
                </div>
              </MotionBlock>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export function ExperienceMission({
  snapshot,
}: {
  snapshot: PortfolioSnapshot;
}) {
  const milestones = useMemo(
    () => [
      ...snapshot.experiences.map((item) => ({
        title: item.role,
        subtitle: item.company,
        period: `${new Date(item.startDate).getFullYear()} - ${item.endDate ? new Date(item.endDate).getFullYear() : "Present"}`,
        description: item.summary,
        points: item.achievements,
      })),
      ...snapshot.education.map((item) => ({
        title: item.degree,
        subtitle: item.institution,
        period: `${new Date(item.startDate).getFullYear()} - ${item.endDate ? new Date(item.endDate).getFullYear() : "Present"}`,
        description: item.description,
        points: [item.field, item.location],
      })),
    ],
    [snapshot.education, snapshot.experiences],
  );

  return (
    <main>
      <MissionPageHeader
        eyebrow="Journey Timeline"
        title="Mission milestones from teaching to practical systems."
        description="Teaching IT and working with first-time computer users keeps the software work grounded in clear screens, patient onboarding, and real-world workflows."
      />
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mission-timeline space-y-6">
            {milestones.map((item, index) => (
              <MotionBlock key={`${item.title}-${index}`} delay={index * 0.05}>
                <article className="mission-timeline-node border-border bg-card rounded-[2rem] border p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-secondary text-xs font-semibold uppercase">
                        {item.period}
                      </p>
                      <h2 className="text-foreground mt-2 text-2xl font-semibold">
                        {item.title}
                      </h2>
                      <p className="text-primary mt-1 text-sm font-semibold">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="border-primary/25 bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border">
                      <Compass className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-5 text-sm leading-7">
                    {item.description}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <p
                        key={point}
                        className="text-muted-foreground border-border bg-muted flex gap-2 rounded-2xl border p-3 text-sm leading-6"
                      >
                        <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                        {point}
                      </p>
                    ))}
                  </div>
                </article>
              </MotionBlock>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ContactMission({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <main>
      <MissionPageHeader
        eyebrow="Transmission Terminal"
        title="Send a project brief into the command center."
        description="Have a school website, LMS, NGO system, dashboard, or mobile app idea? Send a short project brief and I'll review it."
        badges={["Email ready", "Project brief", "School / NGO / LMS / Mobile"]}
      />
      <ContactSection snapshot={snapshot} />
    </main>
  );
}

export function ProjectMissionDetail({
  project,
  relatedProjects,
}: {
  project: Project;
  relatedProjects: Project[];
}) {
  const statusLabel = getProjectStatusLabel(project.status);
  const features = getProjectFeatures(project);
  const facts = [
    { label: "Mission type", value: project.category },
    { label: "My role", value: getProjectRole(project) },
    { label: "Status", value: statusLabel },
    { label: "Year", value: project.year },
  ];

  return (
    <main>
      <section className="relative overflow-hidden py-14 sm:py-20">
        <CinematicBackground dense />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="text-secondary inline-flex items-center text-sm font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mission Archive
          </Link>
          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_420px] xl:items-start">
            <MotionBlock className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge>{statusLabel}</Badge>
                <Badge variant="muted">{project.category}</Badge>
                <Badge variant="muted">{project.year}</Badge>
              </div>
              <div className="space-y-4">
                <h1 className="text-foreground max-w-5xl text-4xl leading-tight font-semibold sm:text-6xl">
                  <TextReveal>{project.title}</TextReveal>
                </h1>
                <p className="text-muted-foreground max-w-3xl text-lg leading-8">
                  {project.excerpt}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <Button asChild>
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      View Live Mission{" "}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button asChild variant="outline">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      GitHub <Github className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
                <Button asChild variant="outline">
                  <Link href="/contact">Start a Project</Link>
                </Button>
              </div>
            </MotionBlock>

            <MotionBlock delay={0.1}>
              <div className="mission-preview-frame border-border bg-card relative overflow-hidden rounded-[2rem] border p-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
                  <Image
                    src={project.coverImage}
                    alt={getProjectPreviewAlt(project)}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 420px"
                  />
                </div>
              </div>
            </MotionBlock>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <MissionBriefCard
              title="Mission overview"
              icon={Radio}
              description={project.description}
            />
            <div className="grid gap-5 lg:grid-cols-3">
              <MissionBriefCard
                title="Problem"
                icon={Compass}
                description={project.challenge}
              />
              <MissionBriefCard
                title="Solution"
                icon={Sparkles}
                description={project.solution}
              />
              <MissionBriefCard
                title="Useful because"
                icon={ShieldCheck}
                description={project.impact}
              />
            </div>
            <MotionBlock>
              <div className="mission-card-3d rounded-[2rem] p-6">
                <h2 className="text-foreground text-2xl font-semibold">
                  Key features
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <p
                      key={feature}
                      className="text-muted-foreground border-border bg-muted flex gap-2 rounded-2xl border p-4 text-sm leading-6"
                    >
                      <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                      {feature}
                    </p>
                  ))}
                </div>
              </div>
            </MotionBlock>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-32 xl:h-fit">
            <MotionBlock>
              <div className="mission-card-3d rounded-[2rem] p-5">
                <p className="text-secondary text-xs font-semibold uppercase">
                  Mission facts
                </p>
                <div className="divide-border mt-4 divide-y">
                  {facts.map((fact) => (
                    <div key={fact.label} className="py-4">
                      <p className="text-muted-foreground text-sm">
                        {fact.label}
                      </p>
                      <p className="text-foreground mt-1 text-sm leading-6 font-semibold">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </MotionBlock>
            <MotionBlock delay={0.05}>
              <div className="mission-card-3d rounded-[2rem] p-5">
                <p className="text-secondary text-xs font-semibold uppercase">
                  Tech stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((item) => (
                    <Badge key={item} variant="muted">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </MotionBlock>
          </aside>
        </div>

        {relatedProjects.length ? (
          <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
            <MissionPageHeader
              eyebrow="Related files"
              title="Open another mission."
              description="Continue browsing practical systems from the mission archive."
            />
            <div className="-mt-8 grid gap-5 lg:grid-cols-2">
              {relatedProjects.map((item, index) => (
                <ProjectMissionCard
                  key={item.id}
                  project={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}

function MissionBriefCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: typeof Compass;
}) {
  return (
    <MotionBlock>
      <div className="mission-card-3d h-full rounded-[2rem] p-6">
        <div className="flex items-center gap-3">
          <div className="border-primary/25 bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl border">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="text-foreground text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-muted-foreground mt-5 text-sm leading-8">
          {description}
        </p>
      </div>
    </MotionBlock>
  );
}

export function TrustMissionSection() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MissionPageHeader
          eyebrow="Built for practical use"
          title="Polish that supports real workflows."
          description="The visual system is cinematic, but the working goal stays practical: clear screens, maintainable code, responsive layouts, and systems people can keep using after launch."
        />
        <div className="-mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practicalTrustPoints.map((point, index) => (
            <MotionBlock key={point} delay={index * 0.04}>
              <div className="mission-card-3d rounded-3xl p-5">
                <p className="text-foreground flex gap-3 text-sm leading-6 font-semibold">
                  <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                  {point}
                </p>
              </div>
            </MotionBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
