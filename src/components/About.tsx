"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const About = () => {
    return (
        <section id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
            {/* Minimal ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-px h-1/2 bg-[var(--card-border)] opacity-50" />
                <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[var(--accent)] rounded-full blur-[120px] opacity-[0.06]" />
                <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[var(--accent-secondary)] rounded-full blur-[100px] opacity-[0.05]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Stats Grid - Minimal */}
                    <div className="grid grid-cols-2 gap-4">
                        {config.about.stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="clay-card p-6 flex flex-col items-center text-center justify-center aspect-square"
                            >
                                <div className="w-10 h-10 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] mb-4">
                                    <stat.icon size={20} />
                                </div>
                                <div className="text-2xl font-bold text-[var(--fg)] mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wide">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}

                        {/* Status Card - Minimal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="clay-card p-6 col-span-2 flex items-center justify-center gap-3"
                        >
                            <span className="flex h-2 w-2">
                                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400"></span>
                                <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm font-medium text-[var(--fg)]">
                                {config.about.status}
                            </span>
                        </motion.div>
                    </div>

                    {/* Text Content - Minimal */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="section-subtitle mb-4 block">Who I Am</span>
                            <h2 className="section-heading">
                                Building <span className="accent">digital</span> solutions
                            </h2>
                        </div>

                        <div className="space-y-4 text-[var(--fg-secondary)] leading-relaxed text-base">
                            {config.about.bio.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <div className="px-4 py-3 border border-[var(--card-border)] text-[var(--fg)] text-sm flex items-center gap-2">
                                <span>📍</span> {config.contact.address}
                            </div>
                            <div className="px-4 py-3 border border-[var(--card-border)] text-[var(--fg)] text-sm flex items-center gap-2">
                                <span>✓</span> Currently Available
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
