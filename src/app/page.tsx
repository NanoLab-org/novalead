"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProgressiveHero } from "@/components/ui/progressive-hero";
import Carousel from "@/components/home/Carousel";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const triggered = useRef(false);
  const leaving = useRef(false);

  useEffect(() => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease";

    const targetId =
      window.sessionStorage.getItem("scrollTo") || window.location.hash.replace(/^#/, "");
    window.sessionStorage.removeItem("scrollTo");

    let retryTimer: number | undefined;

    const scrollToTarget = (attempt = 0) => {
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (window.location.hash !== `#${targetId}`) {
          window.history.replaceState(null, "", `#${targetId}`);
        }
        return true;
      }

      if (attempt < 8) {
        retryTimer = window.setTimeout(() => scrollToTarget(attempt + 1), 150);
      }

      return false;
    };

    const timer = window.setTimeout(() => {
      document.body.style.opacity = "1";
      scrollToTarget();
    }, 350);

    return () => {
      window.clearTimeout(timer);
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      document.body.style.opacity = "1";
    };
  }, []);
  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current && !leaving.current) {
          triggered.current = true;
          leaving.current = true;
          
          // Smooth fade out then navigate
          document.body.style.transition = "opacity 0.6s ease";
          document.body.style.opacity = "0";
          
          setTimeout(() => {
            router.push("/apropos");
          }, 600);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      document.body.style.opacity = "1";
    };
  }, [router]);

  return (
    <main className="flex flex-col bg-base">
      <div id="hero">
        <ProgressiveHero />
      </div>
      <div id="home-before-about">
        <Carousel />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <Location />
    </main>
  );
}
