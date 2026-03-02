"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";
import SpotlightCard from "./ui/SpotlightCard";

const Services = () => {
  return (
    <section id="services" className="relative">
      <div className="section-shell">
        <div className="mb-12 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="section-eyebrow">Services</span>
            <h2 className="section-title">End-to-end delivery with design and engineering in sync.</h2>
            <p className="section-copy">Each engagement is scoped for outcomes, then shipped with a clean architecture and measurable performance targets.</p>
          </motion.div>

          <div className="surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
            {config.services.items.length} Core Services
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {config.services.items.map((service, index) => (
            <SpotlightCard key={service.title} className="p-6 sm:p-7">
              <div className="flex h-full flex-col">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-[var(--accent)]">
                    <service.icon size={18} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-[var(--fg)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--fg-soft)]">{service.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="chip">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
