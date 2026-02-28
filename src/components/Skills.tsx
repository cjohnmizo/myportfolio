"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const Skills = () => {
    return (
        <section id="skills" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
            {/* Minimal ambient background */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-px h-1/3 bg-[var(--card-border)]" />
                <div className="absolute bottom-0 left-1/3 w-1/3 h-px bg-[var(--card-border)]" />
            </div>

            {/* Subtle glows */}
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[var(--accent-secondary)] rounded-full blur-[120px] opacity-[0.04]" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[var(--accent)] rounded-full blur-[100px] opacity-[0.03]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="section-subtitle mb-4 block">Expertise</span>
                    <h2 className="section-heading">
                        Technical <span className="accent">Skills</span>
                    </h2>
                </motion.div>

                {/* Skill Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {config.skills.categories.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="clay-card p-6 sm:p-8"
                        >
                            <h3 className="text-base font-bold text-[var(--accent)] mb-8 uppercase tracking-wide flex items-center gap-2">
                                <span className="w-1 h-1 bg-[var(--accent)]" />
                                {category.name}
                            </h3>

                            <div className="space-y-5">
                                {category.items.map((skill) => (
                                    <div key={skill.name} className="group">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[var(--fg)] text-sm font-medium group-hover:text-[var(--accent)] transition-colors">
                                                {skill.name}
                                            </span>
                                            <span className="text-[var(--fg-muted)] text-xs font-medium bg-[var(--card-bg)] px-2 py-1">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                viewport={{ once: true }}
                                                className="h-full bg-[var(--accent)]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
