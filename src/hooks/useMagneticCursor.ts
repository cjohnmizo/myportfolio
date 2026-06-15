"use client";

import { useMotionValue, useSpring, type SpringOptions } from "framer-motion";
import { useCallback, useRef, type MouseEvent as ReactMouseEvent } from "react";

interface MagneticOptions {
  strength?: number;
  spring?: SpringOptions;
}

export function useMagneticCursor({
  strength = 0.3,
  spring = { stiffness: 300, damping: 18, mass: 0.8 },
}: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const element = ref.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      rawX.set((event.clientX - centerX) * strength);
      rawY.set((event.clientY - centerY) * strength);
    },
    [rawX, rawY, strength],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const onMouseMove = (event: ReactMouseEvent) => {
    handleMouseMove(event.nativeEvent);
  };

  return {
    ref,
    motionProps: {
      style: { x, y },
      onMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
