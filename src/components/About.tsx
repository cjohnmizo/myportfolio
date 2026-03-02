"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { config } from "@/data/config";

const About = () => {
  return (
    <section id="about" className="relative">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="surface p-6 sm:p-7"
          >
            <span className="section-eyebrow">About</span>
            <h2 className="section-title text-[2rem] sm:text-[2.4rem]">Human-first software with practical impact.</h2>

            <div className="mt-6 space-y-3">
              {config.about.stats.map((stat) => (
                <div key={stat.label} className="surface flex items-center gap-3 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-[var(--accent)]">
                    <stat.icon size={15} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted)]">{stat.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[var(--fg)]">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">
                <Sparkles size={12} />
                {config.about.status}
              </span>
              <span className="chip">
                <MapPin size={12} />
                {config.contact.address}
              </span>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="surface p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold text-[var(--fg)]">Who I am</h3>
            <div className="mt-5 space-y-4 text-[var(--fg-soft)]">
              {config.about.bio.map((paragraph) => (
                <p key={paragraph} className="leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default About;
