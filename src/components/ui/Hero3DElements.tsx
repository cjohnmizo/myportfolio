"use client";

import { useEffect, useRef, useState } from "react";
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
   Isometric 3D Cube (Pure CSS faces)
   ─────────────────────────────────────────── */

const IsoCube = ({ size = 60, className = "" }: { size?: number; className?: string }) => {
    const half = size / 2;
    return (
        <div className={`${className}`} style={{ width: size, height: size, perspective: "600px" }}>
            <div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d", transform: "rotateX(-25deg) rotateY(45deg)" }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-xl border border-[var(--accent)]/20"
                    style={{
                        transform: `translateZ(${half}px)`,
                        background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
                        backdropFilter: "blur(4px)",
                    }}
                />
                {/* Back */}
                <div
                    className="absolute inset-0 rounded-xl border border-[var(--accent)]/10"
                    style={{
                        transform: `translateZ(-${half}px) rotateY(180deg)`,
                        background: "rgba(99,102,241,0.05)",
                    }}
                />
                {/* Right */}
                <div
                    className="absolute inset-0 rounded-xl border border-[var(--accent-secondary)]/15"
                    style={{
                        transform: `rotateY(90deg) translateZ(${half}px)`,
                        background: "linear-gradient(180deg, rgba(139,92,246,0.1), rgba(99,102,241,0.04))",
                        backdropFilter: "blur(2px)",
                    }}
                />
                {/* Left */}
                <div
                    className="absolute inset-0 rounded-xl border border-[var(--accent)]/10"
                    style={{
                        transform: `rotateY(-90deg) translateZ(${half}px)`,
                        background: "rgba(139,92,246,0.06)",
                    }}
                />
                {/* Top */}
                <div
                    className="absolute inset-0 rounded-xl border border-[var(--accent)]/20"
                    style={{
                        transform: `rotateX(90deg) translateZ(${half}px)`,
                        background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))",
                        backdropFilter: "blur(6px)",
                    }}
                />
                {/* Bottom */}
                <div
                    className="absolute inset-0 rounded-xl border border-[var(--accent)]/5"
                    style={{
                        transform: `rotateX(-90deg) translateZ(${half}px)`,
                        background: "rgba(0,0,0,0.04)",
                    }}
                />
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────
   3D Ring / Torus
   ─────────────────────────────────────────── */

const Ring3D = ({ className = "" }: { className?: string }) => (
    <div className={className} style={{ perspective: "500px" }}>
        <div
            className="w-24 h-24 rounded-full border-[3px] border-[var(--accent-secondary)]/20"
            style={{
                transform: "rotateX(65deg) rotateZ(15deg)",
                boxShadow: "0 0 20px rgba(139,92,246,0.08), inset 0 0 20px rgba(139,92,246,0.04)",
            }}
        />
    </div>
);

/* ───────────────────────────────────────────
   Morphing Blob
   ─────────────────────────────────────────── */

const MorphBlob = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 200" width="160" height="160">
        <defs>
            <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.06" />
            </linearGradient>
        </defs>
        <path fill="url(#blobGrad)" stroke="var(--accent)" strokeWidth="0.5" strokeOpacity="0.15">
            <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
                    M44.5,-76.3C56.4,-69.5,64.2,-54.8,71.3,-40.5C78.4,-26.1,84.7,-12.1,83.6,1.2C82.5,14.5,74,29,63.9,40.3C53.8,51.6,42.1,59.7,29.2,65.9C16.3,72.1,2.2,76.4,-12.6,76.1C-27.4,75.8,-42.9,71,-54.3,61.5C-65.7,52,-72.9,37.9,-77.2,22.7C-81.5,7.5,-82.8,-8.8,-78.5,-23.1C-74.2,-37.5,-64.3,-49.9,-51.7,-56.4C-39.1,-62.9,-23.8,-63.6,-8.5,-66.8C6.7,-70,32.6,-83.1,44.5,-76.3Z;
                    M39.5,-67.8C50.8,-60.2,59.3,-48.3,66.7,-35.4C74.1,-22.5,80.5,-8.7,79.8,4.8C79.1,18.3,71.3,31.6,62.1,43.1C52.8,54.6,42.1,64.3,29.5,69.9C16.9,75.5,2.4,77,-12.1,74.8C-26.6,72.6,-41.1,66.7,-52.2,57.1C-63.3,47.5,-71,34.2,-75,19.7C-79,5.2,-79.4,-10.5,-74.3,-23.7C-69.2,-36.9,-58.6,-47.6,-46.4,-54.9C-34.2,-62.2,-20.4,-66,-6.6,-69.6C7.2,-73.1,28.2,-75.4,39.5,-67.8Z;
                    M44.5,-76.3C56.4,-69.5,64.2,-54.8,71.3,-40.5C78.4,-26.1,84.7,-12.1,83.6,1.2C82.5,14.5,74,29,63.9,40.3C53.8,51.6,42.1,59.7,29.2,65.9C16.3,72.1,2.2,76.4,-12.6,76.1C-27.4,75.8,-42.9,71,-54.3,61.5C-65.7,52,-72.9,37.9,-77.2,22.7C-81.5,7.5,-82.8,-8.8,-78.5,-23.1C-74.2,-37.5,-64.3,-49.9,-51.7,-56.4C-39.1,-62.9,-23.8,-63.6,-8.5,-66.8C6.7,-70,32.6,-83.1,44.5,-76.3Z
                "
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
        </path>
    </svg>
);

/* ───────────────────────────────────────────
   Orbiting Particles
   ─────────────────────────────────────────── */

