"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Vocational Teacher (IT and ITeS)",
    period: "Present",
    company: "Government of Mizoram",
    description:
      "Training students in data operations, digital literacy, and applied software workflows for employment readiness.",
  },
  {
    title: "IT Consultant and Developer",
    period: "2018 - Present",
    company: "Freelance",
    description:
      "Delivering mobile and web solutions for local communities and businesses with an emphasis on maintainable architecture.",
  },
  {
    title: "Technical Assistant",
    period: "2023",
    company: "P&V Eastern Engineers",
    description:
      "Supported engineering teams with technical operations and contributed to planning and execution workflows.",
  },
];

const projects = [
  {
    name: "Liankhawpui",
    stack: "Flutter, Firebase, Android",
    description:
      "Community-focused app for local news, directory listings, and essential updates for Khawlian Village.",
  },
  {
    name: "E-Commerce Dashboard",
    stack: "React, Next.js, Tailwind",
    description:
      "Operations dashboard for product, order, and analytics management with a responsive admin UX.",
  },
];

const skillGroups = [
  {
    name: "Mobile",
    items: ["Flutter", "Dart", "Android SDK", "iOS"],
  },
  {
    name: "Web",
    items: ["React", "Next.js", "Laravel", "WordPress", "Shopify", "Tailwind"],
  },
  {
    name: "Backend and Cloud",
    items: ["Supabase", "Firebase", "Node.js", "Appwrite"],
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen px-4 pb-12 pt-28 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)] print:hidden"
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>

        <article className="rounded-2xl border border-[var(--line)] bg-white p-6 text-slate-900 shadow-[0_16px_48px_-32px_rgba(15,23,42,0.45)] print:rounded-none print:border-0 print:p-0 print:shadow-none sm:p-10">
          <header className="border-b border-slate-200 pb-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-300">
                  <Image src="/profile.jpg" alt="C. John Remthang" fill className="object-cover" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">C. John Remthang</h1>
                  <p className="mt-1 text-sm uppercase tracking-[0.08em] text-slate-500">
                    Full-Stack Developer and IT Educator
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <a href="mailto:johnchangsan39@gmail.com" className="flex items-center gap-2 hover:text-slate-900">
                  <Mail size={14} />
                  johnchangsan39@gmail.com
                </a>
                <p className="flex items-center gap-2">
                  <MapPin size={14} />
                  Khawlian, Mizoram
                </p>
                <div className="flex items-center gap-4 print:hidden">
                  <a
                    href="https://github.com/cjohnmizo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-slate-900"
                  >
                    <Github size={14} /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/c-john-remthang/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-slate-900"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </header>

          <button
            onClick={() => window.print()}
            className="button-primary mt-6 print:hidden"
          >
            Download PDF
            <Download size={15} />
          </button>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-8">
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Experience</h2>
                <div className="mt-4 space-y-5">
                  {experiences.map((item) => (
                    <article key={item.title}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                        <span className="text-xs uppercase tracking-[0.08em] text-slate-500">{item.period}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-slate-700">{item.company}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Key Projects</h2>
                <div className="mt-4 space-y-4">
                  {projects.map((project) => (
                    <article key={project.name}>
                      <h3 className="text-base font-semibold text-slate-900">{project.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{project.stack}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{project.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Education</h2>
                <div className="mt-4 space-y-4 text-sm text-slate-700">
                  <p>
                    <strong>Industrial Training and Cyber Security</strong>
                    <br />
                    82% Score
                  </p>
                  <p>
                    <strong>Master of Computer Application</strong>
                    <br />
                    74% Score
                  </p>
                  <p>
                    <strong>Bachelor of Computer Application</strong>
                    <br />
                    70% Score
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Technical Skills</h2>
                <div className="mt-4 space-y-4">
                  {skillGroups.map((group) => (
                    <article key={group.name}>
                      <h3 className="text-sm font-semibold text-slate-800">{group.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span key={item} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
                            {item}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <footer className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-500">
            Generated from cjohnmizo.vercel.app
          </footer>
        </article>
      </div>
    </div>
  );
}
