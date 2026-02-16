"use client";

import { motion } from "framer-motion";
import { Code2, ArrowDown, MapPin, Mail } from "lucide-react";

const About = () => {
    return (
        <section id="about" className="py-24 md:py-32 bg-black relative overflow-hidden font-mono">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="text-[var(--secondary)] text-sm tracking-widest mb-2">&lt;IDENTITY_MATRIX /&gt;</div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        USER_<span className="text-[var(--primary)]">PROFILE</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-black/80 border border-[var(--primary)]/30 p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[var(--primary)] text-[var(--primary)] flex items-start justify-end p-2 opacity-50">
                                <Code2 className="w-6 h-6" />
                            </div>

                            <h3 className="text-xl text-white font-bold mb-6 border-b border-[var(--primary)]/20 pb-2 inline-block">
                                // BIO_DATA_LOG
                            </h3>

                            <div className="space-y-6 text-gray-400 leading-relaxed font-mono">
                                <p className="text-lg">
                                    &gt; Full-Stack Developer detected.<br />
                                    &gt; Location: <span className="text-white">Mizoram, India</span>.<br />
                                    &gt; Specialization: <span className="text-[var(--primary)]">Web & Mobile Architecture</span>.
                                </p>
                                <p>
                                    Executing operations as a <span className="text-[var(--secondary)]">Vocational IT Teacher</span> for Govt. of Mizoram. Simultaneously engaged in freelance protocols with global clients.
                                </p>
                                <p>
                                    Core directive: transform complex logic into scalable, maintainable code structures. Status: <span className="animate-pulse text-[var(--primary)]">ONLINE & READY</span>.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="bg-black/80 border border-[var(--secondary)]/30 p-6 relative">
                            <h3 className="text-lg text-white font-bold mb-6 flex items-center gap-2">
                                <ArrowDown className="w-5 h-5 text-[var(--secondary)]" />
                                SYSTEM_STATS
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 pb-4 border-b border-[var(--primary)]/10">
                                    <MapPin className="w-5 h-5 text-[var(--primary)] mt-1" />
                                    <div>
                                        <div className="text-[10px] text-[var(--secondary)] uppercase tracking-wider">Coordinates</div>
                                        <div className="text-white">Mizoram, In</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 pb-4 border-b border-[var(--primary)]/10">
                                    <Code2 className="w-5 h-5 text-[var(--primary)] mt-1" />
                                    <div>
                                        <div className="text-[10px] text-[var(--secondary)] uppercase tracking-wider">Experience_Level</div>
                                        <div className="text-white">Level 6+ (Years)</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 pb-4 border-b border-[var(--primary)]/10">
                                    <Mail className="w-5 h-5 text-[var(--primary)] mt-1" />
                                    <div>
                                        <div className="text-[10px] text-[var(--secondary)] uppercase tracking-wider">Language_Pack</div>
                                        <div className="text-white">English, Mizo</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--primary)]/10 border border-[var(--primary)] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[var(--primary)] animate-pulse" />
                                <span className="text-[var(--primary)] text-xs font-bold tracking-wider">SYSTEM_ACTIVE</span>
                            </div>
                            <span className="text-[var(--primary)] text-xs">open_for_work: true</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
