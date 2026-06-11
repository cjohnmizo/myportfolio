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
 * Stagger container for animating lists of items
 * Each child animates in sequence with a stagger delay
 * Used for project lists, skill cards, and badge arrays
 */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
}): React.ReactElement {
  const isReduced = useReducedMotion();

  const duration = getAnimationDuration(0.5);

  const initialOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: -20 },
    right: { x: 20 },
  };

  const containerVariants = getAnimationVariants({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  });

  const itemVariants = getAnimationVariants({
    hidden: {
      opacity: 0,
      ...initialOffset[direction],
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  });

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate={isReduced ? "hidden" : "show"}
      variants={containerVariants}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{
                duration,
                ease: "easeOut",
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
