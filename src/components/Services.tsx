"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";
import SpotlightCard from "./ui/SpotlightCard";

const Services = () => {
  return (
    <section id="services" className="relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <span className="section-eyebrow">Services</span>
          <h2 className="section-title">What I design and ship.</h2>
          <p className="section-copy">From rapid MVPs to production platforms, each build is optimized for clarity, speed, and long-term maintainability.</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {config.services.items.map((service, index) => (
            <SpotlightCard key={service.title} className="h-full p-6 sm:p-7">
              <div className="flex h-full flex-col">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-soft)] text-[var(--accent)]">
                  <service.icon size={18} />
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

                <div className="mt-6 border-t border-[var(--line)] pt-4 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                  Service {(index + 1).toString().padStart(2, "0")}
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
