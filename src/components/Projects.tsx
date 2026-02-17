"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { config } from "@/data/config";
import SpotlightCard from "./ui/SpotlightCard";

const Projects = () => {
    return (
        <section id="projects" className="py-16 sm:py-24 md:py-32 relative bg-[var(--bg-secondary)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="section-subtitle mb-4 block">Portfolio</span>
                    <h2 className="section-heading">
                        Selected <span className="accent">Works</span>
                    </h2>
                </motion.div>

                {/* Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:auto-rows-[380px]">
                    {config.projects.items.map((project, index) => (
                        <SpotlightCard
                            key={project.title}
                            className={`group min-h-[280px] md:min-h-0 ${index === 0 ? "md:col-span-2" : ""}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="h-full"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-30"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-[var(--card-bg)]/70 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-7">
                                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                                        {/* Badges */}
                                        <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <span className="px-3 py-1 text-xs font-bold rounded-lg bg-[var(--bg-secondary)]/80 backdrop-blur-md text-[var(--fg-secondary)] border border-[var(--card-border)]">
                                                {project.year}
                                            </span>
                                            <span className={`px-3 py-1 text-xs font-bold rounded-lg backdrop-blur-md border border-[var(--card-border)] ${project.status === "Live"
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "bg-[var(--bg-secondary)]/80 text-[var(--fg-secondary)]"
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-[var(--fg)] mb-2">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[var(--fg-secondary)] mb-5 line-clamp-2 max-w-md text-sm">
                                            {project.description}
                                        </p>

                                        {/* Tags & Links */}
                                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            <div className="flex gap-2">
                                                {project.tags.slice(0, 3).map((tag) => (
                                                    <span key={tag} className="text-xs text-[var(--fg-muted)] font-mono">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex-1" />
                                            <div className="flex gap-2">
                                                <a
                                                    href={project.links.code}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--fg-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                                                >
                                                    <Github size={16} />
                                                </a>
                                                <a
                                                    href={project.links.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--fg-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                                                >
                                                    <ArrowUpRight size={16} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
