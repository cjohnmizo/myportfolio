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
                className="absolute -top-20 -right-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-[0.04]"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] blur-[100px] sm:blur-[140px]" />
            </motion.div>

            {/* ── Accent orb 2 — mid-left, violet tint ── */}
            <motion.div
                style={{ y: y2 }}
                className="absolute top-[40%] -left-32 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full opacity-[0.03]"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[var(--accent-secondary)] to-transparent blur-[120px]" />
            </motion.div>

            {/* ── Accent orb 3 — bottom-right ── */}
            <motion.div
                style={{ y: y3 }}
                className="absolute top-[70%] -right-20 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full opacity-[0.03]"
            >
                <div className="w-full h-full rounded-full bg-gradient-to-bl from-[var(--accent)] to-transparent blur-[120px]" />
            </motion.div>

            {/* ── Floating ring — mid-page ── */}
            <motion.div
                style={{ y: y4 }}
                className="absolute top-[55%] left-[8%] hidden sm:block"
            >
                <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[var(--accent)]/10 float-slow"
                    style={{
                        boxShadow: "inset 0 0 20px rgba(99,102,241,0.03)",
                    }}
                />
            </motion.div>

            {/* ── Floating diamond — top-left ── */}
            <motion.div
                style={{ y: y5 }}
                className="absolute top-[25%] right-[12%] hidden sm:block"
            >
                <div
                    className="w-4 h-4 md:w-5 md:h-5 border border-[var(--accent-secondary)]/15 float-reverse opacity-40"
                    style={{ transform: "rotate(45deg)" }}
                />
            </motion.div>

            {/* ── Tiny crosses scattered ── */}
            {[
                { top: "18%", left: "85%", delay: "0s" },
                { top: "48%", left: "92%", delay: "2s" },
                { top: "78%", left: "5%", delay: "1s" },
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    style={{ y: i === 0 ? y3 : i === 1 ? y5 : y1 }}
                    className="absolute hidden md:block float-slow opacity-20"
                    data-style-delay={pos.delay}
                >
                    <div
                        className="text-[var(--accent)]"
                        style={{
                            position: "absolute",
                            top: pos.top,
                            left: pos.left,
                            fontSize: "10px",
                            fontFamily: "monospace",
                            animationDelay: pos.delay,
                        }}
                    >
                        +
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingAccents;
