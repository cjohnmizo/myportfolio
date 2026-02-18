"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";

const Process = () => {
    return (
        <section id="process" className="py-16 sm:py-24 md:py-32 relative bg-[var(--bg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="section-subtitle mb-4 block">Workflow</span>
                    <h2 className="section-heading">
                        How I <span className="accent">Work</span>
                    </h2>
                    <p className="text-[var(--fg-secondary)] mt-4 max-w-lg">
                        {config.process.description}
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {config.process.steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="clay-card p-6 sm:p-8 group hover:-translate-y-2 transition-transform duration-300"
                        >
                            {/* Step Number */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-[var(--accent)] shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.2),inset_4px_4px_8px_rgba(255,255,255,0.4)] flex items-center justify-center text-white border-2 border-white/20">
                                    <span className="font-black text-lg">
                                        {(index + 1).toString()}
                                    </span>
                                </div>
                                <div className="h-1.5 flex-1 rounded-full bg-[var(--bg)] shadow-inner" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-black text-[var(--fg)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-[var(--fg-secondary)] leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
