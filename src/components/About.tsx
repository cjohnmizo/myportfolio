"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const About = () => {
    return (
        <section id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
            {/* Ambient shapes */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[180px] opacity-[0.08]" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[var(--accent-secondary)] rounded-full blur-[150px] opacity-[0.06]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        {config.about.stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                                viewport={{ once: true }}
                                className="clay-card p-6 flex flex-col items-center text-center justify-center aspect-square"
                            >
                                <div className="w-12 h-12 rounded-full bg-[var(--bg)] shadow-inner flex items-center justify-center text-[var(--accent)] mb-3">
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-3xl font-black text-[var(--fg)] mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-bold text-[var(--fg-muted)] uppercase tracking-wider">
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
                            className="clay-card p-6 col-span-2 flex items-center justify-center gap-4 py-8"
                        >
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                            </span>
                            <span className="text-lg font-bold text-[var(--fg)]">
                                {config.about.status}
                            </span>
                        </motion.div>
                    </div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="clay-card p-8 sm:p-10"
                    >
                        <span className="section-subtitle mb-4 block">Who I Am</span>

                        <h2 className="section-heading mb-8">
                            A multidisciplinary developer crafting{" "}
                            <span className="accent relative inline-block">
                                digital perfection.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--accent)]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </h2>

                        <div className="space-y-6 text-[var(--fg-secondary)] leading-loose text-lg font-medium">
                            {config.about.bio.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <div className="px-6 py-3 rounded-full bg-[var(--card-bg)] shadow-sm text-[var(--fg)] text-sm font-bold border border-[var(--card-border)] flex items-center gap-2">
                                <span className="text-xl">📍</span> {config.contact.address}
                            </div>
                            <div className="px-6 py-3 rounded-full bg-[var(--card-bg)] shadow-sm text-[var(--fg)] text-sm font-bold border border-[var(--card-border)] flex items-center gap-2">
                                <span className="text-xl">💼</span> Open for work
                            </div>
                        </div>
                    </motion.div>
                </div>

                {config.about.githubStats && (
                    <div className="mt-20 sm:mt-28 flex flex-col items-center gap-8">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-[var(--accent)]/20 rounded-[2rem] blur-xl group-hover:bg-[var(--accent)]/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                            <img
                                src={config.about.githubStats.statsUrl}
                                alt="GitHub Stats"
                                className="relative rounded-[1.5rem] shadow-xl border-4 border-white/50 w-full max-w-2xl h-auto"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-[var(--accent-secondary)]/20 rounded-[2rem] blur-xl group-hover:bg-[var(--accent-secondary)]/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                            <img
                                src={config.about.githubStats.topLangsUrl}
                                alt="Top Languages"
                                className="relative rounded-[1.5rem] shadow-xl border-4 border-white/50 w-full max-w-lg h-auto"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default About;
