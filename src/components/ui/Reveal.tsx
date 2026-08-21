"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Reusable scroll-reveal wrapper: fades + slides its children up once, the first
// time they enter the viewport. Honors prefers-reduced-motion (renders static).
//
// It's a thin CLIENT island, but any content passed as `children` stays
// server-rendered — so wrapping blocks in a Server Component page keeps them
// server-side. For a staggered row, pass an increasing `delay` per item.
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
