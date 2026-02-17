"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const About = () => {
    return (
        <section id="about" className="py-16 sm:py-24 md:py-32 relative bg-[var(--bg-secondary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
                        {config.about.stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-6 md:p-8"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[var(--spotlight)] flex items-center justify-center text-[var(--accent)] mb-4">
                                    <stat.icon size={20} />
                                </div>
                                <div className="text-xl md:text-2xl font-bold text-[var(--fg)] mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}

                        {/* Status Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="glass-card p-6 md:p-8 col-span-2"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-semibold text-[var(--fg)]">
                                    {config.about.status}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-subtitle mb-4 block">Who I Am</span>

                        <h2 className="section-heading mb-8">
                            A multidisciplinary developer crafting{" "}
                            <span className="accent">digital perfection.</span>
                        </h2>

                        <div className="space-y-5 text-[var(--fg-secondary)] leading-relaxed">
                            {config.about.bio.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <div className="px-5 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--fg-secondary)] text-sm font-medium">
                                📍 {config.contact.address}
                            </div>
                            <div className="px-5 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--fg-secondary)] text-sm font-medium">
                                💼 Open for work
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
