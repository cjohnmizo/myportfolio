"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const Process = () => {
  return (
    <section id="process" className="relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <span className="section-eyebrow">Process</span>
          <h2 className="section-title">A clear workflow from idea to launch.</h2>
          <p className="section-copy">{config.process.description}</p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-[var(--line)] sm:left-7" />

          <div className="space-y-4">
            {config.process.steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="relative pl-16 sm:pl-20"
              >
                <span className="absolute left-[9px] top-6 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-[11px] font-semibold text-[var(--accent)] sm:left-[11px]">
                  {index + 1}
                </span>

                <div className="surface surface-hover p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] text-[var(--accent)]">
                      <step.icon size={15} />
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--fg)]">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-[var(--fg-soft)]">{step.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
