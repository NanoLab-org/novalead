export default function LocationPage() {
  return (
    <div className="min-h-screen bg-transparent">

      {/* Hero Banner */}
      <div data-dark-hero className="bg-gradient-to-br from-hero-from to-hero-to px-16 pt-36 pb-16 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          Nous trouver
        </p>
        <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-4">
          Où nous <span className="text-primary">trouver</span>
        </h1>
      </div>

      {/* Map + Info */}
      <div className="px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-7xl mx-auto">

        {/* Left — Info cards */}
        <div className="flex flex-col gap-6">

          <div className="bg-surface shadow-card rounded-2xl p-8">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Adresse</p>
            <p className="text-graphite font-bold text-lg mb-1">Centre NovaLead</p>
            <p className="text-muted text-sm leading-relaxed">
              Rue Lorem Ipsum, Immeuble Dolor Sit<br />
              1000 Tunis, Tunisie
            </p>
          </div>

          <div className="bg-surface shadow-card rounded-2xl p-8">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Contact direct</p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Téléphone", value: "+216 XX XXX XXX", href: "tel:+21600000000" },
                { label: "Email", value: "contact@novalead.tn", href: "mailto:contact@novalead.tn" },
                { label: "WhatsApp", value: "+216 XX XXX XXX", href: "https://wa.me/21600000000" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between pb-4 border-b border-black/5 last:border-0 last:pb-0">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">{item.label}</span>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-muted text-sm hover:text-primary transition-colors font-medium">
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface shadow-card rounded-2xl p-8">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Horaires d'ouverture</p>
            <div className="flex flex-col gap-3 text-sm">
              {[
                { day: "Lundi - Vendredi", hours: "08h00 - 18h00", closed: false },
                { day: "Samedi", hours: "09h00 - 13h00", closed: false },
                { day: "Dimanche", hours: "Fermé", closed: true },
              ].map((slot) => (
                <div key={slot.day} className="flex justify-between items-center pb-3 border-b border-black/5 last:border-0 last:pb-0">
                  <span className="text-muted">{slot.day}</span>
                  <span className={slot.closed ? "text-red-400 font-semibold" : "text-graphite font-semibold"}>
                    {slot.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right — Map */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102115.39799550319!2d10.074691!3d36.806389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis!5e0!3m2!1sfr!2stn!4v1234567890"
              width="100%"
              height="100%"
              className="map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* How to get there */}
          <div className="bg-surface shadow-card rounded-2xl p-8">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Comment nous rejoindre</p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "🚇", label: "Métro", desc: "Station République — Ligne 1, à 5 min à pied" },
                { icon: "🚌", label: "Bus", desc: "Lignes 5, 12, 27 — Arrêt Centre Ville" },
                { icon: "🚗", label: "Voiture", desc: "Parking disponible à 200m — Parking Municipal" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-graphite font-semibold text-sm">{item.label}</p>
                    <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-hero-from to-hero-to px-16 py-16 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Venez nous rendre visite</p>
        <h2 className="text-3xl font-black text-white mb-4">Une question ? Passez nous voir</h2>
        <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
          Notre équipe vous accueille du lundi au samedi pour répondre à toutes vos questions sur nos formations.
        </p>
        <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer" className="bg-primary text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity inline-block">
          Nous contacter sur WhatsApp
        </a>
      </div>

    </div>
  );
}