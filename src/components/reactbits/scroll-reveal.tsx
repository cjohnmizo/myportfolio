"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getAnimationDuration,
  getAnimationVariants,
  prefersReducedMotion,
} from "./utils/animation-settings";

/**
 * Scroll-triggered container reveal
 * Animates content when it scrolls into view
 * Used for sections and content blocks
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}): React.ReactElement {
  const [isReduced, setIsReduced] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    setIsReduced(prefersReducedMotion());
  }, []);

  const initialOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -40 },
    right: { x: 40 },
  };

  const duration = getAnimationDuration(0.6);

  const variants = getAnimationVariants({
    initial: {
      opacity: 0,
      ...initialOffset[direction],
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={isReduced || isInView ? "animate" : "initial"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
