"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

const Typewriter = ({ text, delay = 50, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, delay);

            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, delay, text, onComplete]);

    return <span>{currentText}</span>;
};

const Hero = () => {
    const [showSub, setShowSub] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-black">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start z-10 w-full">

                {/* Profile / Terminal Header */}
                <div className="w-full flex items-center gap-4 mb-8 border-b border-[var(--primary)]/30 pb-4">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-none border border-[var(--primary)] p-1 relative overflow-hidden bg-black/50">
                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-[var(--primary)]/10 animate-scanline pointer-events-none" />
                    </div>
                    <div className="font-mono">
                        <div className="text-[var(--primary)] text-xs md:text-sm tracking-widest mb-1">
                            Identify: User.Admin
                        </div>
                        <div className="text-white text-lg md:text-2xl font-bold uppercase tracking-wider">
                            C. John Remthang
                        </div>
                        <div className="text-[var(--secondary)] text-xs md:text-sm flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
                            STATUS: ONLINE
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="font-mono w-full max-w-4xl">
                    <div className="text-[var(--primary)] mb-2 text-sm md:text-base opacity-70">
                        &gt; INITIALIZING STARTUP SEQUENCE...
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        <span className="text-[var(--primary)] mr-4">&gt;</span>
                        <Typewriter text="BUILDING_SCALABLE_WEB_SOLUTIONS" delay={50} onComplete={() => setShowSub(true)} />
                        <span className="animate-cursor ml-1">_</span>
                    </h1>

                    {showSub && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-lg md:text-xl text-gray-400 mb-10 pl-8 border-l-2 border-[var(--primary)] ml-2"
                        >
                            <p className="mb-2 text-[var(--secondary)]">// MISSION_OBJECTIVE:</p>
                            <p>Transforming ideas into production-ready applications using React, Next.js, and Modern Tech Stack.</p>
                        </motion.div>
                    )}

                    {showSub && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-6 ml-2"
                        >
                            <ScrollLink
                                to="projects"
                                smooth={true}
                                duration={500}
                                className="group relative px-8 py-3 bg-[var(--primary)]/10 border border-[var(--primary)] text-[var(--primary)] font-bold tracking-wider hover:bg-[var(--primary)] hover:text-black transition-all cursor-pointer flex items-center gap-2 overflow-hidden w-fit"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    EXECUTE_PROJECTS &gt;
                                </span>
                                <div className="absolute inset-0 bg-[var(--primary)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                            </ScrollLink>

                            <ScrollLink
                                to="contact"
                                smooth={true}
                                duration={500}
                                className="group relative px-8 py-3 bg-transparent border border-[var(--secondary)] text-[var(--secondary)] font-bold tracking-wider hover:bg-[var(--secondary)] hover:text-black transition-all cursor-pointer flex items-center gap-2 overflow-hidden w-fit"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    INITIATE_CONTACT <Mail className="w-4 h-4" />
                                </span>
                            </ScrollLink>
                        </motion.div>
                    )}
                </div>

                {/* Footer / Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 right-10 flex flex-col gap-4 items-end"
                >
                    <div className="text-[var(--primary)] text-xs tracking-widest writing-vertical-rl mb-4 hidden md:block opacity-50">
                        CONNECT_UPLINK
                    </div>
                    {[
                        { href: "https://github.com/cjohnmizo/", Icon: Github, label: "GITHUB" },
                        { href: "https://www.linkedin.com/in/c-john-remthang/", Icon: Linkedin, label: "LINKEDIN" },
                        { href: "mailto:johnchangsan39@gmail.com", Icon: Mail, label: "EMAIL" }
                    ].map(({ href, Icon, label }, index) => (
                        <a
                            key={href}
                            href={href}
                            target={href.startsWith('http') ? "_blank" : undefined}
                            rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                            className="text-gray-500 hover:text-[var(--primary)] transition-colors p-2 border border-transparent hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 group relative"
                            aria-label={label}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-[var(--primary)] text-xs px-2 py-1 bg-black border border-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {label}
                            </span>
                        </a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--primary)]"
                >
                    <ScrollLink to="services" smooth={true} duration={500} className="cursor-pointer flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                        <span className="text-[10px] tracking-widest">SCROLL_DOWN</span>
                        <ArrowDown className="w-4 h-4" />
                    </ScrollLink>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;

