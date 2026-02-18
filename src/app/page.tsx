import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Scroll-parallax ambient background - removed for cleaner Tokyo Night theme */}

      <Navbar />
      <Hero />

      <SectionDivider variant="dots" />
      <Services />

      <SectionDivider variant="geometric" />
      <Projects />

      <SectionDivider variant="wave" />
      <Skills />

      <SectionDivider variant="dots" />
      <Process />

      <SectionDivider variant="geometric" />
      <About />

      <SectionDivider variant="wave" />
      <Testimonials />

      <SectionDivider variant="dots" />
      <Contact />

      <Footer />
    </main>
  );
}
