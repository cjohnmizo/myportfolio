"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { config } from "@/data/config";

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-title">Trusted by clients who value quality execution.</h2>
          <p className="section-copy">A few words from teams I have worked with across product delivery and full-stack implementation.</p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {config.testimonials.items.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`surface p-6 sm:p-7 ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <Quote size={18} className="text-[var(--muted)]" />
              <p className="mt-4 text-sm leading-8 text-[var(--fg-soft)]">&quot;{testimonial.content}&quot;</p>

              <div className="mt-6 border-t border-[var(--line)] pt-4">
                <p className="text-sm font-semibold text-[var(--fg)]">{testimonial.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[var(--muted)]">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
