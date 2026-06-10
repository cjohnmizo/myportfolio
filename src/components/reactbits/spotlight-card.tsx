"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "./utils/animation-settings";

/**
 * Spotlight card effect
 * Creates a light-tracking spotlight that follows mouse movement
 * Used in project cards for interactive visual interest
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(125, 211, 199, 0.4)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}): React.ReactElement {
  const [isReduced, setIsReduced] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(
    circle at ${mouseX}px ${mouseY}px,
    ${spotlightColor} 0%,
    transparent 80%
  )`;

  useEffect(() => {
    setIsReduced(prefersReducedMotion());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={ref}
      className={cn("group relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {!isReduced && isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isReduced ? "none" : background,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </div>
  );
}
