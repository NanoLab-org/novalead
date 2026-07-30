"use client";

import { useRef } from "react";

const VALUES = [
  { titre: "Formateurs praticiens", desc: "Tous nos formateurs exercent encore dans leur domaine. Pas de théorie déconnectée du terrain." },
  { titre: "Certifications reconnues", desc: "Nos programmes sont certifiants et reconnus par les organismes officiels du secteur télécoms et énergie." },
  { titre: "Éco-responsable", desc: "Centre engagé dans la transition énergétique — fibre optique, photovoltaïque, efficacité énergétique." },
  { titre: "Sur mesure entreprise", desc: "Programmes intra adaptés à votre contexte, vos équipes et vos enjeux métier spécifiques." },
];

export default function ValuesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Précédent"
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface shadow-card items-center justify-center text-graphite hover:bg-surface-hover transition-colors"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Suivant"
        onClick={() => scroll(1)}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface shadow-card items-center justify-center text-graphite hover:bg-surface-hover transition-colors"
      >
        →
      </button>
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {VALUES.map((v) => (
          <div
            key={v.titre}
            className="group snap-center shrink-0 w-full flex flex-col items-center text-center gap-4 bg-surface shadow-card rounded-2xl p-10 md:p-14 cursor-pointer transition-colors duration-200 hover:bg-surface-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-strong">{v.titre}</h4>
            <p className="text-sm md:text-base text-faded leading-relaxed max-w-xl">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
