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
        <footer className="py-10 bg-[var(--bg)] border-t border-[var(--divider)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center shadow-md">
                            <span
                                className="text-white text-xs font-bold"
                                style={{ fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
                            >
                                &lt;/&gt;
                            </span>
                        </div>
                        <span
                            className="text-base tracking-tight text-[var(--fg)] font-medium"
                            style={{ fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
                        >
                            <span className="text-[var(--accent)]">{'{'}</span>
                            {' '}{config.profile.shortName}{' '}
                            <span className="text-[var(--accent)]">{'}'}</span>
                        </span>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {footerLinks.map((link) => (
                            <ScrollLink
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors cursor-pointer"
                            >
                                {link.name}
                            </ScrollLink>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-2">
                        {config.profile.socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--accent)] hover:bg-[var(--spotlight)] transition-all"
                                aria-label={social.name}
                            >
                                <social.icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-[var(--divider)] text-center">
                    <p className="text-[var(--fg-muted)] text-xs tracking-wide">
                        © {new Date().getFullYear()} {config.profile.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
