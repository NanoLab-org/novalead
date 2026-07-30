import Link from "next/link";
import { contactInfo, openingHours } from "@/constants";

const footerLinks = [
  { label: "Catalogue", href: "/catalogue" },
  { label: "À propos", href: "/apropos" },
  { label: "Localisation", href: "/location" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="px-10 py-16 bg-gradient-to-br from-hero-from to-hero-to"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.85fr_0.85fr_0.85fr] gap-x-10 gap-y-12 mb-14">

        {/* Brand */}
        <div>
          <div className="text-white font-bold text-xl tracking-tight mb-4">
            Nova<span className="text-primary">lead</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
            Centre de formation spécialisé dans les métiers techniques de la fibre optique,
            du photovoltaïque et des télécommunications en Tunisie.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity inline-block mb-6"
          >
            Nous contacter →
          </Link>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all text-xs">in</a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all text-xs">fb</a>
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <p className="text-white font-bold text-sm mb-4">Liens rapides</p>
          <ul className="flex flex-col gap-2.5">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-white/70 text-sm hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-bold text-sm mb-4">Contact</p>
          <ul className="flex flex-col gap-3">
            {contactInfo.map((c) => (
              <li key={c.label} className="text-sm">
                <span className="block text-primary text-xs uppercase tracking-wide mb-0.5">{c.label}</span>
                <span className="text-white/70">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <p className="text-white font-bold text-sm mb-4">Horaires</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {openingHours.map((h, i) => (
              <li key={i} className="flex justify-between gap-4 text-white/70">
                <span>{h.day}</span>
                <span className={h.closed ? "text-primary font-medium" : "text-white font-medium"}>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1100px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
        <p>© 2024 NovaLead. Tous droits réservés.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Mentions légales
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}
