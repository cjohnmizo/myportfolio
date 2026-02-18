"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const Skills = () => {
    return (
        <section id="skills" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
            {/* Ambient orbs */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--accent-secondary)] rounded-full blur-[150px] opacity-[0.04]" />
            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[var(--accent)] rounded-full blur-[120px] opacity-[0.03]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {config.skills.categories.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="clay-card p-6 sm:p-8"
                        >
                            <h3 className="text-lg font-black text-[var(--accent)] mb-6 uppercase tracking-wider flex items-center gap-3">
                                <span className="w-4 h-4 rounded-full bg-[var(--accent)] shadow-sm" />
                                {category.name}
                            </h3>

                            <div className="space-y-6">
                                {category.items.map((skill) => (
                                    <div key={skill.name} className="group">
                                        <div className="flex justify-between text-base mb-2">
                                            <span className="text-[var(--fg)] font-bold group-hover:text-[var(--accent)] transition-colors">
                                                {skill.name}
                                            </span>
                                            <span className="text-[var(--fg-muted)] text-xs font-black bg-[var(--bg)] px-2 py-0.5 rounded-full">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-4 w-full bg-[var(--bg)] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] border border-[var(--card-border)]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1.5, delay: 0.2, type: "spring", bounce: 0.2 }}
                                                viewport={{ once: true }}
                                                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] shadow-[2px_2px_4px_rgba(0,0,0,0.1)] relative"
                                            >
                                                <div className="absolute inset-0 bg-white/20 rounded-full scale-y-50 origin-top" />
                                            </motion.div>
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
