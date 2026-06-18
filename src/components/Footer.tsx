export default function Footer() {
  return (
    <footer className="px-10 py-12 bg-[#0a1520] border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

        {/* Logo + description */}
        <div>
          <div className="text-white font-bold text-xl tracking-tight mb-4">
            Nova<span className="text-[#f97316]">lead</span>
          </div>
          <p className="text-[#7a96aa] text-sm leading-relaxed">
            Centre de formation spécialisé dans les métiers techniques de la fibre optique,
            du photovoltaïque et des télécommunications en Tunisie.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <p className="text-white font-bold text-sm mb-4">Liens rapides</p>
          <ul className="flex flex-col gap-2">
            {["Catalogue", "À propos", "Localisation", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-[#7a96aa] text-sm hover:text-white transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-bold text-sm mb-4">Contact</p>
          <ul className="flex flex-col gap-2 text-sm text-[#7a96aa]">
            <li>+216 XX XXX XXX</li>
            <li>contact@novalead.tn</li>
            <li>1000 Tunis, Tunisie</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#7a96aa] hover:text-white hover:border-white/30 transition-all text-xs">in</a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#7a96aa] hover:text-white hover:border-white/30 transition-all text-xs">fb</a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[#7a96aa] text-xs">
          &copy; 2025 NovaLead. Tous droits réservés.
        </p>
        <p className="text-[#7a96aa] text-xs">
          Développé par <span className="text-[#f97316]">NanoLab</span>
        </p>
      </div>

    </footer>
  );
}