"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl flex items-center justify-between px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
      <Link href="/" className="text-white font-bold text-xl tracking-tight">
        Nova<span className="text-primary">lead</span>
      </Link>
      <ul className="hidden md:flex gap-8 text-sm font-medium text-muted">
        {navLinks.map((link) => (
          <li key={link.label}>
            {link.label === "À propos" && isHome ? (
              <button
                type="button"
                className="hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </button>
            ) : (
              <Link href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <button className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
        Nous contacter
      </button>
    </nav>
  );
}