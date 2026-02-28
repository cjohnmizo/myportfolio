"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { config } from "@/data/config";
import SpotlightCard from "./ui/SpotlightCard";

const hasLink = (value?: string) => Boolean(value && value.trim() && value.trim() !== "#");

const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="projects" className="relative">
      <div className="section-shell">
        <div className="mb-12">
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title">Selected work with measurable impact.</h2>
          <p className="section-copy">A focused set of products built for real users, with strong execution on architecture, usability, and performance.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {config.projects.items.map((project, index) => {
            const isOpen = openIndex === index;

            return (
              <SpotlightCard
                key={project.title}
                className={`h-full overflow-hidden ${index === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="relative aspect-[16/10] border-b border-[var(--line)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="chip border-white/45 bg-white/10 text-white">{project.year}</span>
                    <span className="chip border-white/45 bg-white/10 text-white">{project.status}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-[var(--fg)]">{project.title}</h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleOpen(index)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]"
                    aria-expanded={isOpen}
                    aria-controls={`project-brief-${index}`}
                  >
                    {isOpen ? "Hide brief" : "View brief"}
                    <ChevronDown size={15} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`project-brief-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm leading-7 text-[var(--fg-soft)]">{project.description}</p>

                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          {hasLink(project.links.docs) &&
                            (project.links.docs.startsWith("/") ? (
                              <Link href={project.links.docs} className="button-secondary !px-3.5 !py-2 text-xs">
                                Case Study
                                <ExternalLink size={14} />
                              </Link>
                            ) : (
                              <a
                                href={project.links.docs}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button-secondary !px-3.5 !py-2 text-xs"
                              >
                                Case Study
                                <ExternalLink size={14} />
                              </a>
                            ))}

                          {hasLink(project.links.demo) && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="button-primary !px-3.5 !py-2 text-xs"
                            >
                              Live
                              <ArrowUpRight size={14} />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
