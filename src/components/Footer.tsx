import { footerLinks } from "@/constants";

export default function Footer() {
  return (
    <footer className="px-10 py-12 bg-deep border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

        {/* Logo + description */}
        <div>
          <div className="text-white font-bold text-xl tracking-tight mb-4">
            Nova<span className="text-primary">lead</span>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            Centre de formation spécialisé dans les métiers techniques de la fibre optique,
            du photovoltaïque et des télécommunications en Tunisie.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <p className="text-white font-bold text-sm mb-4">Liens rapides</p>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-muted text-sm hover:text-white transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-bold text-sm mb-4">Contact</p>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li>+216 XX XXX XXX</li>
            <li>contact@novalead.tn</li>
            <li>1000 Tunis, Tunisie</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all text-xs">in</a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all text-xs">fb</a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
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