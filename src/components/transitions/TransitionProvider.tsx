"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// Locale-aware: router.push auto-prefixes the active locale, and usePathname is
// locale-less — so TransitionLink hrefs like "/catalogue" keep the current locale.
import { usePathname, useRouter } from "@/i18n/navigation";

type Phase = "idle" | "exiting" | "covering" | "entering";

interface TransitionContextValue {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within <TransitionProvider>");
  }
  return ctx;
}

const RISE_MS = 650;
const FALL_MS = 650;
const EASE = "cubic-bezier(0.76,0,0.24,1)";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  // Kept in sync with `phase` so the route-change effect can read the current
  // phase without depending on it (which would re-run the effect and let its
  // cleanup cancel its own timer — the bug that leaves phase stuck on 'entering').
  const phaseRef = useRef<Phase>("idle");
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setPhaseSafe = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const clearTimers = useCallback(() => {
    if (navTimer.current) {
      clearTimeout(navTimer.current);
      navTimer.current = null;
    }
    if (enterTimer.current) {
      clearTimeout(enterTimer.current);
      enterTimer.current = null;
    }
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      // Read the ref, not state, so this callback never goes stale.
      if (phaseRef.current !== "idle") return;
      if (href === pathname) return;

      clearTimers();
      setPhaseSafe("exiting");

      // Once the overlay has fully risen to cover the screen, swap the route.
      navTimer.current = setTimeout(() => {
        setPhaseSafe("covering");
        router.push(href);
      }, RISE_MS);
    },
    [pathname, router, setPhaseSafe, clearTimers]
  );

  // When the route actually changes, play the fall-away. Depends only on
  // [pathname]; reads phaseRef to know whether *we* triggered this change.
  useEffect(() => {
    if (phaseRef.current !== "covering") return;
    clearTimers();
    setPhaseSafe("entering");
    enterTimer.current = setTimeout(() => {
      setPhaseSafe("idle");
    }, FALL_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Clean up on unmount only.
  useEffect(() => () => clearTimers(), [clearTimers]);

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Brand dark-teal gradient — same as the page heroes, so it feels native.
    background: "linear-gradient(135deg, #04211e 0%, #0a3a2e 100%)",
    pointerEvents: phase === "idle" ? "none" : "auto",
    willChange: "transform",
    transform:
      phase === "idle"
        ? "translateY(100%)"
        : phase === "covering"
          ? "translateY(0)"
          : undefined, // exiting / entering are driven by the keyframes below
    animation:
      phase === "exiting"
        ? `overlay-rise ${RISE_MS}ms ${EASE} forwards`
        : phase === "entering"
          ? `overlay-fall-away ${FALL_MS}ms ${EASE} forwards`
          : undefined,
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <div aria-hidden style={overlayStyle}>
        <div className="flex flex-col items-center gap-6">
          <span className="text-3xl font-black tracking-tight text-white">
            Nova<span className="text-primary">lead</span>
          </span>
          <span className="transition-loader" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
