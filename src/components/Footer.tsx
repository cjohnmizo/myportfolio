"use client";

import { motion } from "framer-motion";

import { config } from "@/data/config";

const Footer = () => {
    return (
        <footer className="py-8 glass border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono gradient-text tracking-tight">{config.profile.shortName}</span>
                        <span className="text-gray-500 text-sm font-mono">© {new Date().getFullYear()}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {config.profile.socials.map(({ href, icon: Icon }) => (
                            <motion.a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, y: -3 }}
                                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                            >
                                <Icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
