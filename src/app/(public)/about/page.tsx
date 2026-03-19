import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, MapPin, Sparkles } from "lucide-react";

import { AboutSection } from "@/components/portfolio/about-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { SectionReveal } from "@/components/portfolio/section-reveal";
import { StructuredData } from "@/components/portfolio/structured-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioSnapshot } from "@/lib/portfolio/repository";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const snapshot = await getPortfolioSnapshot();
  const shareTitle = `About ${snapshot.profile.fullName}`;

  return {
    title: "About",
    description: snapshot.settings.aboutBody,
    alternates: {
      canonical: `${siteConfig.url}/about`,
    },
    openGraph: {
      title: shareTitle,
      description: snapshot.settings.aboutBody,
      url: `${siteConfig.url}/about`,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: snapshot.settings.aboutBody,
      images: [`${siteConfig.url}/twitter-image`],
    },
  };
}

export default async function AboutPage() {
  const snapshot = await getPortfolioSnapshot();
  const topSkills = snapshot.skills.slice(0, 6);

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${snapshot.profile.fullName}`,
          url: `${siteConfig.url}/about`,
          description: snapshot.settings.aboutBody,
          mainEntity: {
            "@type": "Person",
            name: snapshot.profile.fullName,
            alternateName: siteConfig.alternateNames,
            jobTitle: snapshot.profile.headline,
            description: snapshot.profile.longBio,
            email: snapshot.profile.email,
            url: siteConfig.url,
            sameAs: snapshot.socialLinks.map((link) => link.url),
          },
        }}
      />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <SectionReveal className="space-y-7">
                <Badge>About</Badge>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-6xl">
                    A fuller look at how I build products, systems, and software teams can trust.
                  </h1>
                  <p className="max-w-3xl text-lg leading-8 text-slate-200/90">
                    {snapshot.profile.shortBio}
                  </p>
                  <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                    {snapshot.settings.aboutBody}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/projects">
                      Explore case studies <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/#contact">Start a conversation</Link>
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
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
              </SectionReveal>

              <SectionReveal delay={0.08}>
                <Card className="glass-panel overflow-hidden">
                  <CardContent className="space-y-6 p-8">
                    <div className="space-y-3">
                      <p className="section-kicker text-xs text-primary">Current focus</p>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {snapshot.profile.currentRole}
                      </h2>
                      <p className="inline-flex items-center gap-2 text-sm text-slate-300">
                        <MapPin className="h-4 w-4 text-secondary" />
                        {snapshot.profile.location}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="mt-2 text-xl font-semibold text-foreground">
                          {snapshot.profile.yearsExperience}+ years shipping software
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm text-muted-foreground">Availability</p>
                        <p className="mt-2 text-xl font-semibold text-foreground">
                          {snapshot.profile.isAvailableForHire
                            ? "Open to strong-fit roles and builds"
                            : "Focused on active engagements"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-foreground">Core stack</p>
                          <p className="text-sm text-muted-foreground">
                            Tools and systems I rely on most often in production work.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {topSkills.map((skill) => (
                          <Badge key={skill.id} variant="muted">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button asChild variant="outline">
                      <Link
                        href={`https://github.com/${snapshot.profile.githubUsername}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        View GitHub <Github className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </SectionReveal>
            </div>
          </section>

          <AboutSection snapshot={snapshot} showFullStoryLink={false} />
          <ExperienceSection snapshot={snapshot} />
          <EducationSection snapshot={snapshot} />

          <section className="pb-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="glass-panel">
                <CardContent className="space-y-5 p-8">
                  <p className="section-kicker text-xs text-primary">Next step</p>
                  <h2 className="text-3xl font-semibold text-foreground">
                    Want the work first?
                  </h2>
                  <p className="text-base leading-7 text-muted-foreground">
                    The project archive is the fastest way to see how I translate product judgment
                    and technical depth into real delivery.
                  </p>
                  <Button asChild>
                    <Link href="/projects">
                      View all projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-5 p-8">
                  <p className="section-kicker text-xs text-primary">Start a conversation</p>
                  <h2 className="text-3xl font-semibold text-foreground">
                    Building something ambitious?
                  </h2>
                  <p className="text-base leading-7 text-muted-foreground">
                    I am best aligned with product-focused software work that needs sharp
                    implementation, reliable systems, and a calm delivery mindset.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/#contact">Get in touch</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
