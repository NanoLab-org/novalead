export default function LocationPage() {
  return (
    <div className="min-h-screen bg-base px-16 pt-36 pb-24">

      <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
        <span className="w-5 h-[2px] bg-primary" />
        Nous trouver
      </p>
      <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-12">
        Où nous <span className="text-primary">trouver</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        <div className="flex flex-col gap-6">
          <div className="bg-surface border border-white/10 rounded-xl p-6">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Adresse</p>
            <p className="text-white font-semibold text-sm mb-1">Centre NovaLead</p>
            <p className="text-faded text-sm leading-relaxed">
              Rue Lorem Ipsum, Immeuble Dolor Sit<br />
              1000 Tunis, Tunisie
            </p>
          </div>

          <div className="bg-surface border border-white/10 rounded-xl p-6">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Contact</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-primary text-sm">Tel</span>
                <a href="tel:+21600000000" className="text-faded text-sm hover:text-white transition-colors">+216 XX XXX XXX</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary text-sm">Email</span>
                <a href="mailto:contact@novalead.tn" className="text-faded text-sm hover:text-white transition-colors">contact@novalead.tn</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary text-sm">WhatsApp</span>
                <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer" className="text-faded text-sm hover:text-white transition-colors">+216 XX XXX XXX</a>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-white/10 rounded-xl p-6">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Horaires</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-faded">Lundi - Vendredi</span>
                <span className="text-white font-medium">08h00 - 18h00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-faded">Samedi</span>
                <span className="text-white font-medium">09h00 - 13h00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-faded">Dimanche</span>
                <span className="text-primary font-medium">Fermé</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-white/10 h-[500px]">
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

      </div>
    </div>
  );
}