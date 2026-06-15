"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
} from "react";

import { useMagneticCursor } from "@/hooks/useMagneticCursor";

interface MagneticButtonProps {
  children: ReactNode;
  as?: "button" | "a" | "div";
  strength?: number;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  "aria-label"?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

export function MagneticButton({
  children,
  as: Tag = "button",
  strength = 0.32,
  className,
  href,
  type = "button",
  target,
  rel,
  "aria-label": ariaLabel,
  onClick,
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, motionProps } = useMagneticCursor({ strength });

  if (Tag === "a") {
    const anchorClick = onClick as MouseEventHandler<HTMLAnchorElement>;

    if (shouldReduceMotion) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={className}
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          onClick={anchorClick}
        >
          {children}
        </a>
      );
    }

    return (
      <motion.a
        ref={ref as Ref<HTMLAnchorElement>}
        className={className}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={anchorClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  if (Tag === "div") {
    const divClick = onClick as MouseEventHandler<HTMLDivElement>;

    if (shouldReduceMotion) {
      return (
        <div
          ref={ref as Ref<HTMLDivElement>}
          className={className}
          aria-label={ariaLabel}
          onClick={divClick}
        >
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref as Ref<HTMLDivElement>}
        className={className}
        aria-label={ariaLabel}
        onClick={divClick}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }

  const buttonClick = onClick as MouseEventHandler<HTMLButtonElement>;

  if (shouldReduceMotion) {
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={className}
        type={type}
        aria-label={ariaLabel}
        onClick={buttonClick}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref as Ref<HTMLButtonElement>}
      className={className}
      type={type}
      aria-label={ariaLabel}
      onClick={buttonClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (coarsePointer || reducedMotion) {
      return;
    }

    let animationFrame = 0;
    let ringX = 0;
    let ringY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const move = (event: MouseEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      dot?.classList.add("is-visible");
      ring?.classList.add("is-visible");
    };

    const loop = () => {
      if (dot) {
        dot.style.left = `${cursorX}px`;
        dot.style.top = `${cursorY}px`;
      }

      ringX += (cursorX - ringX) * 0.14;
      ringY += (cursorY - ringY) * 0.14;

      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }

      animationFrame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    animationFrame = requestAnimationFrame(loop);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(animationFrame);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
