"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Subtle floating accent shapes scattered behind page content.
 * Uses scroll-based parallax so shapes move at different speeds,
 * creating a layered depth effect as the user scrolls.
 */

const FloatingAccents = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Individual parallax speeds
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, -160]);
    const y5 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
        >
            {/* ── Accent orb 1 — top-right, large soft glow ── */}
            <motion.div
                style={{ y: y1 }}
                className="absolute -top-20 -right-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-[0.06]"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] blur-[100px] sm:blur-[140px]" />
            </motion.div>

            {/* ── Accent orb 2 — mid-left, violet tint ── */}
            <motion.div
                style={{ y: y2 }}
                className="absolute top-[40%] -left-32 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full opacity-[0.04]"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[var(--accent-secondary)] to-transparent blur-[120px]" />
            </motion.div>

            {/* ── Floating Code Button 1 — mid-page ── */}
            <motion.div
                style={{ y: y4 }}
                className="absolute top-[55%] left-[8%] hidden sm:flex items-center justify-center opacity-60"
            >
                <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[var(--accent)] float-slow flex items-center justify-center text-white font-black text-2xl font-mono shadow-[inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-4px_-4px_8px_rgba(0,0,0,0.1),8px_8px_16px_rgba(0,0,0,0.1)]"
                >
                    {"{ }"}
                </div>
            </motion.div>

            {/* ── Floating Code Button 2 — top-left ── */}
            <motion.div
                style={{ y: y5 }}
                className="absolute top-[25%] right-[12%] hidden sm:flex items-center justify-center opacity-50"
            >
                <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--accent-secondary)] float-reverse flex items-center justify-center text-white font-black text-xl font-mono shadow-[inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-4px_-4px_8px_rgba(0,0,0,0.1),8px_8px_16px_rgba(0,0,0,0.1)]"
                    style={{ transform: "rotate(15deg)" }}
                >
                    &lt;/&gt;
                </div>
            </motion.div>

            {/* ── Syntax chars scattered ── */}
            {[
                { top: "18%", left: "85%", delay: "0s", char: "!==" },
                { top: "48%", left: "92%", delay: "2s", char: "=>" },
                { top: "78%", left: "5%", delay: "1s", char: "++" },
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    style={{ y: i === 0 ? y3 : i === 1 ? y5 : y1 }}
                    className="absolute hidden md:block float-slow opacity-30"
                    data-style-delay={pos.delay}
                >
                    <div
                        className="text-[var(--accent)] font-black text-lg font-mono"
                        style={{
                            position: "absolute",
                            top: pos.top,
                            left: pos.left,
                            animationDelay: pos.delay,
                        }}
                    >
                        {pos.char}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingAccents;
