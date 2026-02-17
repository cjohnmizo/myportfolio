"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { config } from "@/data/config";

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {config.testimonials.items.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-7 group flex flex-col"
                        >
                            {/* Quote Icon */}
                            <Quote
                                size={32}
                                className="text-[var(--accent)] opacity-20 group-hover:opacity-40 transition-opacity mb-4"
                            />

                            {/* Content */}
                            <p className="text-[var(--fg-secondary)] mb-8 leading-relaxed italic flex-1">
                                &quot;{testimonial.content}&quot;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-5 border-t border-[var(--divider)]">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-bold text-sm">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-[var(--fg)] text-sm">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs text-[var(--fg-muted)]">
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
