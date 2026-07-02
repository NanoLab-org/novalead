"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Only the home page has the full-screen dark video hero. While the navbar
  // sits over it, use light text; once scrolled past (or on any other page),
  // use dark text so it stays readable on the light background.
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () =>
      setScrolledPastHero(window.scrollY >= window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const onHero = isHome && !scrolledPastHero;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl flex items-center justify-between px-8 py-3 rounded-full border border-white/40 bg-white/30 backdrop-blur-xl shadow-lg">
      <Link
        href="/"
        className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
          onHero ? "text-white" : "text-graphite"
        }`}
      >
        Nova<span className="text-primary">lead</span>
      </Link>
      <ul
        className={`hidden md:flex gap-8 text-sm font-medium transition-colors duration-300 ${
          onHero ? "text-white/80" : "text-muted"
        }`}
      >
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`transition-colors ${
                onHero ? "hover:text-white" : "hover:text-graphite"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <button className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
        Nous contacter
      </Link>
    </nav>
  );
}