const OrbitParticles = ({ className = "" }: { className?: string }) => (
    <div className={`relative w-40 h-40 ${className}`} style={{ perspective: "600px" }}>
        {/* Orbit Ring */}
        <div
            className="absolute inset-0 rounded-full border border-[var(--card-border)]"
            style={{ transform: "rotateX(70deg)" }}
        />
        {/* Second ring */}
        <div
            className="absolute inset-2 rounded-full border border-dashed border-[var(--accent)]/15"
            style={{ transform: "rotateX(70deg) rotateZ(60deg)" }}
        />
        {/* Particles */}
        {[0, 1, 2, 3].map((i) => (
            <div
                key={i}
                className="absolute"
                style={{
                    top: "50%",
                    left: "50%",
                    width: "100%",
                    height: "100%",
                    transform: `rotateX(70deg) rotateZ(${i * 90}deg)`,
                    transformStyle: "preserve-3d",
                    animation: `orbit ${6 + i}s linear infinite`,
                }}
            >
                <div
                    className="absolute rounded-full"
                    style={{
                        width: i % 2 === 0 ? "6px" : "4px",
                        height: i % 2 === 0 ? "6px" : "4px",
                        top: "-3px",
                        left: "50%",
                        marginLeft: "-3px",
                        background: i % 2 === 0
                            ? "var(--accent)"
                            : "var(--accent-secondary)",
                        boxShadow: `0 0 8px ${i % 2 === 0 ? "rgba(99,102,241,0.5)" : "rgba(139,92,246,0.5)"}`,
                    }}
                />
            </div>
        ))}
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--accent)] opacity-60 blur-[2px]" />
    </div>
);

/* ───────────────────────────────────────────
   Layered Glass Discs
   ─────────────────────────────────────────── */

const GlassStack = ({ className = "" }: { className?: string }) => (
    <div className={className} style={{ perspective: "500px", transformStyle: "preserve-3d" }}>
        {[0, 1, 2].map((i) => (
            <div
                key={i}
                className="absolute rounded-2xl border border-[var(--accent)]/10"
                style={{
                    width: `${70 - i * 10}px`,
                    height: `${50 - i * 8}px`,
                    left: `${i * 8}px`,
                    top: `${i * 12}px`,
                    transform: `rotateX(-15deg) rotateY(20deg) translateZ(${i * 15}px)`,
                    background: `rgba(99,102,241,${0.04 + i * 0.03})`,
                    backdropFilter: "blur(4px)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
            />
        ))}
    </div>
);

/* ───────────────────────────────────────────
   Main Export — Hero 3D Illustrations
   ─────────────────────────────────────────── */

const Hero3DElements = () => {
    const mouse = useMouseParallax(20);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Isometric Cube — top left */}
            <motion.div
                className="absolute top-[12%] left-[6%] hidden md:block"
                animate={{ x: mouse.x * 0.5, y: mouse.y * 0.5 }}
                transition={{ type: "spring", damping: 50 }}
            >
                <div className="float-3d">
                    <IsoCube size={55} />
                </div>
            </motion.div>

            {/* Morph Blob — top right, large */}
            <motion.div
                className="absolute top-[5%] right-[3%] opacity-60"
                animate={{ x: mouse.x * -0.3, y: mouse.y * -0.3 }}
                transition={{ type: "spring", damping: 50 }}
            >
                <MorphBlob className="float-slow" />
            </motion.div>

            {/* Ring 3D — left center */}
            <motion.div
                className="absolute top-[45%] left-[4%] hidden lg:block"
                animate={{ x: mouse.x * 0.6, y: mouse.y * 0.4 }}
                transition={{ type: "spring", damping: 40 }}
            >
                <div className="float-reverse">
                    <Ring3D />
                </div>
            </motion.div>

            {/* Orbiting Particles — right center */}
            <motion.div
                className="absolute top-[35%] right-[4%] hidden lg:block"
                animate={{ x: mouse.x * -0.4, y: mouse.y * 0.6 }}
                transition={{ type: "spring", damping: 40 }}
            >
                <OrbitParticles />
            </motion.div>

            {/* Glass Stack — bottom left */}
            <motion.div
                className="absolute bottom-[18%] left-[10%] hidden md:block"
                animate={{ x: mouse.x * 0.7, y: mouse.y * 0.3 }}
                transition={{ type: "spring", damping: 45 }}
            >
                <div className="float-slow" style={{ animationDelay: "2s" }}>
                    <GlassStack />
                </div>
            </motion.div>

            {/* Second Cube — bottom right, smaller */}
            <motion.div
                className="absolute bottom-[15%] right-[10%] hidden md:block"
                animate={{ x: mouse.x * -0.5, y: mouse.y * -0.4 }}
                transition={{ type: "spring", damping: 50 }}
            >
                <div className="float-3d" style={{ animationDelay: "3s" }}>
                    <IsoCube size={40} />
                </div>
            </motion.div>

            {/* Scattered micro dots */}
            {[
                { top: "25%", left: "20%", delay: "0s", size: 3 },
                { top: "60%", right: "22%", delay: "1s", size: 4 },
                { top: "75%", left: "35%", delay: "2s", size: 3 },
                { top: "15%", right: "30%", delay: "0.5s", size: 2 },
                { top: "50%", left: "30%", delay: "3s", size: 3 },
            ].map((dot, i) => (
                <motion.div
                    key={i}
                    className="absolute float-slow rounded-full bg-[var(--accent)] opacity-20"
                    style={{
                        ...dot,
                        width: dot.size,
                        height: dot.size,
                        animationDelay: dot.delay,
                    }}
                    animate={{
                        x: mouse.x * (0.2 + i * 0.1),
                        y: mouse.y * (0.2 + i * 0.1),
                    }}
                    transition={{ type: "spring", damping: 60 }}
                />
            ))}
        </div>
    );
};

export default Hero3DElements;
