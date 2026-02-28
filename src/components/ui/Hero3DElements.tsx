"use client";

import { motion } from "framer-motion";

const Hero3DElements = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-12 top-24 h-56 w-56 rounded-full border border-[var(--line)] bg-[var(--accent-soft)]"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-16 h-64 w-64 rounded-full border border-[var(--line)] bg-[color:var(--hero-glow2)]"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[16%] top-16 hidden h-20 w-20 rounded-2xl border border-[var(--line)] bg-[var(--surface)] md:block"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Hero3DElements;
