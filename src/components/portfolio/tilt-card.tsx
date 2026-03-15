"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 160, damping: 18 });
  const translateY = useTransform(springX, [-7, 7], [6, -6]);

  return (
    <motion.div
      className={className}
      style={{
        rotateX: springX,
        rotateY: springY,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        const rotateAmountX = ((y / bounds.height) - 0.5) * -14;
        const rotateAmountY = ((x / bounds.width) - 0.5) * 14;

        rotateX.set(rotateAmountX);
        rotateY.set(rotateAmountY);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}
