"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement, useMemo } from "react";

import { charReveal, staggerContainer, wordReveal } from "./variants";

type TextTag = "span" | "p" | "h1" | "h2" | "h3" | "h4";

interface TextAnimateProps {
  text: string;
  mode?: "words" | "chars";
  className?: string;
  as?: TextTag;
  delay?: number;
  once?: boolean;
  stagger?: number;
}

export function TextAnimate({
  text,
  mode = "words",
  className,
  as: Tag = "span",
  delay = 0,
  once = true,
  stagger,
}: TextAnimateProps) {
  const shouldReduceMotion = useReducedMotion();

  const tokens = useMemo(() => {
    if (mode === "chars") {
      return text.split("");
    }

    return text.split(" ");
  }, [mode, text]);

  if (shouldReduceMotion) {
    return createElement(Tag, { className }, text);
  }

  const interval = stagger ?? (mode === "chars" ? 0.03 : 0.06);
  const container = staggerContainer(interval, delay);
  const childVariant = mode === "chars" ? charReveal : wordReveal;

  return createElement(
    Tag,
    { className, style: { display: "inline" } },
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      style={{ display: "inline" }}
      aria-label={text}
    >
      {tokens.map((token, index) => (
        <motion.span
          key={`${token}-${index}`}
          variants={childVariant}
          style={{ display: "inline-block" }}
        >
          {token}
          {mode === "words" && index < tokens.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>,
  );
}

export function AnimatedHeading({
  level = 2,
  text,
  className,
  delay = 0,
}: {
  level?: 1 | 2 | 3;
  text: string;
  className?: string;
  delay?: number;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";

  return (
    <TextAnimate
      text={text}
      mode="words"
      as={Tag}
      className={className}
      delay={delay}
    />
  );
}
