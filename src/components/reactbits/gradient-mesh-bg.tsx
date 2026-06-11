"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  getAnimationDuration,
  getAnimationVariants,
  useReducedMotion,
} from "./utils/animation-settings";

/**
 * Animated gradient mesh background effect
 * Creates a soft, moving gradient glow behind content
 * Used in hero sections for visual interest
 */
export function GradientMeshBg({
  className = "",
}: {
  className?: string;
}): React.ReactElement {
  const isReduced = useReducedMotion();

  const duration = getAnimationDuration(8);

  const meshVariants = getAnimationVariants({
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      opacity: [0.3, 0.5, 0.3],
    },
  });

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 opacity-60 ${className}`}
      initial="initial"
      animate={isReduced ? "initial" : "animate"}
      variants={meshVariants}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background:
          "radial-gradient(circle at 20% 30%, rgba(125, 211, 199, 0.2) 0%, transparent 40%), " +
          "radial-gradient(circle at 80% 70%, rgba(179, 207, 229, 0.15) 0%, transparent 40%), " +
          "radial-gradient(circle at 50% 50%, rgba(232, 184, 109, 0.1) 0%, transparent 50%)",
        backgroundSize: "200% 200%",
      }}
    />
  );
}
