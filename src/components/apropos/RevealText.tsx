"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

// Client island: fades a value in and drops it down from above once it scrolls
// into view — the text-stat counterpart to CountUp's number roll.
export default function RevealText({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: -18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}
