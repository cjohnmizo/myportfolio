"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { config } from "@/data/config";

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-[var(--bg-secondary)]">
            {/* Ambient orbs */}
            <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-[var(--accent)] rounded-full blur-[160px] opacity-[0.05]" />
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {config.testimonials.items.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="clay-card p-6 sm:p-8 group flex flex-col relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-8 text-[var(--accent)]/10 transform rotate-12 scale-150">
                                <Quote size={60} fill="currentColor" />
                            </div>

                            <Quote
                                size={28}
                                className="text-[var(--accent)] mb-6 relative z-10"
                                fill="currentColor"
                            />

                            {/* Content */}
                            <p className="text-[var(--fg-secondary)] mb-8 leading-relaxed font-medium flex-1 text-lg z-10 relative">
                                &quot;{testimonial.content}&quot;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-[var(--divider)] z-10 relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-white/30">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-[var(--fg)] text-base">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs font-bold text-[var(--fg-muted)] uppercase tracking-wide">
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
