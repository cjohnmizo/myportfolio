"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, UploadCloud } from "lucide-react";
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
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled
                ? "bg-[var(--bg)]/80 backdrop-blur-md border-[var(--divider)] h-16"
                : "bg-transparent border-transparent h-20"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo (Terminal Style) */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                        <span className="text-[var(--accent)] text-lg font-bold font-mono">
                            &gt;_
                        </span>
                    </div>
                    <span className="font-mono font-bold text-lg text-[var(--fg)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                        cjohnmizo<span className="text-[var(--accent-secondary)] blink">_</span>
                    </span>
                </Link>

                {/* Desktop Nav (Command Links) */}
                <div className="hidden lg:flex items-center gap-1 bg-[var(--card-bg)]/50 p-1 rounded-lg border border-[var(--card-border)] backdrop-blur-sm">
                    {navLinks.map((link) => (
                        <ScrollLink
                            key={link.name}
                            to={link.name.toLowerCase()}
                            smooth={true}
                            duration={500}
                            className="cursor-pointer px-4 py-2 rounded-md text-sm font-mono font-medium text-[var(--fg-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg)] transition-all"
                        >
                            <span className="text-[var(--accent-secondary)] opacity-50 mr-1">./</span>
                            {link.name}
                        </ScrollLink>
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <ThemeToggle />
                    <a
                        href={config.profile.resumeLink}
                        className="px-5 py-2 text-sm font-mono font-bold text-[var(--bg)] bg-[var(--accent)] rounded hover:bg-[var(--accent-secondary)] transition-colors flex items-center gap-2"
                    >
                        <span>CV.pdf</span>
                        <UploadCloud size={16} />
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

            {/* Mobile Menu (Full Screen Terminal) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 right-0 bg-[var(--bg)] border-b border-[var(--divider)] p-6 lg:hidden shadow-2xl"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <ScrollLink
                                    key={link.name}
                                    to={link.name.toLowerCase()}
                                    smooth={true}
                                    duration={500}
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full py-3 px-4 rounded hover:bg-[var(--card-bg)] text-left font-mono text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                                >
                                    <span className="text-[var(--fg-muted)] mr-2">$ cd</span>
                                    {link.name}
                                </ScrollLink>
                            ))}
                            <div className="h-px bg-[var(--divider)] my-2" />
                            <a
                                href={config.profile.resumeLink}
                                className="block w-full py-3 px-4 rounded hover:bg-[var(--card-bg)] text-left font-mono text-[var(--accent)] font-bold"
                            >
                                <span className="text-[var(--fg-muted)] mr-2">$ cat</span>
                                resume.pdf
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
