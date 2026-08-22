"use client";

import { useEffect, useRef, useState } from "react";
// Locale-less pathname so it matches the locale-less ROUTES below.
import { usePathname } from "@/i18n/navigation";
import { usePageTransition } from "./TransitionProvider";

// Scroll-through order for the site. Adjust as routes change.
const ROUTES = ["/", "/apropos", "/catalogue", "/location", "/contact"];
const THRESHOLD = 200; // px of accumulated downward delta at the bottom to fire (wheel)
const TOUCH_THRESHOLD = 150; // px of continuous upward finger drag at the bottom to fire
const BOTTOM_SLACK = 24;

export default function ScrollNavigator() {
  const pathname = usePathname();
  const { navigateTo } = usePageTransition();
  const accumulated = useRef(0);
  const touchAccumulated = useRef(0);
  const lastTouchY = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Reset accumulation whenever the route changes.
  useEffect(() => {
    accumulated.current = 0;
    touchAccumulated.current = 0;
    lastTouchY.current = null;
    setProgress(0);
  }, [pathname]);

  useEffect(() => {
    const currentIndex = ROUTES.indexOf(pathname);
    const nextRoute =
      currentIndex >= 0 && currentIndex < ROUTES.length - 1
        ? ROUTES[currentIndex + 1]
        : null;
    if (!nextRoute) return;

    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - BOTTOM_SLACK;

    // ── Desktop: wheel ──────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        if (accumulated.current !== 0) {
          accumulated.current = 0;
          setProgress(0);
        }
        return;
      }
      if (!atBottom()) return;

      accumulated.current += e.deltaY;
      const p = Math.min(accumulated.current / THRESHOLD, 1);
      setProgress(p);

      if (accumulated.current >= THRESHOLD) {
        accumulated.current = 0;
        setProgress(0);
        navigateTo(nextRoute);
      }
    };

    // ── Mobile: deliberate pull-past-bottom ─────────────────────
    // touchmove only fires while a finger is actually on the screen, so a fast
    // flick's momentum (which happens after touchend) can never accumulate here —
    // only a real, continuous, held drag past the bottom edge can.
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY.current === null) return;
      const currentY = e.touches[0].clientY;
      const delta = lastTouchY.current - currentY; // positive = finger moving up
      lastTouchY.current = currentY;

      if (delta < 0) {
        // Finger moving down — cancel any in-progress pull.
        if (touchAccumulated.current !== 0) {
          touchAccumulated.current = 0;
          setProgress(0);
        }
        return;
      }
      if (!atBottom()) return;

      touchAccumulated.current += delta;
      const p = Math.min(touchAccumulated.current / TOUCH_THRESHOLD, 1);
      setProgress(p);

      if (touchAccumulated.current >= TOUCH_THRESHOLD) {
        touchAccumulated.current = 0;
        setProgress(0);
        navigateTo(nextRoute);
      }
    };

    const onTouchEnd = () => {
      lastTouchY.current = null;
      // Finger lifted before completing the pull — spring back, like pull-to-refresh.
      if (touchAccumulated.current > 0) {
        touchAccumulated.current = 0;
        setProgress(0);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
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