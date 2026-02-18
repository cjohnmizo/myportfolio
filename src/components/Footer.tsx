"use client";

import { config } from "@/data/config";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
    const footerLinks = [
        { name: "Services", to: "services" },
        { name: "Projects", to: "projects" },
        { name: "About", to: "about" },
        { name: "Contact", to: "contact" },
    ];

    return (
        <footer className="py-12 bg-[var(--bg)] border-t border-[var(--divider)] relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center shadow-[4px_4px_10px_rgba(0,0,0,0.2)] border-2 border-white/20 transform rotate-3">
                            <span
                                className="text-white text-sm font-black"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                CJ
                            </span>
                        </div>
                        <span
                            className="text-lg tracking-tight text-[var(--fg)] font-black"
                        >
                            <span className="text-[var(--accent)]">c</span>
                            john
                            <span className="text-[var(--accent-secondary)]">mizo</span>
                        </span>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                        {footerLinks.map((link) => (
                            <ScrollLink
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                className="text-sm font-bold text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer hover:scale-105 transform"
                            >
                                {link.name}
                            </ScrollLink>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-3">
                        {config.profile.socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[var(--card-bg)] shadow-md flex items-center justify-center text-[var(--fg-secondary)] hover:text-white hover:bg-[var(--accent)] hover:-translate-y-1 transition-all border border-[var(--card-border)]"
                                aria-label={social.name}
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 pt-8 border-t border-[var(--divider)] text-center">
                    <p className="text-[var(--fg-muted)] text-xs opacity-60">
                        © {new Date().getFullYear()} {config.profile.name}. All Rights Reserved. · <a href="https://github.com/cjohnmizo/myportfolio" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors underline decoration-dotted">Source Code</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
