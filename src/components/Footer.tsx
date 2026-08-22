import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { contactInfo, openingHours } from "@/constants";

const footerLinks = [
  { key: "catalogue", href: "/catalogue" },
  { key: "about", href: "/apropos" },
  { key: "location", href: "/location" },
  { key: "contact", href: "/contact" },
] as const;

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tLoc = await getTranslations({ locale, namespace: "Location" });
  return (
    <footer
      id="contact"
      className="px-5 sm:px-8 lg:px-10 py-12 lg:py-16 bg-gradient-to-br from-hero-from to-hero-to"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.85fr_0.85fr_0.85fr] gap-x-10 gap-y-12 mb-14">

        {/* Brand */}
        <div>
          <div className="text-white font-bold text-xl tracking-tight mb-4">
            Nova<span className="text-primary">lead</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
            {t("tagline")}
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity inline-block mb-6"
          >
            {t("cta")} <span className="inline-block rtl-flip">→</span>
          </Link>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all text-xs">in</a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all text-xs">fb</a>
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <p className="text-white font-bold text-sm mb-4">{t("quickLinks")}</p>
          <ul className="flex flex-col gap-2.5">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/70 text-sm hover:text-white transition-colors">
                  {tNav(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-bold text-sm mb-4">{t("contactTitle")}</p>
          <ul className="flex flex-col gap-3">
            {contactInfo.map((c) => (
              <li key={c.key} className="text-sm">
                <span className="block text-primary text-xs uppercase tracking-wide mb-0.5">{tLoc(`contactLabels.${c.key}`)}</span>
                <span className="text-white/70">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <p className="text-white font-bold text-sm mb-4">{t("hoursTitle")}</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {openingHours.map((h) => (
              <li key={h.key} className="flex justify-between gap-4 text-white/70">
                <span>{tLoc(`days.${h.key}`)}</span>
                <span className={h.closed ? "text-primary font-medium" : "text-white font-medium"}>{h.closed ? tLoc("closed") : h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1100px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
        <p>© 2024 NovaLead. {t("rights")}</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            {t("legal")}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {t("privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
