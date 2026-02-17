"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
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
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="fixed w-full z-50 transition-all duration-300"
            style={{ paddingTop: scrolled ? "0.5rem" : "1.5rem" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`
                        mx-auto px-6 h-16 rounded-2xl flex items-center justify-between transition-all duration-500
                        ${scrolled ? "glass-panel shadow-lg" : "bg-transparent"}
                    `}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center text-white font-bold text-base shadow-md group-hover:shadow-lg transition-shadow">
                            C
                        </div>
                        <span className="font-bold text-lg tracking-tight text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                            {config.profile.shortName}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        <div className="flex items-center gap-1 mr-2">
                            {navLinks.map((link) => (
                                <ScrollLink
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-[var(--fg-secondary)] hover:text-[var(--fg)] hover:bg-[var(--spotlight)] transition-all duration-200"
                                >
                                    {link.name}
                                </ScrollLink>
                            ))}
                        </div>

                        <div className="h-6 w-px bg-[var(--divider)]" />

                        <ThemeToggle />

                        <a href={config.profile.resumeLink} className="glass-btn text-sm ml-2">
                            Download CV
                        </a>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-[var(--fg)] hover:bg-[var(--spotlight)] rounded-xl transition-all"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-4 right-4 glass-panel rounded-2xl p-5 md:hidden z-50 shadow-xl"
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <ScrollLink
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-[var(--fg)] hover:bg-[var(--spotlight)] hover:text-[var(--accent)] transition-all font-medium text-[0.9375rem]"
                                >
                                    {link.name}
                                </ScrollLink>
                            ))}
                            <a
                                href={config.profile.resumeLink}
                                className="block mt-3 text-center py-3 glass-btn justify-center"
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
