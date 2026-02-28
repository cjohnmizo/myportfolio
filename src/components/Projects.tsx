"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ArrowRight } from "lucide-react";
import Image from "next/image";
import { config } from "@/data/config";
import SpotlightCard from "./ui/SpotlightCard";

const Projects = () => {
    return (
        <section id="projects" className="py-16 sm:py-24 md:py-32 relative">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:auto-rows-[360px]">
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
                                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-30 group-hover:opacity-20"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-[var(--card-bg)]/50 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                                    <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                                        {/* Badges - Minimal */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-2.5 py-1 text-xs font-medium border border-[var(--card-border)] text-[var(--fg-secondary)]">
                                                {project.year}
                                            </span>
                                            <span className={`px-2.5 py-1 text-xs font-medium border ${project.status === "Live"
                                                ? "border-emerald-500 text-emerald-400"
                                                : "border-[var(--card-border)] text-[var(--fg-secondary)]"
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg sm:text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[var(--fg-secondary)] mb-5 line-clamp-2 max-w-md text-sm">
                                            {project.description}
                                        </p>

                                        {/* Tags & Links */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1.5 flex-wrap">
                                                {project.tags.slice(0, 3).map((tag) => (
                                                    <span key={tag} className="px-2 py-1 text-[11px] font-medium text-[var(--fg-muted)] border border-[var(--card-border)]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex-1" />
                                            {project.links.docs && (
                                                <a
                                                    href={project.links.docs}
                                                    className="flex items-center gap-1 text-xs font-medium text-[var(--fg)] hover:text-[var(--accent)] transition-colors group/link"
                                                >
                                                    More
                                                    <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                                                </a>
                                            )}
                                            <div className="flex gap-2">
                                                <a
                                                    href={project.links.code}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 border border-[var(--card-border)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                                                >
                                                    <Github size={16} />
                                                </a>
                                                <a
                                                    href={project.links.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 border border-[var(--card-border)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
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
