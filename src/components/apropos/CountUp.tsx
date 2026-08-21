"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

// Client island: counts a number up from 0 once it scrolls into view.
// The surrounding stat tile (label, styling) stays server-rendered.
export default function CountUp({
  num,
  suffix = "",
  decimals = 0,
}: {
  num: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, num, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) ref.current.textContent = value.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [isInView, num, decimals]);

  return (
    <span>
      <span ref={ref}>{num.toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}
