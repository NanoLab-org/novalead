"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const PAGE_ORDER = ["/", "/apropos", "/catalogue" , "/location", "/contact"]; // Define the order of pages for navigation
const EDGE_OFFSET = 100; // Distance from edge to trigger navigation
const TRANSITION_MS = 500; // Smooth transition duration
const SCROLL_THRESHOLD = 50; // Minimum scroll distance to trigger

export default function PageScrollNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const lastScrollY = useRef(0);
  const isNavigating = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Reset navigation state and add fade-in effect when page changes
  useEffect(() => {
    isNavigating.current = false;
    lastScrollY.current = window.scrollY;

    // Smooth fade-in effect
    document.body.style.opacity = "0";
    document.body.style.transition = `opacity ${TRANSITION_MS}ms ease`;

    const timer = window.setTimeout(() => {
      document.body.style.opacity = "1";
    }, 50);

    return () => {
      window.clearTimeout(timer);
      document.body.style.opacity = "1";
    };
  }, [pathname]);

  useEffect(() => {
    const currentIndex = PAGE_ORDER.indexOf(pathname);
    if (currentIndex === -1) return; // Not a page in our navigation order

    const navigateTo = (href: string) => {
      if (isNavigating.current) return;
      isNavigating.current = true;
      
      // Smooth fade-out effect
      document.body.style.transition = `opacity ${TRANSITION_MS}ms ease`;
      document.body.style.opacity = "0";
      
      window.setTimeout(() => {
        router.push(href);
      }, TRANSITION_MS);
    };

    const handleScroll = () => {
      // Clear any pending scroll timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Debounce scroll events to make it feel more natural
      scrollTimeout.current = setTimeout(() => {
        if (isNavigating.current) return;

        const currentY = window.scrollY;
        const scrollDelta = Math.abs(currentY - lastScrollY.current);
        
        // Only trigger if user has scrolled enough
        if (scrollDelta < SCROLL_THRESHOLD) {
          lastScrollY.current = currentY;
          return;
        }

        const scrollingUp = currentY < lastScrollY.current;
        const scrollingDown = currentY > lastScrollY.current;
        const atTop = currentY <= EDGE_OFFSET;
        const atBottom =
          window.innerHeight + currentY >=
          document.documentElement.scrollHeight - EDGE_OFFSET;

        if (scrollingUp && atTop && currentIndex > 0) {
  if (!isNavigating.current) {
    scrollTimeout.current = setTimeout(() => {
      navigateTo(PAGE_ORDER[currentIndex - 1]);
    }, 800);
  }
}

        // Navigate to next page when scrolling down at the bottom
if (scrollingDown && atBottom && currentIndex < PAGE_ORDER.length - 1) {
  if (!isNavigating.current) {
    // Wait 1.5 seconds at the bottom before navigating
    scrollTimeout.current = setTimeout(() => {
      navigateTo(PAGE_ORDER[currentIndex + 1]);
    }, 1500);
  }
}

        lastScrollY.current = currentY;
      }, 100); // 100ms debounce for natural feel
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [pathname, router]);

  return null;
}
