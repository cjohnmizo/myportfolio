"use client";

import { motion } from "framer-motion";

/**
 * Animated divider with floating geometric accents.
 * Place between sections for visual rhythm.
 *
 * variant: "dots" | "wave" | "geometric"
 */

type Variant = "dots" | "wave" | "geometric";

const SectionDivider = ({ variant = "dots" }: { variant?: Variant }) => {
    return (
        <div className="relative w-full overflow-hidden py-6 sm:py-10">
            {variant === "dots" && <DotsDivider />}
            {variant === "wave" && <WaveDivider />}
            {variant === "geometric" && <GeometricDivider />}
        </div>
    );
};

/* ─── Dots ──────────────────────────────────── */
const DotsDivider = () => (
    <div className="flex items-center justify-center gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
                viewport={{ once: true }}
                className="rounded-full"
                style={{
                    width: i === 2 ? 12 : i === 1 || i === 3 ? 8 : 6,
                    height: i === 2 ? 12 : i === 1 || i === 3 ? 8 : 6,
                    background:
                        i === 2
                            ? "var(--accent)"
                            : "var(--card-border)",
                    boxShadow:
                        i === 2
                            ? "inset -2px -2px 4px rgba(0,0,0,0.2), inset 2px 2px 4px rgba(255,255,255,0.4), 0 4px 8px rgba(99,102,241,0.3)"
                            : "inset 1px 1px 2px rgba(0,0,0,0.1)",
                }}
            />
        ))}
    </div>
);

/* ─── Wave ──────────────────────────────────── */
const WaveDivider = () => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center"
    >
        <svg
            width="200"
            height="20"
            viewBox="0 0 200 20"
            fill="none"
            className="text-[var(--accent)] opacity-30"
        >
            <path
                d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
            />
        </svg>
    </motion.div>
);

/* ─── Geometric ────────────────────────────── */
const GeometricDivider = () => (
    <div className="flex items-center justify-center gap-4">
        {/* Left line */}
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[var(--accent)] opacity-30 origin-left"
        />

        {/* Center diamond */}
        <motion.div
            initial={{ opacity: 0, rotate: 0, scale: 0 }}
            whileInView={{ opacity: 1, rotate: 45, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="w-3 h-3 border border-[var(--accent)] opacity-50"
            style={{ boxShadow: "0 0 8px rgba(99,102,241,0.3)" }}
        />

        {/* Right line */}
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[var(--accent)] opacity-30 origin-right"
        />
    </div>
);

export default SectionDivider;
