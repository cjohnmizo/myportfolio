"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Hero3DElements from "./ui/Hero3DElements";

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[180px] opacity-[0.07]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-secondary)] rounded-full blur-[160px] opacity-[0.05]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* 3D Illustrations — mouse reactive (hidden on mobile to prevent overflow) */}
            <div className="hidden md:block">
                <Hero3DElements />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Availability Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-semibold text-[var(--fg-secondary)] mb-10 gap-2 shadow-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Available for new projects
                    </motion.div>

                    {/* Profile Picture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-8 flex justify-center"
                        style={{ perspective: "600px" }}
                    >
                        <div
                            className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-[var(--card-border)] ring-offset-4 ring-offset-[var(--bg)]"
                            style={{
                                boxShadow: "0 20px 60px -12px var(--shadow), 0 0 30px -8px rgba(99,102,241,0.15)",
                            }}
                        >
                            <Image
                                src="/profile.jpg"
                                alt="C. John Remthang"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter text-[var(--fg)] mb-4 sm:mb-6 leading-[0.95]">
                        DIGITAL{" "}
                        <span className="text-accent-gradient">ARTISAN</span>
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl text-[var(--fg-secondary)] max-w-2xl mx-auto font-normal leading-relaxed mb-8 sm:mb-12 px-2">
                        I build pixel-perfect, engaging, and accessible digital experiences.
                        <span className="block mt-2 text-[var(--fg-muted)] text-sm sm:text-base">
                            Minimalist by design. Functional by code.
                        </span>
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <ScrollLink
                            to="projects"
                            smooth={true}
                            duration={500}
                            className="btn-primary cursor-pointer"
                            style={{ boxShadow: "0 10px 30px -6px rgba(99,102,241,0.4)" }}
                        >
                            View My Work
                        </ScrollLink>

                        <ScrollLink
                            to="contact"
                            smooth={true}
                            duration={500}
                            className="btn-outline cursor-pointer group"
                        >
                            Get in Touch
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </ScrollLink>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--fg-muted)] to-transparent opacity-30" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">Scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;
