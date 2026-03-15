import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { FeaturedProjectsSection } from "@/components/portfolio/featured-projects-section";
import { GitHubActivitySection } from "@/components/portfolio/github-activity-section";
import { HeroSection } from "@/components/portfolio/hero-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import type { GitHubActivitySnapshot } from "@/lib/portfolio/github";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function PublicHome({
  snapshot,
  githubActivity,
}: {
  snapshot: PortfolioSnapshot;
  githubActivity: GitHubActivitySnapshot;
}) {
  return (
    <main>
      <HeroSection snapshot={snapshot} />
      <AboutSection snapshot={snapshot} />
      <SkillsSection snapshot={snapshot} />
      <FeaturedProjectsSection snapshot={snapshot} />
      <ExperienceSection snapshot={snapshot} />
      <EducationSection snapshot={snapshot} />
      <GitHubActivitySection activity={githubActivity} />
      <ContactSection snapshot={snapshot} />
    </main>
  );
}
