"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import {
  fadeUp,
  hoverLift,
  scrollReveal,
  staggerContainer,
  staggerItem,
  staggerItemFast,
  tapPress,
} from "./variants";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  margin?: string;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  margin = "-60px",
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const variant = delay
    ? {
        ...scrollReveal,
        visible: {
          ...scrollReveal.visible,
          transition: {
            ...(scrollReveal.visible as { transition?: object }).transition,
            delay,
          },
        },
      }
    : scrollReveal;

  return (
    <motion.div
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  dense?: boolean;
  margin?: string;
}

export function StaggerGrid({
  children,
  className,
  stagger = 0.07,
  delayChildren = 0,
  dense = false,
  margin = "-40px",
}: StaggerGridProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const gridStagger = dense ? Math.min(stagger, 0.04) : stagger;

  return (
    <motion.div
      className={className}
      variants={staggerContainer(gridStagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  dense = false,
}: {
  children: ReactNode;
  className?: string;
  dense?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={dense ? staggerItemFast : staggerItem}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  const reduce = useReducedMotion();

  if (as === "article") {
    return (
      <motion.article
        className={className}
        whileHover={reduce ? undefined : hoverLift}
        whileTap={reduce ? undefined : tapPress}
      >
        {children}
      </motion.article>
    );
  }

  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : hoverLift}
      whileTap={reduce ? undefined : tapPress}
    >
      {children}
    </motion.div>
  );
}

export function MotionBlock({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reduce ? "visible" : "hidden"}
      animate="visible"
      transition={
        reduce
          ? { duration: 0.01 }
          : { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
