"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./TransitionProvider";

// Scroll-through order for the site. Adjust as routes change.
const ROUTES = ["/", "/apropos", "/catalogue", "/location", "/contact"];
const THRESHOLD = 200; // px of accumulated downward delta at the bottom to fire
const BOTTOM_SLACK = 24;

export default function ScrollNavigator() {
  const pathname = usePathname();
  const { navigateTo } = usePageTransition();
  const accumulated = useRef(0);
  const [progress, setProgress] = useState(0);

  // Reset accumulation whenever the route changes.
  useEffect(() => {
    accumulated.current = 0;
    setProgress(0);
  }, [pathname]);

  useEffect(() => {
    const currentIndex = ROUTES.indexOf(pathname);
    const nextRoute =
      currentIndex >= 0 && currentIndex < ROUTES.length - 1
        ? ROUTES[currentIndex + 1]
        : null;
    if (!nextRoute) return;

    const onWheel = (e: WheelEvent) => {
      // Scrolling up cancels any accumulated progress.
      if (e.deltaY < 0) {
        if (accumulated.current !== 0) {
          accumulated.current = 0;
          setProgress(0);
        }
        return;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - BOTTOM_SLACK;
      if (!atBottom) return;

      accumulated.current += e.deltaY;
      const p = Math.min(accumulated.current / THRESHOLD, 1);
      setProgress(p);

      if (accumulated.current >= THRESHOLD) {
        accumulated.current = 0;
        setProgress(0);
        navigateTo(nextRoute);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [pathname, navigateTo]);

  if (progress <= 0) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9998,
        width: "160px",
        height: "3px",
        borderRadius: "9999px",
        background: "rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          background: "#0d9488",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
