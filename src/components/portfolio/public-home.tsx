import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { FeaturedProjectsSection } from "@/components/portfolio/featured-projects-section";
import { HeroSection } from "@/components/portfolio/hero-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ServicesSection } from "@/components/portfolio/systems-section";
import { ProcessSection } from "@/components/portfolio/trust-section";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function PublicHome({ snapshot }: { snapshot: PortfolioSnapshot }) {
  return (
    <main>
      <HeroSection snapshot={snapshot} />
      <AboutSection snapshot={snapshot} />
      <ServicesSection />
      <SkillsSection snapshot={snapshot} />
      <FeaturedProjectsSection snapshot={snapshot} />
      <ExperienceSection snapshot={snapshot} />
      <ProcessSection />
      <ContactSection snapshot={snapshot} />
    </main>
  );
}
