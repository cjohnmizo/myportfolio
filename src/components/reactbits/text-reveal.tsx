"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  getAnimationVariants,
  getTransitionConfig,
  useReducedMotion,
} from "./utils/animation-settings";

/**
 * Text reveal animation for headlines
 * Animates text by revealing it line by line
 * Used in hero sections and section headings
 */
export function TextReveal({
  children,
  className = "",
  staggerDelay = 0.02,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}): React.ReactElement {
  const isReduced = useReducedMotion();

  const text = typeof children === "string" ? children : "";

  const containerVariants = getAnimationVariants({
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  });

  const letterVariants = getAnimationVariants({
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
    },
  });

  const transitionConfig = getTransitionConfig({ duration: 0.5 });

  return (
    <motion.div
      className={className}
      initial="initial"
      animate={isReduced ? "initial" : "animate"}
      variants={containerVariants}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${index}-${char}`}
          variants={letterVariants}
          transition={transitionConfig}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
