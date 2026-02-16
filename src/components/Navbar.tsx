"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Code2, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/data/config";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "SERVICES", to: "services" },
        { name: "PROJECTS", to: "projects" },
        { name: "SKILLS", to: "skills" },
        { name: "ABOUT", to: "about" },
        { name: "CONTACT", to: "contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className={`fixed w-full z-50 transition-all duration-300 font-mono ${scrolled
                ? "bg-black/95 border-b border-[var(--primary)] shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center border border-[var(--primary)] bg-black/50 overflow-hidden">
                            <Code2 className="w-6 h-6 text-[var(--primary)] animate-pulse" />
                            <div className="absolute inset-0 bg-[var(--primary)]/10 animate-scanline pointer-events-none"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-wider text-[var(--primary)] group-hover:text-shadow-neon transition-all">
                                [ {config.profile.shortName} ]
                            </span>
                            <span className="text-[10px] text-[var(--secondary)] tracking-[0.2em] uppercase">
                                System.Online
                            </span>
                        </div>
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navLinks.map((link, index) => (
                                <ScrollLink
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    className="cursor-pointer relative px-2 py-1 text-sm font-bold text-gray-400 hover:text-[var(--primary)] transition-colors duration-200 group"
                                >
                                    <span className="group-hover:hidden">{link.name}</span>
                                    <span className="hidden group-hover:inline-block pl-2 bg-[var(--primary)] text-black">
                                        {`> ${link.name}_`}
                                    </span>
                                </ScrollLink>
                            ))}

                            <motion.a
                                href={config.profile.resumeLink}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="ml-4 px-6 py-2 border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black font-bold text-sm tracking-wider transition-all duration-300 uppercase relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <ArrowDown className="w-4 h-4" />
                                    Download_CV
                                </span>
                                <div className="absolute inset-0 bg-[var(--primary)]/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out"></div>
                            </motion.a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-all"
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-[var(--primary)]"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <ScrollLink
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-3 text-[var(--primary)] hover:bg-[var(--primary)]/10 border-l-2 border-transparent hover:border-[var(--primary)] transition-all font-mono text-sm uppercase tracking-widest cursor-pointer"
                                >
                                    {`> ${link.name}`}
                                </ScrollLink>
                            ))}
                            <a
                                href={config.profile.resumeLink}
                                className="block mt-4 text-center py-3 border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black font-bold uppercase tracking-widest transition-all"
                            >
                                [ DOWNLOAD_CV ]
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
