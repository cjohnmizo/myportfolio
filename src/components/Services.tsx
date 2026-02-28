"use client";

import { motion } from "framer-motion";
import { config } from "@/data/config";
import SpotlightCard from "./ui/SpotlightCard";

const Services = () => {
    return (
        <section id="services" className="py-16 sm:py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="section-subtitle mb-4 block">Services</span>
                    <h2 className="section-heading">
                        What I <span className="accent">Do</span>
                    </h2>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {config.services.items.map((service, index) => (
                        <SpotlightCard
                            key={service.title}
                            className="p-5 sm:p-8 group"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 border border-[var(--accent)] bg-transparent flex items-center justify-center mb-6 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:bg-opacity-10 transition-all duration-300">
                                    <service.icon size={24} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-[var(--fg)] mb-3">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[var(--fg-secondary)] mb-6 leading-relaxed text-sm">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--card-border)]">
                                    {service.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-2.5 py-1 text-xs font-medium text-[var(--fg-secondary)] border border-[var(--card-border)]"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
