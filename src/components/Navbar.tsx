"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [onHero, setOnHero] = useState(false);

  // Light text while the navbar sits over a dark hero — on ANY page that has
  // one (the hero marks itself with [data-dark-hero]). Dark text once scrolled
  // past that hero, or on pages that have no dark hero at all.
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-dark-hero]");
    if (!hero) {
      setOnHero(false);
      return;
    }
    const NAV_BAND = 80; // the fixed navbar occupies roughly the top 80px
    const update = () =>
      setOnHero(hero.getBoundingClientRect().bottom > NAV_BAND);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

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
      <Link
        href="/contact"
        className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity inline-block"
      >
        Nous contacter
      </Link>
    </nav>
  );
}
