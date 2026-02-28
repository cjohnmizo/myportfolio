"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Hero3DElements from "./ui/Hero3DElements";

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Minimal Background Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-0 left-1/4 w-px h-full bg-[var(--card-border)]" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-[var(--card-border)]" />
                <div className="absolute top-1/4 left-0 w-full h-px bg-[var(--card-border)]" />
            </div>

            {/* Subtle Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[var(--accent)] rounded-full blur-[150px] opacity-[0.08]" />
                <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[var(--accent-secondary)] rounded-full blur-[150px] opacity-[0.06]" />
            </div>

            {/* 3D Elements */}
            <Hero3DElements />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Status Badge - Minimal */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium text-[var(--fg-secondary)] mb-8 gap-2 border border-[var(--card-border)]"
                    >
                        <span className="flex h-2 w-2">
                            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Available for new opportunities
                    </motion.div>

                    {/* Profile Picture - Geometric */}
                    <motion.div
                        className="mb-12 flex justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 border border-[var(--card-border)]">
                            <Image
                                src="/profile.jpg"
                                alt="C. John Remthang"
                                fill
                                className="object-cover"
                                priority
                            />
                            <motion.div
                                className="absolute -top-3 -right-3 text-3xl"
                                animate={{ rotate: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                            >
                                ✨
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Headline - Bold & Clean */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--fg)] mb-6 leading-[1.05]"
                    >
                        Digital{" "}
                        <span className="text-[var(--accent)]">Creator</span>
                    </motion.h1>

                    {/* Description - Clean */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-base sm:text-lg md:text-xl text-[var(--fg-secondary)] max-w-2xl mx-auto font-normal leading-relaxed mb-12 px-4"
                    >
                        Crafting elegant, performant, and accessible digital experiences with modern technologies.
                    </motion.p>

                    {/* CTAs - Minimal */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center"
                    >
                        <ScrollLink
                            to="projects"
                            smooth={true}
                            duration={500}
                            className="clay-btn cursor-pointer"
                        >
                            View Projects
                            <ArrowRight size={18} />
                        </ScrollLink>

                        <ScrollLink
                            to="contact"
                            smooth={true}
                            duration={500}
                            className="group flex items-center gap-2 px-6 py-2.5 font-medium text-[var(--fg)] border border-[var(--card-border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all"
                        >
                            Get in Touch
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </ScrollLink>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Minimal */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ChevronDown size={24} className="text-[var(--fg-muted)]" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
