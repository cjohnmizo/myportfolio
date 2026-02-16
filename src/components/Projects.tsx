"use client";

"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

import { config } from "@/data/config";

function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-black border border-white/10 hover:border-[var(--secondary)] transition-all duration-300 overflow-hidden flex flex-col"
        >
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:4px_4px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Image Section */}
            <div className="relative h-48 overflow-hidden border-b border-white/10 group-hover:border-[var(--secondary)]/50 transition-colors">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0"
                />

                {/* Status Tag */}
                <div className="absolute top-2 right-2 bg-black/80 border border-[var(--secondary)] text-[var(--secondary)] text-[10px] px-2 py-0.5 font-mono">
                    [{project.status}]
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-mono text-white mb-2 group-hover:text-[var(--secondary)] transition-colors flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[var(--primary)]" />
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 font-mono leading-relaxed border-l border-[var(--primary)]/30 pl-3">
                    {project.description}
                </p>

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag: string) => (
                            <span key={tag} className="text-[10px] items-center flex gap-1 font-mono text-[var(--secondary)] px-1 border border-[var(--secondary)]/30 bg-[var(--secondary)]/5">
                                <Code2 className="w-3 h-3" /> {tag.toUpperCase()}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                        <a href={project.links.code} className="text-xs font-bold text-gray-500 hover:text-[var(--primary)] uppercase tracking-wider flex items-center gap-1 transition-colors">
                            <Github className="w-4 h-4" /> Source_Code
                        </a>
                        <a href={project.links.demo} className="text-xs font-bold text-gray-500 hover:text-[var(--secondary)] uppercase tracking-wider flex items-center gap-1 transition-colors">
                            <ExternalLink className="w-4 h-4" /> Live_Uplink
                        </a>
                    </div>
                </div>
            </div>

            {/* Corner Decor */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--secondary)] opacity-50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--secondary)] opacity-50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--secondary)] opacity-50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--secondary)] opacity-50" />
        </motion.div>
    );
}

const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[var(--primary)]/20 pb-4"
                >
                    <div>
                        <div className="text-[var(--primary)] font-mono text-sm mb-2">&gt; SELECT * FROM PORTFOLIO_DB</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{config.projects.title.split('_')[0]}_<span className="text-[var(--primary)]">{config.projects.title.split('_')[1]}</span></h2>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-gray-500 text-sm font-mono">
                            // TOTAL_ENTRIES: {config.projects.items.length}<br />
                            // STATUS: DECLASSIFIED
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {config.projects.items.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
