"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { config } from "@/data/config";
import Hero3DElements from "./ui/Hero3DElements";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 sm:pt-36">
      <Hero3DElements />

      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="surface p-7 sm:p-9"
          >
            <span className="chip mb-6">
              <Sparkles size={12} />
              {config.hero.subheadline}
            </span>

            <h1 className="section-title max-w-3xl text-[2.3rem] sm:text-[3rem] lg:text-[3.8rem]">
              {config.hero.headline}
            </h1>

            <p className="section-copy max-w-2xl">{config.hero.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ScrollLink to="projects" smooth duration={500} offset={-92} className="button-primary">
                {config.hero.cta.primary}
                <ArrowRight size={15} />
              </ScrollLink>
              <ScrollLink to="contact" smooth duration={500} offset={-92} className="button-secondary">
                {config.hero.cta.secondary}
              </ScrollLink>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {config.about.stats.map((stat) => (
                <div key={stat.label} className="surface p-4">
                  <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted)]">{stat.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--fg)]">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="grid gap-4"
          >
            <article className="surface overflow-hidden p-5 sm:p-6">
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-[var(--line)]">
                <Image src="/profile.jpg" alt={config.profile.name} fill priority className="object-cover" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--fg)]">{config.profile.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[var(--muted)]">{config.profile.title}</p>
                </div>
                <span className="chip">{config.about.status}</span>
              </div>
            </article>

            <article className="surface p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted)]">Current Focus</p>
              <p className="mt-3 text-sm leading-7 text-[var(--fg-soft)]">
                Building clean content systems, high-performance admin interfaces, and scalable full-stack applications.
              </p>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
