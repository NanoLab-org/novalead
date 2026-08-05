"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Info, LayoutGrid, MapPin, Mail } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { navLinks } from "@/constants";
import TransitionLink from "@/components/TransitionLink";

const LINK_ICONS: Record<string, React.ElementType> = {
  "/apropos": Info,
  "/catalogue": LayoutGrid,
  "/location": MapPin,
  "/contact": Mail,
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: { opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

export default function Navbar() {
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
            <li key={link.label}>
              <TransitionLink href={link.href} className={`transition-colors ${lightText ? "hover:text-white" : "hover:text-graphite"}`}>
                {link.label}
              </TransitionLink>
            </li>
          ))}
        </ul>

        <TransitionLink
          href="/contact"
          className="hidden md:inline-block bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Nous contacter
        </TransitionLink>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
                    <motion.div key={link.label} variants={itemVariants}>
                      <TransitionLink
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 text-2xl font-black tracking-tighter transition-colors ${
                          active ? "text-primary" : "text-graphite hover:text-primary"
                        }`}
                      >
                        {Icon && <Icon size={20} strokeWidth={2.25} className={active ? "text-primary" : "text-faint"} />}
                        {link.label}
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
                    Nous contacter
                  </TransitionLink>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-black/[0.06]">
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-faded hover:text-primary hover:border-primary/40 transition-colors">
                  <FaLinkedinIn size={14} />
                </a>
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-faded hover:text-primary hover:border-primary/40 transition-colors">
                  <FaFacebookF size={14} />
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-faded hover:text-primary hover:border-primary/40 transition-colors">
                  <FaInstagram size={14} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}