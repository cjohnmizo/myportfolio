"use client";

import { motion } from "framer-motion";

const skills = [
    {
        category: "Mobile_Dev_Module",
        items: [
            { name: "Flutter", level: 90 },
            { name: "Dart", level: 85 },
            { name: "Android SDK", level: 80 },
            { name: "iOS Dev", level: 75 }
        ],
        icon: "smartphone"
    },
    {
        category: "Web_Core_Systems",
        items: [
            { name: "React / Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Tailwind CSS", level: 95 },
            { name: "Node.js", level: 85 }
        ],
        icon: "globe"
    },
    {
        category: "Backend_ Infrastructure",
        items: [
            { name: "Supabase / Firebase", level: 88 },
            { name: "PostgreSQL", level: 80 },
            { name: "Cloudflare", level: 75 },
            { name: "API Design", level: 85 }
        ],
        icon: "cloud"
    },
    {
        category: "DevOps_&_Tools",
        items: [
            { name: "Git / GitHub", level: 92 },
            { name: "Docker", level: 70 },
            { name: "Figma", level: 80 },
            { name: "Linux", level: 75 }
        ],
        icon: "tool"
    },
];

const SkillBar = ({ name, level, delay }: { name: string, level: number, delay: number }) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between text-xs font-mono mb-1 text-[var(--primary)] opacity-80">
                <span>&gt; {name}</span>
                <span>{level}%</span>
            </div>
            <div className="h-2 w-full bg-slate-900 border border-slate-800 relative overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    transition={{ duration: 1, delay: delay, ease: "circOut" }}
                    viewport={{ once: true }}
                    className="h-full bg-[var(--primary)] relative"
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
                {/* Grid lines on bar */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_2px,#000_2px)] bg-[size:10px_100%] opacity-30" />
            </div>
        </div>
    );
};

function SkillCard({ skillGroup, index }: { skillGroup: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-black/80 border border-[var(--primary)]/30 p-6 hover:border-[var(--primary)] transition-all duration-300 overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-[var(--primary)]" />
                    <div className="w-1 h-1 bg-[var(--primary)]" />
                    <div className="w-1 h-1 bg-[var(--primary)]" />
                </div>
            </div>

            <h3 className="text-lg font-bold font-mono text-white mb-6 border-b border-[var(--primary)]/30 pb-2 flex items-center gap-2">
                <span className="text-[var(--secondary)]">./</span>
                {skillGroup.category}
            </h3>

            <div className="space-y-4">
                {skillGroup.items.map((item: any, i: number) => (
                    <SkillBar key={item.name} name={item.name} level={item.level} delay={index * 0.1 + i * 0.1} />
                ))}
            </div>

            {/* Corner Accents */}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-t border-l border-[var(--primary)] bg-black rotate-180" />
        </motion.div>
    );
}

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-black relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,10,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,10,0,1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-start mb-16 border-l-4 border-[var(--primary)] pl-6"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                        SYSTEM_<span className="text-[var(--primary)]">CAPABILITIES</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm md:text-base max-w-2xl">
                        // LOADING_DRIVER_MODULES...<br />
                        // ANALYZING_TECHNICAL_PROFICIENCY...
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {skills.map((skillGroup, index) => (
                        <SkillCard key={skillGroup.category} skillGroup={skillGroup} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
