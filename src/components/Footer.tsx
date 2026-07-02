import { footerLinks, contactInfo, openingHours, address, mapEmbedUrl } from "@/constants";

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
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-muted text-sm hover:text-graphite transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + adresse */}
        <div>
          <p className="text-graphite font-bold text-sm mb-4">Contact</p>
          <p className="text-graphite text-sm font-semibold mb-1">{address.name}</p>
          <p className="text-muted text-sm leading-relaxed mb-4">
            {address.lines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
          <ul className="flex flex-col gap-2">
            {contactInfo.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm">
                <span className="text-primary font-medium w-20 shrink-0">{c.label}</span>
                <span className="text-muted">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <p className="text-graphite font-bold text-sm mb-4">Horaires</p>
          <ul className="flex flex-col gap-2 text-sm">
            {openingHours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="text-muted">{h.day}</span>
                <span className={h.closed ? "text-primary font-medium" : "text-graphite font-medium"}>
                  {h.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-black/10 h-[280px] mb-10">
        <iframe
          src={mapEmbedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-muted text-xs">
          &copy; 2025 NovaLead. Tous droits réservés.
        </p>
        <p className="text-muted text-xs">
          Développé par <span className="text-primary">NanoLab</span>
        </p>
      </div>

    </footer>
  );
}
