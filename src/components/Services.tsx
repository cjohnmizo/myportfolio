"use client";

import { motion } from "framer-motion";
import { Code2, Phone, ExternalLink, Mail } from "lucide-react";

const services = [
    {
        icon: Code2,
        title: "Web_App_Development",
        description: "Custom web applications built with React, Next.js, and modern frameworks. Optimized for high performance.",
        features: ["React & Next.js", "Responsive_UI", "Performance_Ops"]
    },
    {
        icon: Phone,
        title: "Mobile_Architecture",
        description: "Cross-platform mobile applications using Flutter. Native performance with a single codebase.",
        features: ["Flutter / Dart", "iOS & Android", "Native_Compilation"]
    },
    {
        icon: ExternalLink,
        title: "Full-Stack_Systems",
        description: "End-to-end development from database design to deployment. API integration and cloud infrastructure.",
        features: ["API_Endpoints", "Database_Schema", "Cloud_Deploy"]
    },
    {
        icon: Mail,
        title: "Technical_Consulting",
        description: "Expert guidance on technology stack selection, code review, architecture planning, and optimization.",
        features: ["Code_Audits", "System_Design", "Tech_Stack_Optimization"]
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="text-[var(--primary)] text-sm tracking-widest mb-2 border-b border-[var(--primary)] inline-block pb-1">../../SYSTEM/SERVICES</div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        AVAILABLE_<span className="text-[var(--secondary)]">PROTOCOLS</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                        // DEPLOYING_HIGH_QUALITY_SOLUTIONS...<br />
                        // OPTIMIZED_FOR_SCALABILITY
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-black border border-white/10 p-6 md:p-8 hover:border-[var(--primary)] transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[var(--primary)]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />

                            <div className="flex items-start gap-4 mb-4 relative z-10">
                                <div className="p-3 bg-black border border-[var(--primary)]/30 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-black transition-colors">
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--primary)] transition-colors tracking-tight">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-6 leading-relaxed text-sm relative z-10">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2 relative z-10">
                                {service.features.map((feature) => (
                                    <span
                                        key={feature}
                                        className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 text-gray-300 border border-white/10 group-hover:border-[var(--primary)]/30 group-hover:text-[var(--primary)] transition-colors"
                                    >
                                        &gt; {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-500 mb-6 font-mono text-sm">
                        &lt;!-- READY_TO_INITIATE_PROJECT --&gt;
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center px-8 py-3 border border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-black font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden group"
                    >
                        <span className="relative z-10">EXECUTE_STARTUP</span>
                        <div className="absolute inset-0 bg-[var(--secondary)]/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
