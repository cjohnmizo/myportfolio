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
        setRotation({ x: 0, y: 0 });
    };



    return (
        <div className="w-full h-full" style={{ perspective: "1000px" }}>
            <motion.div
                ref={divRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`card-3d clay-card relative overflow-hidden h-full ${className}`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Soft Highlight */}
                <div
                    className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.2), transparent 40%)`,
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
