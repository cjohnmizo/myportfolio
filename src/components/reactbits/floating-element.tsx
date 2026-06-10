"use client";

import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getAnimationDuration,
  getAnimationVariants,
  prefersReducedMotion,
} from "./utils/animation-settings";

/**
 * Floating elements animation
 * Makes elements float gently up and down
 * Used for hero visual elements and decorative pieces
 */
export function FloatingElement({
  children,
  className = "",
  duration = 4,
  delay = 0,
  amplitude = 8,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  amplitude?: number;
}): React.ReactElement {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    setIsReduced(prefersReducedMotion());
  }, []);

  const animDuration = getAnimationDuration(duration);
  const offsetDuration = animDuration;

  const variants = getAnimationVariants({
    animate: {
      y: [0, -amplitude, 0],
    },
  });

  return (
    <motion.div
      className={cn("relative", className)}
      initial="initial"
      animate={isReduced ? "initial" : "animate"}
      variants={variants}
      transition={{
        duration: offsetDuration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
