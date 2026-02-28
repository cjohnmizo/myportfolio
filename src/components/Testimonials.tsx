"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { config } from "@/data/config";

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
            {/* Minimal ambient background */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-0 left-1/4 w-px h-1/3 bg-[var(--card-border)]" />
            </div>

            {/* Subtle glows */}
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[var(--accent)] rounded-full blur-[120px] opacity-[0.05]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="section-subtitle mb-4 block">Testimonials</span>
                    <h2 className="section-heading">
                        Client <span className="accent">Feedback</span>
                    </h2>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {config.testimonials.items.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="clay-card p-6 sm:p-8 group flex flex-col relative"
                        >
                            {/* Quote Icon - Subtle */}
                            <Quote
                                size={20}
                                className="text-[var(--accent)] mb-5 opacity-60"
                            />

                            {/* Content */}
                            <p className="text-[var(--fg-secondary)] mb-8 leading-relaxed flex-1 text-sm">
                                &quot;{testimonial.content}&quot;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-6 border-t border-[var(--card-border)]">
                                <div className="w-10 h-10 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] font-bold text-sm flex-shrink-0">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-medium text-[var(--fg)] text-sm">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wide">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
