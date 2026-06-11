"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getAnimationDuration,
  getAnimationVariants,
  useReducedMotion,
} from "./utils/animation-settings";

/**
 * Micro-interaction button wrapper
 * Adds subtle scale and glow effects to buttons on interaction
 * Used with primary CTAs for enhanced interactivity
 */
export function MicroButton(
  props: HTMLMotionProps<"button"> & {
    children: React.ReactNode;
    variant?: "default" | "glow" | "lift";
  },
): React.ReactElement {
  const { children, className, variant = "default", ...rest } = props;
  const isReduced = useReducedMotion();

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

  return (
    <motion.button
      className={cn("relative", className)}
      initial="initial"
      whileHover={isReduced ? "initial" : "hover"}
      whileTap={isReduced ? "initial" : "tap"}
      variants={variants}
      transition={{ duration, ease: "easeOut" }}
      {...rest}
    >
      {variant === "glow" && !isReduced && (
        <motion.div
          className="bg-primary/20 pointer-events-none absolute inset-0 rounded-lg"
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
