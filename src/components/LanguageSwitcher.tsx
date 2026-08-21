"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { fr: "FR", en: "EN", ar: "AR" };

// Switches locale while staying on the current page (usePathname is locale-less,
// router.replace re-adds the chosen locale).
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`flex items-center gap-1 rounded-full border border-current/15 p-0.5 text-xs font-bold ${className}`}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === active;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-full px-2 py-1 transition-colors ${
              isActive ? "bg-primary text-white" : "opacity-70 hover:opacity-100"
            }`}
          >
            {LABELS[loc]}
          </button>
        );
      })}
    </div>
  );
}
