"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Hero3DElements from "./ui/Hero3DElements";

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[120px] opacity-[0.1]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent-secondary)] rounded-full blur-[120px] opacity-[0.1]" />
            </div>

            {/* 3D Illustrations — mouse reactive */}
            <Hero3DElements />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                >
                    {/* Availability Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--card-bg)] text-xs sm:text-sm font-bold text-[var(--fg-secondary)] mb-8 gap-2 shadow-[4px_4px_10px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(0,0,0,0.05),inset_2px_2px_4px_rgba(255,255,255,0.5)] border border-white/50"
                    >
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        Open for new adventures!
                    </motion.div>

                    {/* Profile Picture (Bouncy) */}
                    <motion.div
                        className="mb-8 flex justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div
                            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white"
                            style={{
                                boxShadow: "0 20px 40px -10px var(--shadow), inset 0 -4px 6px rgba(0,0,0,0.1)",
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
                        <motion.div
                            className="absolute ml-28 mt-24 bg-white p-2 rounded-full shadow-lg text-2xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            👋
                        </motion.div>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--fg)] mb-6 leading-[0.9] drop-shadow-sm">
                        DIGITAL{" "}
                        <span className="text-accent-gradient inline-block transform hover:scale-105 transition-transform duration-300 cursor-default" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}>
                            WIZARD
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-[var(--fg-secondary)] max-w-2xl mx-auto font-medium leading-relaxed mb-10 px-4">
                        Building <span className="text-[var(--accent)] font-bold">pixel-perfect</span>, bouncy, and accessible digital experiences that pop!
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 justify-center">
                        <ScrollLink
                            to="projects"
                            smooth={true}
                            duration={500}
                            className="clay-btn cursor-pointer"
                        >
                            See My Magic
                            <Sparkles size={20} className="animate-pulse" />
                        </ScrollLink>

                        <ScrollLink
                            to="contact"
                            smooth={true}
                            duration={500}
                            className="group flex items-center gap-2 px-8 py-3 rounded-full font-bold text-[var(--fg)] border-2 border-[var(--card-border)] hover:bg-[var(--card-bg)] hover:border-[var(--accent)] transition-all active:scale-95"
                        >
                            Say Hello
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </ScrollLink>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">Scroll</span>
                <div className="w-6 h-10 border-2 border-[var(--fg-muted)] rounded-full flex justify-center p-1">
                    <motion.div
                        className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"
                        animate={{ y: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
