"use client";

import { motion } from "framer-motion";

type Variant = "dots" | "wave" | "geometric";

const SectionDivider = ({ variant = "dots" }: { variant?: Variant }) => {
  const centerContent =
    variant === "dots" ? (
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--line-strong)]" />
    ) : variant === "wave" ? (
      <span className="h-2 w-2 rounded-full border border-[var(--line-strong)]" />
    ) : (
      <span className="h-2.5 w-2.5 rotate-45 border border-[var(--line-strong)]" />
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="divider-line"
    >
      <div className="flex items-center justify-center">
        <span className="h-px flex-1 bg-[var(--line)]" />
        <span className="mx-4 flex items-center justify-center">{centerContent}</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>
    </motion.div>
  );
};

export default SectionDivider;
