"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Mesh */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[180px] opacity-[0.07]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-secondary)] rounded-full blur-[160px] opacity-[0.05]" />
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* Floating 3D Decorative Shapes */}
            <div className="absolute inset-0 pointer-events-none" style={{ perspective: "800px" }}>
                {/* Cube-like shape */}
                <div className="absolute top-[15%] left-[10%] float-3d" style={{ animationDelay: "0s" }}>
                    <div className="w-16 h-16 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 backdrop-blur-sm"
                        style={{ transform: "rotateX(20deg) rotateY(20deg)" }} />
                </div>

                {/* Ring shape */}
                <div className="absolute top-[20%] right-[12%] float-slow" style={{ animationDelay: "1s" }}>
                    <div className="w-20 h-20 rounded-full border-2 border-[var(--accent-secondary)]/15"
                        style={{ transform: "rotateX(40deg)" }} />
                </div>

                {/* Small diamond */}
                <div className="absolute bottom-[25%] left-[8%] float-reverse" style={{ animationDelay: "2s" }}>
                    <div className="w-10 h-10 rounded-lg border border-[var(--fg-muted)]/10 bg-[var(--fg-muted)]/5"
                        style={{ transform: "rotate(45deg) rotateX(20deg)" }} />
                </div>

                {/* Sphere-like gradient */}
                <div className="absolute bottom-[30%] right-[8%] float-3d" style={{ animationDelay: "3s" }}>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-secondary)]/10 border border-[var(--accent)]/10 shadow-lg shadow-[var(--accent)]/5" />
                </div>

                {/* Pill shape */}
                <div className="absolute top-[55%] left-[18%] float-slow hidden md:block" style={{ animationDelay: "4s" }}>
                    <div className="w-24 h-8 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)]/30 backdrop-blur-sm"
                        style={{ transform: "rotateX(25deg) rotateZ(-10deg)" }} />
                </div>

                {/* Dotted cross */}
                <div className="absolute top-[40%] right-[18%] float-reverse hidden md:block" style={{ animationDelay: "1.5s" }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" className="text-[var(--accent)]/20">
                        <line x1="16" y1="0" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
                        <line x1="0" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
                    </svg>
                </div>
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

                    {/* Profile Picture — 3D elevated */}
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
                                transform: "rotateX(5deg)",
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
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-[var(--fg)] mb-6 leading-[0.95]">
                        DIGITAL{" "}
                        <span className="text-accent-gradient">ARTISAN</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-[var(--fg-secondary)] max-w-2xl mx-auto font-normal leading-relaxed mb-12">
                        I build pixel-perfect, engaging, and accessible digital experiences.
                        <span className="block mt-2 text-[var(--fg-muted)] text-base">
                            Minimalist by design. Functional by code.
                        </span>
                    </p>

                    {/* CTAs — 3D elevated buttons */}
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
