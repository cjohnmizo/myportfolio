/**
 * Animation settings that respect prefers-reduced-motion
 * Returns animation variants based on user preferences
 */

"use client";

import { Easing } from "framer-motion";
import { useSyncExternalStore } from "react";

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const getAnimationDuration = (normalDuration: number): number => {
  return prefersReducedMotion() ? 0.001 : normalDuration;
};

export const getAnimationVariants = <T extends Record<string, unknown>>(
  variants: T,
): T => {
  if (prefersReducedMotion()) {
    // Return instant variants for reduced motion
    const instantVariants: Record<string, unknown> = {};
    for (const key in variants) {
      instantVariants[key] = {};
    }
    return instantVariants as T;
  }
  return variants;
};

export const getTransitionConfig = (defaults?: {
  duration?: number;
  delay?: number;
  ease?: string;
}) => {
  const duration = getAnimationDuration(defaults?.duration ?? 0.6);
  const easeMap: Record<string, Easing> = {
    easeInOut: "easeInOut",
    easeIn: "easeIn",
    easeOut: "easeOut",
    circIn: "circIn",
    circOut: "circOut",
    circInOut: "circInOut",
    backIn: "backIn",
    backOut: "backOut",
    backInOut: "backInOut",
    anticipate: "anticipate",
  };

  const ease =
    (easeMap[defaults?.ease ?? "easeInOut"] as Easing) || "easeInOut";

  return {
    duration,
    delay: defaults?.delay ?? 0,
    ease,
  };
};

/**
 * Hook to check prefers-reduced-motion with SSR support
 */
export const useReducedMotion = (): boolean => {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);

      return () => mediaQuery.removeEventListener("change", callback);
    },
    prefersReducedMotion,
    () => false,
  );
};
