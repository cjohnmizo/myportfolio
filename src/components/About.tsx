"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import { config } from "@/data/config";

const About = () => {
  return (
    <section id="about" className="relative">
      <div className="section-shell">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-eyebrow">About</span>
            <h2 className="section-title">Product-minded engineering with business context.</h2>

            <div className="mt-6 space-y-4 text-[var(--fg-soft)]">
              {config.about.bio.map((paragraph) => (
                <p key={paragraph} className="leading-8">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="surface inline-flex items-center gap-2 px-4 py-3 text-sm text-[var(--fg)]">
                <MapPin size={15} className="text-[var(--accent)]" />
                {config.contact.address}
              </div>
              <div className="surface inline-flex items-center gap-2 px-4 py-3 text-sm text-[var(--fg)]">
                <CheckCircle2 size={15} className="text-[var(--accent)]" />
                {config.about.status}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {config.about.stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="surface surface-hover p-6"
              >
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-soft)] text-[var(--accent)]">
                  <stat.icon size={16} />
                </span>
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">{stat.label}</p>
                <p className="mt-2 text-lg font-semibold text-[var(--fg)]">{stat.value}</p>
              </motion.article>
            ))}

            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="surface p-6 sm:col-span-2"
            >
              <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">Approach</p>
              <p className="mt-2 text-sm leading-7 text-[var(--fg-soft)]">
                Every engagement starts with measurable goals and clear constraints. I prioritize clean architecture and interfaces that feel obvious from first use.
              </p>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
