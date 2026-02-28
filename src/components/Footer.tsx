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
        <footer className="py-12 bg-[var(--bg)] border-t border-[var(--card-border)] relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 border border-[var(--accent)]">
                            <span
                                className="text-[var(--accent)] text-xs font-bold flex items-center justify-center h-full"
                            >
                                CJ
                            </span>
                        </div>
                        <span
                            className="text-sm tracking-tight text-[var(--fg)] font-bold"
                        >
                            cjohnmizo
                        </span>
                    </div>

                    {/* Nav Links - Minimal */}
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                        {footerLinks.map((link) => (
                            <ScrollLink
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                className="text-xs font-medium text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                            >
                                {link.name}
                            </ScrollLink>
                        ))}
                    </div>

                    {/* Socials - Minimal */}
                    <div className="flex items-center gap-3">
                        {config.profile.socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 border border-[var(--card-border)] flex items-center justify-center text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all"
                                aria-label={social.name}
                            >
                                <social.icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-[var(--card-border)] text-center">
                    <p className="text-[var(--fg-muted)] text-xs">
                        © {new Date().getFullYear()} {config.profile.name}. All Rights Reserved. · <a href="https://github.com/cjohnmizo/myportfolio" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">Source Code</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
