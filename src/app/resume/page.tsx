"use client";

import { Mail, MapPin, Github, Linkedin, ArrowDown } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-[var(--bg)] py-12 px-4 sm:px-6 lg:px-8">
            {/* Back Link */}
            <div className="max-w-4xl mx-auto mb-6">
                <Link
                    href="/"
                    className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                >
                    ← Back to Portfolio
                </Link>
            </div>

            {/* Resume Document — always white background for print fidelity */}
            <div className="max-w-4xl mx-auto bg-white text-gray-900 p-8 md:p-12 shadow-xl rounded-xl print:p-0 print:shadow-none print:max-w-none">

                {/* Header */}
                <header className="border-b-2 border-gray-800 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800 flex-shrink-0 print:w-20 print:h-20">
                            <img
                                src="/profile.jpg"
                                alt="C. John Remthang"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight uppercase mb-2">
                                C. John Remthang
                            </h1>
                            <p className="text-xl text-gray-600 font-mono">
                                Full-Stack Developer & IT Educator
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                        <a
                            href="mailto:johnchangsan39@gmail.com"
                            className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
                        >
                            <Mail className="w-4 h-4" /> johnchangsan39@gmail.com
                        </a>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" /> Khawlian, Mizoram
                        </div>
                        <div className="flex items-center gap-4 mt-2 print:hidden">
                            <a
                                href="https://github.com/cjohnmizo/"
                                target="_blank"
                                className="flex items-center gap-1 hover:text-indigo-600"
                            >
                                <Github className="w-4 h-4" /> GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/c-john-remthang/"
                                target="_blank"
                                className="flex items-center gap-1 hover:text-indigo-600"
                            >
                                <Linkedin className="w-4 h-4" /> LinkedIn
                            </a>
                        </div>
                    </div>
                </header>

                {/* Print Button */}
                <button
                    onClick={() => window.print()}
                    className="mb-8 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors print:hidden font-mono text-sm"
                >
                    <ArrowDown className="w-4 h-4" /> Download PDF
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Experience */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
                                Experience
                            </h2>

                            <div className="mb-6">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">Vocational Teacher (IT & ITeS)</h3>
                                    <span className="text-sm font-mono text-gray-500">Present</span>
                                </div>
                                <div className="text-indigo-600 font-medium mb-2">Government of Mizoram</div>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    Training students in Domestic Data Entry Operations, fostering digital literacy, and preparing the workforce for the IT sector.
                                </p>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">IT Consultant & Developer</h3>
                                    <span className="text-sm font-mono text-gray-500">2018 - Present</span>
                                </div>
                                <div className="text-emerald-600 font-medium mb-2">Freelance</div>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    Architecting mobile and web solutions for local businesses and communities. Specializing in cross-platform development with Flutter and modern web stacks.
                                </p>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">Technical Assistant</h3>
                                    <span className="text-sm font-mono text-gray-500">2023</span>
                                </div>
                                <div className="text-blue-600 font-medium mb-2">P&V Eastern Engineers</div>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    Provided technical support and assistance in engineering projects, contributing to project planning and execution.
                                </p>
                            </div>
                        </section>

                        {/* Projects */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
                                Key Projects
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold">Liankhawpui</h3>
                                    <p className="text-sm text-gray-600 italic mb-1">Flutter, Firebase, Android</p>
                                    <p className="text-sm text-gray-700">
                                        A community-focused directory and news application for Khawlian Village, bridging the information gap.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold">E-Commerce Dashboard</h3>
                                    <p className="text-sm text-gray-600 italic mb-1">React, Next.js, Tailwind</p>
                                    <p className="text-sm text-gray-700">
                                        Comprehensive dashboard for managing products, orders, and analytics.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Education */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
                                Education
                            </h2>
                            <div className="mb-4">
                                <div className="font-bold">Industrial Training & Cyber Security</div>
                                <div className="text-sm text-gray-600">82% Score</div>
                            </div>
                            <div className="mb-4">
                                <div className="font-bold">Master of Computer Application</div>
                                <div className="text-sm text-gray-600">74% Score</div>
                            </div>
                            <div className="mb-4">
                                <div className="font-bold">Bachelor of Computer Application</div>
                                <div className="text-sm text-gray-600">70% Score</div>
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
                                Technical Skills
                            </h2>
                            <div className="mb-4">
                                <h3 className="font-bold text-sm text-gray-800 mb-1">Mobile</h3>
                                <div className="flex flex-wrap gap-1">
                                    {["Flutter", "Dart", "Android SDK", "iOS"].map((s) => (
                                        <span key={s} className="px-2 py-1 bg-gray-100 text-xs rounded">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-bold text-sm text-gray-800 mb-1">Web</h3>
                                <div className="flex flex-wrap gap-1">
                                    {["React", "Next.js", "Laravel", "WordPress", "Shopify", "Tailwind"].map((s) => (
                                        <span key={s} className="px-2 py-1 bg-gray-100 text-xs rounded">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-bold text-sm text-gray-800 mb-1">Backend & Cloud</h3>
                                <div className="flex flex-wrap gap-1">
                                    {["Supabase", "Firebase", "Node.js", "Appwrite"].map((s) => (
                                        <span key={s} className="px-2 py-1 bg-gray-100 text-xs rounded">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <footer className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-500 print:mt-auto">
                    <p>Generated dynamically from cjohnmizo.vercel.app</p>
                </footer>
            </div>
        </div>
    );
}
