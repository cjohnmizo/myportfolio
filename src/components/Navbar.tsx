"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/data/config";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { name: "Services", to: "services" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "About", to: "about" },
    { name: "Contact", to: "contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-250 ${scrolled
                ? "bg-[var(--bg)]/90 backdrop-blur-md border-[var(--card-border)] h-16"
                : "bg-transparent border-transparent h-20"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo - Minimal Geometric */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 border border-[var(--accent)] bg-transparent flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:bg-opacity-10 transition-all">
                        <span className="text-[var(--accent)] text-sm font-bold">CJ</span>
                    </div>
                    <span className="font-bold text-lg text-[var(--fg)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                        cjohnmizo
                    </span>
                </Link>

                {/* Desktop Nav - Minimal */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link, idx) => (
                        <ScrollLink
                            key={link.name}
                            to={link.name.toLowerCase()}
                            smooth={true}
                            duration={500}
                            className="cursor-pointer text-sm font-medium text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                        </ScrollLink>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-3">
                    <ThemeToggle />
                    <a
                        href={config.profile.resumeLink}
                        className="px-4 py-2 text-sm font-medium text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all flex items-center gap-2"
                    >
                        <Download size={16} />
                        CV
                    </a>
                </div>

                {/* Mobile Controls */}
                <div className="lg:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Minimal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 right-0 bg-[var(--bg)] border-b border-[var(--card-border)] p-4 lg:hidden"
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <ScrollLink
                                    key={link.name}
                                    to={link.name.toLowerCase()}
                                    smooth={true}
                                    duration={500}
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full py-3 px-4 text-[var(--fg)] hover:text-[var(--accent)] hover:bg-[var(--card-bg)]/50 transition-colors text-sm font-medium"
                                >
                                    {link.name}
                                </ScrollLink>
                            ))}
                            <div className="h-px bg-[var(--card-border)] my-2" />
                            <a
                                href={config.profile.resumeLink}
                                className="block w-full py-3 px-4 text-[var(--accent)] font-medium text-sm border border-[var(--accent)] text-center hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all"
                            >
                                Download CV
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
