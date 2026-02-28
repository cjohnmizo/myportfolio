"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { config } from "@/data/config";
import Hero3DElements from "./ui/Hero3DElements";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 sm:pt-36">
      <Hero3DElements />

      <div className="section-shell">
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="chip mb-6">{config.hero.subheadline}</span>

            <h1 className="section-title max-w-3xl text-[2.5rem] sm:text-[3.3rem] lg:text-[4.25rem]">
              {config.hero.headline}
              <span className="block text-[var(--fg-soft)]">by {config.profile.name}</span>
            </h1>

            <p className="section-copy max-w-2xl">{config.hero.description}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ScrollLink
                to="projects"
                smooth
                duration={550}
                offset={-90}
                className="button-primary"
              >
                {config.hero.cta.primary}
                <ArrowRight size={15} />
              </ScrollLink>

              <ScrollLink
                to="contact"
                smooth
                duration={550}
                offset={-90}
                className="button-secondary"
              >
                {config.hero.cta.secondary}
              </ScrollLink>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {config.about.stats.map((stat) => (
                <div key={stat.label} className="surface p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">{stat.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--fg)]">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="surface relative mx-auto w-full max-w-md overflow-hidden p-6"
          >
            <div className="absolute right-6 top-6">
              <span className="chip">{config.about.status}</span>
            </div>

            <div className="relative mx-auto mt-8 aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-[var(--line)]">
              <Image
                src="/profile.jpg"
                alt={config.profile.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="mt-6 border-t border-[var(--line)] pt-5">
              <p className="text-sm text-[var(--fg-soft)]">Open for freelance and full-time opportunities.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pb-8 text-center"
      >
        <ScrollLink
          to="services"
          smooth
          duration={550}
          offset={-90}
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--muted)]"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </ScrollLink>
      </motion.div>
    </section>
  );
};

export default Hero;
