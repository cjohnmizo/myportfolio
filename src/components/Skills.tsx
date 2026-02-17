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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {config.skills.categories.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: catIndex * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-sm font-bold text-[var(--accent)] mb-6 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                                {category.name}
                            </h3>

                            <div className="space-y-4">
                                {category.items.map((skill) => (
                                    <div key={skill.name} className="group">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-[var(--fg)] font-medium group-hover:text-[var(--accent)] transition-colors">
                                                {skill.name}
                                            </span>
                                            <span className="text-[var(--fg-muted)] text-xs font-mono">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-[var(--card-border)] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                                viewport={{ once: true }}
                                                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
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
