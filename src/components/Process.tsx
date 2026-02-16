"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

import { config } from "@/data/config";

const Process = () => {
    return (
        <section id="process" className="py-24 md:py-32 bg-gradient-to-b from-zinc-900 to-zinc-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
                        {config.process.title}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 mx-auto rounded-full mb-6" />
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        {config.process.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {config.process.steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="glass p-6 rounded-2xl border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full group">
                                {/* Step Number */}
                                <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                    {index + 1}
                                </div>

                                <div className="flex flex-col items-start">
                                    <div className="p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl border border-purple-500/30 mb-4 group-hover:border-purple-500/60 transition-colors">
                                        <step.icon className="w-6 h-6 text-purple-400" />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center glass p-8 rounded-2xl border-indigo-500/30"
                >
                    <h3 className="text-2xl font-bold text-white mb-3">Transparent Communication</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        I believe in keeping you informed every step of the way. Regular updates, clear documentation, and open communication ensure we're always aligned on project goals and progress.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Process;
