"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ───────────────────────────────────────────
   Mouse parallax hook
   ─────────────────────────────────────────── */

function useMouseParallax(strength = 30) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            setOffset({
                x: ((e.clientX - cx) / cx) * strength,
                y: ((e.clientY - cy) / cy) * strength,
            });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [strength]);

    return offset;
}

/* ───────────────────────────────────────────
   Clay Coding Symbols
   ─────────────────────────────────────────── */

interface ClaySymbolProps {
    symbol: React.ReactNode;
    size?: number;
    color?: string;
    className?: string;
    rotate?: number;
    delay?: number;
}

const ClaySymbol = ({ symbol, size = 60, color = "var(--accent)", className = "", rotate = 0, delay = 0 }: ClaySymbolProps) => (
    <motion.div
        className={`flex items-center justify-center font-black rounded-3xl ${className}`}
        style={{
            width: size,
            height: size,
            background: color,
            color: "rgba(255,255,255,0.9)",
            fontSize: size * 0.5,
            fontFamily: "var(--font-heading)",
            boxShadow: "inset 6px 6px 12px rgba(255,255,255,0.4), inset -6px -6px 12px rgba(0,0,0,0.1), 10px 10px 20px rgba(0,0,0,0.15)",
        }}
        initial={{ rotate: rotate }}
        animate={{
            y: [0, -15, 0],
            rotate: [rotate, rotate + 5, rotate],
            scale: [1, 1.05, 1]
        }}
        transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
    >
        {symbol}
    </motion.div>
);

/* ───────────────────────────────────────────
   Main Export — Hero 3D Illustrations
   ─────────────────────────────────────────── */

const Hero3DElements = () => {
    const mouse = useMouseParallax(40);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

            {/* Top Left: Curly Brackets */}
            <motion.div
                className="absolute top-[18%] left-[10%] hidden md:block"
                animate={{ x: mouse.x * 0.8, y: mouse.y * 0.8 }}
            >
                <ClaySymbol symbol="{ }" size={80} color="var(--accent)" rotate={-10} />
            </motion.div>

            {/* Top Right: Tag */}
            <motion.div
                className="absolute top-[22%] right-[10%] hidden md:block"
                animate={{ x: mouse.x * -0.5, y: mouse.y * -0.5 }}
            >
                <ClaySymbol symbol="</>" size={90} color="var(--accent-secondary)" rotate={15} delay={1} />
            </motion.div>

            {/* Bottom Left: Hash */}
            <motion.div
                className="absolute bottom-[20%] left-[8%] hidden lg:block"
                animate={{ x: mouse.x * 0.4, y: mouse.y * 0.6 }}
            >
                <ClaySymbol symbol="#" size={70} color="var(--accent-secondary)" rotate={-5} delay={0.5} />
            </motion.div>

            {/* Bottom Right: Terminal Prompt */}
            <motion.div
                className="absolute bottom-[18%] right-[15%] hidden md:block"
                animate={{ x: mouse.x * -0.6, y: mouse.y * -0.4 }}
            >
                <ClaySymbol symbol=">_" size={85} color="var(--accent)" rotate={10} delay={1.5} />
            </motion.div>

            {/* Scattered micro particles (now syntax chars) */}
            {[
                { top: "30%", left: "25%", char: ";", color: "var(--fg-secondary)" },
                { top: "60%", right: "30%", char: "&&", color: "var(--accent)" },
                { top: "40%", right: "20%", char: "||", color: "var(--accent-secondary)" },
                { bottom: "35%", left: "35%", char: "()", color: "var(--fg-muted)" },
            ].map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute font-bold opacity-60"
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        bottom: item.bottom,
                        color: item.color,
                        fontSize: "24px",
                        fontFamily: "monospace",
                        textShadow: "2px 2px 0px rgba(0,0,0,0.1)"
                    }}
                    animate={{
                        x: mouse.x * (0.3 + i * 0.1),
                        y: mouse.y * (0.3 + i * 0.1),
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: i }}
                >
                    {item.char}
                </motion.div>
            ))}
        </div>
    );
};

export default Hero3DElements;
