"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion , type Variants } from "framer-motion";
import { Info, LayoutGrid, MapPin, Mail } from "lucide-react";
import { navLinks } from "@/constants";
import TransitionLink from "@/components/TransitionLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const LINK_ICONS: Record<string, React.ElementType> = {
  "/apropos": Info,
  "/catalogue": LayoutGrid,
  "/location": MapPin,
  "/contact": Mail,
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const , staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: { opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [onHero, setOnHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-dark-hero]");
    if (!hero) {
      setOnHero(false);
      return;
    }
    const NAV_BAND = 80;
    const update = () => setOnHero(hero.getBoundingClientRect().bottom > NAV_BAND);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const lightText = onHero && !menuOpen;

  return (
    <>
      {/* z-[90] — must stay above the overlay's z-[80] so the morph button is always reachable */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] w-[90%] max-w-5xl flex items-center justify-between px-5 md:px-8 py-3 rounded-full border border-white/40 bg-white/30 backdrop-blur-xl shadow-lg">
        <TransitionLink
          href="/"
          className={`font-bold text-xl tracking-tight transition-colors duration-300 ${lightText ? "text-white" : "text-graphite"}`}
        >
          Nova<span className="text-primary">lead</span>
        </TransitionLink>

        <ul className={`hidden md:flex gap-8 text-sm font-medium transition-colors duration-300 ${lightText ? "text-white/80" : "text-muted"}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <TransitionLink href={link.href} className={`transition-colors ${lightText ? "hover:text-white" : "hover:text-graphite"}`}>
                {t(link.key)}
              </TransitionLink>
            </li>
          ))}
        </ul>

        <div className={`hidden md:flex items-center gap-3 ${lightText ? "text-white" : "text-graphite"}`}>
          <LanguageSwitcher />
          <TransitionLink
            href="/contact"
            className="inline-block bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            {t("cta")}
          </TransitionLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={menuOpen}
          className="md:hidden relative flex items-center justify-center w-9 h-9"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`absolute w-5 h-[2px] rounded-full ${menuOpen ? "bg-graphite" : lightText ? "bg-white" : "bg-graphite"}`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute w-5 h-[2px] rounded-full ${lightText && !menuOpen ? "bg-white" : "bg-graphite"}`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`absolute w-5 h-[2px] rounded-full ${menuOpen ? "bg-graphite" : lightText ? "bg-white" : "bg-graphite"}`}
          />
        </button>
      </nav>

      {/* Centered modal menu, not full-screen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setMenuOpen(false)}
            className="md:hidden fixed inset-0 z-[80] bg-graphite/40 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              variants={cardVariants}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm max-h-[80vh] overflow-y-auto bg-cream rounded-3xl shadow-2xl border border-black/5 px-7 pt-8 pb-8 flex flex-col"
            >
              <div className="flex flex-col items-center gap-6 py-2">
                {navLinks.map((link) => {
                  const Icon = LINK_ICONS[link.href];
                  const active = pathname === link.href;
                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <TransitionLink
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 text-2xl font-black tracking-tighter transition-colors ${
                          active ? "text-primary" : "text-graphite hover:text-primary"
                        }`}
                      >
                        {Icon && <Icon size={20} strokeWidth={2.25} className={active ? "text-primary" : "text-faint"} />}
                        {t(link.key)}
                      </TransitionLink>
                    </motion.div>
                  );
                })}

                <motion.div variants={itemVariants} className="mt-2">
                  <TransitionLink
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="bg-primary text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity inline-block"
                  >
                    {t("cta")}
                  </TransitionLink>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-4">
                  <LanguageSwitcher className="text-graphite" />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-black/[0.06]">
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-faded hover:text-primary hover:border-primary/40 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-faded hover:text-primary hover:border-primary/40 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-faded hover:text-primary hover:border-primary/40 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}