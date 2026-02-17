"use client";

import { useRef, useState, MouseEvent, useEffect } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    tiltDegree?: number;
}

const SpotlightCard = ({ children, className = "", tiltDegree = 6 }: SpotlightCardProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const check = () => setIsDark(document.documentElement.classList.contains("dark"));
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });

        // 3D tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -tiltDegree;
        const rotateY = ((x - centerX) / centerX) * tiltDegree;
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setRotation({ x: 0, y: 0 });
    };

    const spotlightColor = isDark
        ? "rgba(129, 140, 248, 0.08)"
        : "rgba(99, 102, 241, 0.06)";

    return (
        <div className="w-full h-full" style={{ perspective: "1000px" }}>
            <motion.div
                ref={divRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setOpacity(1)}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`card-3d glass-card relative overflow-hidden h-full ${className}`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Spotlight glow */}
                <div
                    className="pointer-events-none absolute -inset-px transition duration-300"
                    style={{
                        opacity,
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                    }}
                />

                {/* Shine reflection */}
                <div
                    className="pointer-events-none absolute -inset-px transition-opacity duration-500"
                    style={{
                        opacity: opacity * 0.3,
                        background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)`,
                        transform: `translateX(${(position.x / (divRef.current?.offsetWidth || 1)) * 100 - 50}%)`,
                    }}
                />

                <div className="relative h-full" style={{ transform: "translateZ(20px)" }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default SpotlightCard;
