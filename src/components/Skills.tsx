"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const Skills = () => {
  return (
    <section id="skills" className="relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">Cross-functional stack with production depth.</h2>
          <p className="section-copy">Hands-on across frontend, backend, mobile, and deployment workflows, with a focus on maintainable systems and accessible interfaces.</p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {config.skills.categories.map((category, index) => (
            <motion.article
              key={category.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="surface p-6"
            >
              <h3 className="text-base font-semibold text-[var(--fg)]">{category.name}</h3>
              <div className="mt-6 space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm text-[var(--fg-soft)]">{skill.name}</span>
                      <span className="text-xs font-semibold text-[var(--muted)]">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--line)]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        className="h-full rounded-full bg-[var(--accent)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
