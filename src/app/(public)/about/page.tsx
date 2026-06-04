import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, MapPin } from "lucide-react";

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
import { cn } from "@/lib/utils";

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
  const topSkills = snapshot.skills.slice(0, 7);

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

      <main className="relative py-14 sm:py-20">
        <div className="mizo-pattern absolute inset-x-0 top-0 h-72 opacity-[0.07]" />
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <SectionReveal className="space-y-7">
                <Badge>About</Badge>
                <div className="space-y-4">
                  <h1 className="text-foreground max-w-4xl text-4xl leading-tight font-semibold sm:text-5xl">
                    Cinematic product surfaces grounded in practical software.
                  </h1>
                  <p className="text-muted-foreground max-w-3xl text-lg leading-8">
                    {snapshot.profile.shortBio}
                  </p>
                  <p className="text-muted-foreground max-w-3xl text-base leading-7">
                    {snapshot.profile.longBio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/projects">
                      View Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/#contact">Contact Me</Link>
                  </Button>
                </div>
              </SectionReveal>

              <SectionReveal>
                <Card className="light-sweep border-primary/20 shadow-none">
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-3">
                      <p className="section-kicker text-secondary text-xs font-semibold">
                        Current focus
                      </p>
                      <h2 className="text-foreground text-2xl font-semibold">
                        {snapshot.profile.currentRole}
                      </h2>
                      <p className="text-muted-foreground inline-flex items-center gap-2 text-sm">
                        <MapPin className="text-secondary h-4 w-4" />
                        {snapshot.profile.location}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      {snapshot.profile.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className={cn(
                            "border-border bg-muted rounded-2xl border p-4",
                            metric.label === "Available for" &&
                              "sm:col-span-2 lg:col-span-1",
                          )}
                        >
                          <p className="text-muted-foreground text-sm">
                            {metric.label}
                          </p>
                          <p className="text-foreground mt-2 text-sm leading-6 font-semibold">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-primary/20 bg-primary/10 rounded-2xl border p-4">
                      <p className="text-foreground text-sm font-semibold">
                        Core stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
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

          <section className="pb-4">
            <Card className="shadow-none">
              <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="section-kicker text-secondary text-xs font-semibold">
                    Next step
                  </p>
                  <h2 className="text-foreground mt-2 text-2xl font-semibold">
                    Review selected work or send a project brief.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/projects">Projects</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/#contact">Contact</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
