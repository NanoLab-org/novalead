"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const NAMES: Record<string, string> = { fr: "Français", en: "English", ar: "العربية" };
const CODES: Record<string, string> = { fr: "FR", en: "EN", ar: "AR" };

// Dropdown language switcher: shows the current locale; opens a menu to pick
// another. Switches locale while staying on the current page.
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(loc: string) {
    setOpen(false);
    router.replace(pathname, { locale: loc });
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className="flex items-center gap-1.5 rounded-full border border-current/25 px-3 py-1.5 text-xs font-bold transition-colors hover:border-current/50"
      >
        <Globe size={14} strokeWidth={2.25} />
        {CODES[active]}
        <ChevronDown
          size={14}
          strokeWidth={2.25}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 top-full z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-black/10 bg-cream py-1 text-graphite shadow-xl"
        >
          {routing.locales.map((loc) => {
            const isActive = loc === active;
            return (
              <li key={loc}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => choose(loc)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-sm transition-colors ${
                    isActive ? "font-semibold text-primary" : "hover:bg-black/[0.04]"
                  }`}
                >
                  <span dir={loc === "ar" ? "rtl" : "ltr"}>{NAMES[loc]}</span>
                  {isActive && <Check size={15} strokeWidth={2.5} className="text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
