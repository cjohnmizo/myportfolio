"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    tiltDegree?: number;
}

const SpotlightCard = ({ children, className = "", tiltDegree = 2 }: SpotlightCardProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({ x, y });

        // Minimal 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -tiltDegree;
        const rotateY = ((x - centerX) / centerX) * tiltDegree;
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div className="w-full h-full" style={{ perspective: "1200px" }}>
            <motion.div
                ref={divRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`card-3d clay-card relative overflow-hidden h-full ${className}`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Subtle Glow on Hover */}
                <div
                    className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(0, 217, 255, 0.1), transparent 50%)`,
                    }}
                />

                <div className="relative h-full" style={{ transform: "translateZ(10px)" }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default SpotlightCard;
