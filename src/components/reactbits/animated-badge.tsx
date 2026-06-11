"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getAnimationDuration,
  getAnimationVariants,
  useReducedMotion,
} from "./utils/animation-settings";

/**
 * Animated badge component
 * Displays badges with subtle scale and opacity animations
 * Used in skills section and capability highlights
 */
export function AnimatedBadge({
  children,
  className = "",
  delay = 0,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "pulse" | "scale";
}): React.ReactElement {
  const isReduced = useReducedMotion();

  const duration = getAnimationDuration(0.5);

  const variants = getAnimationVariants({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover:
      variant === "scale"
        ? { scale: 1.05 }
        : variant === "pulse"
          ? { scale: 1.02 }
          : {},
  });

  const pulseVariants = getAnimationVariants({
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(125, 211, 199, 0.7)",
        "0 0 0 8px rgba(125, 211, 199, 0)",
      ],
    },
  });

  return (
    <motion.div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variant === "pulse" && "relative",
        className,
      )}
      initial="initial"
      animate={isReduced ? "initial" : "animate"}
      whileHover={isReduced ? "initial" : "hover"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {variant === "pulse" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={isReduced ? "initial" : "animate"}
          variants={pulseVariants}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}
      <span className="relative">{children}</span>
    </motion.div>
  );
}
