import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { FeaturedProjectsSection } from "@/components/portfolio/featured-projects-section";
import { HeroSection } from "@/components/portfolio/hero-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function PublicHome({
  snapshot,
}: {
  snapshot: PortfolioSnapshot;
}) {
  return (
    <main>
      <HeroSection snapshot={snapshot} />
      <AboutSection snapshot={snapshot} />
      <SkillsSection snapshot={snapshot} />
      <FeaturedProjectsSection snapshot={snapshot} />
      <ContactSection snapshot={snapshot} />
    </main>
  );
}
