"use client";

import { motion } from "framer-motion";

const Hero3DElements = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-16 top-24 h-72 w-72 rounded-full border border-[var(--line)] bg-[var(--accent-soft)]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-8 h-80 w-80 rounded-full border border-[var(--line)] bg-[color:rgba(122,207,255,0.14)]"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[24%] top-20 hidden h-20 w-20 rounded-3xl border border-[var(--line)] bg-[var(--surface)] lg:block"
        animate={{ rotate: [0, 9, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Hero3DElements;
