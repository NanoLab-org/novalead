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
    <footer id="contact" className="px-10 py-14 bg-deep border-t border-black/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Brand */}
        <div>
          <div className="text-graphite font-bold text-xl tracking-tight mb-4">
            Nova<span className="text-primary">lead</span>
          </div>
          <p className="text-muted text-sm leading-relaxed mb-5">
            Centre de formation spécialisé dans les métiers techniques de la fibre optique,
            du photovoltaïque et des télécommunications en Tunisie.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-muted hover:text-graphite hover:border-black/30 transition-all text-xs">in</a>
            <a href="#" className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-muted hover:text-graphite hover:border-black/30 transition-all text-xs">fb</a>
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <p className="text-graphite font-bold text-sm mb-4">Liens rapides</p>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted text-sm hover:text-graphite transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        {contactInfo.map((c) => (
  <li key={c.label} className="flex items-center gap-2 text-sm">
    <span className="text-primary font-medium w-20 shrink-0">{c.label}</span>
    <span className="text-muted">{c.value}</span>
  </li>
))}

        {/* Horaires */}
        <div>
          <p className="text-graphite font-bold text-sm mb-4">Horaires</p>
          <ul className="flex flex-col gap-2 text-sm">
            {openingHours.map((h, i) => (
              <li key={i} className="flex justify-between text-muted">
                <span>{h.day}</span>
                <span>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted">
        <p>© 2024 NovaLead. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-graphite transition-colors">
            Mentions légales
          </Link>
          <Link href="#" className="hover:text-graphite transition-colors">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}