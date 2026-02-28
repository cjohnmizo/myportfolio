"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const Process = () => {
  return (
    <section id="process" className="relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <span className="section-eyebrow">Process</span>
          <h2 className="section-title">A structured workflow that keeps momentum.</h2>
          <p className="section-copy">{config.process.description}</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {config.process.steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="surface surface-hover p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                  Step {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-soft)] text-[var(--accent)]">
                  <step.icon size={16} />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--fg)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--fg-soft)]">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
