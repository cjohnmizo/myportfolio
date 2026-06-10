"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getAnimationDuration,
  getAnimationVariants,
  prefersReducedMotion,
} from "./utils/animation-settings";

/**
 * Micro-interaction button wrapper
 * Adds subtle scale and glow effects to buttons on interaction
 * Used with primary CTAs for enhanced interactivity
 */
export function MicroButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: "default" | "glow" | "lift";
  }
): React.ReactElement {
  const { children, className, variant = "default", ...rest } = props;
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    setIsReduced(prefersReducedMotion());
  }, []);

  const duration = getAnimationDuration(0.3);

  const variants = getAnimationVariants({
    initial: { scale: 1, opacity: 1 },
    hover:
      variant === "lift"
        ? { scale: 1.02, y: -2 }
        : variant === "glow"
          ? { scale: 1.03 }
          : { scale: 1.02 },
    tap: { scale: 0.98 },
  });

  const glowVariants = getAnimationVariants({
    initial: { opacity: 0, scale: 0.8 },
    hover: { opacity: [0.5, 0], scale: 1.2 },
  });

  const { onAnimationStart, onAnimationEnd, ...cleanRest } = rest as any;

  return (
    <motion.button
      className={cn("relative", className)}
      initial="initial"
      whileHover={isReduced ? "initial" : "hover"}
      whileTap={isReduced ? "initial" : "tap"}
      variants={variants}
      transition={{ duration, ease: "easeOut" }}
      {...cleanRest}
    >
      {variant === "glow" && !isReduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg bg-primary/20"
          initial="initial"
          whileHover="hover"
          variants={glowVariants}
          transition={{ duration: 0.6 }}
        />
      )}
      {children}
    </motion.button>
  );
}
