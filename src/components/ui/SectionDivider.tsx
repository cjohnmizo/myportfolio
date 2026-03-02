"use client";

import { motion } from "framer-motion";

type Variant = "dots" | "wave" | "geometric";

const SectionDivider = ({ variant = "dots" }: { variant?: Variant }) => {
  const center =
    variant === "dots" ? (
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--line-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--line-strong)]" />
      </div>
    ) : variant === "wave" ? (
      <span className="h-2 w-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)]" />
    ) : (
      <span className="h-2.5 w-2.5 rotate-45 border border-[var(--line-strong)] bg-[var(--surface-strong)]" />
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
        <span className="mx-5 flex items-center justify-center">{center}</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>
    </motion.div>
  );
};

export default SectionDivider;
