"use client";

import { useState, useEffect, useRef } from "react";

const formations = [
  {
    titre: "Installation Fibre Optique FTTH",
    domaine: "Fibre Optique",
    duree: "5 jours",
    format: "Présentiel",
    niveau: "Débutant",
    description:
      "Maîtrisez les techniques de raccordement, soudure et mesures OTDR pour le déploiement de la fibre optique jusqu'au domicile.",
  },
  {
    titre: "Installation Photovoltaïque",
    domaine: "Photovoltaïque",
    duree: "7 jours",
    format: "Présentiel",
    niveau: "Intermédiaire",
    description:
      "Conception, pose et maintenance de systèmes solaires résidentiels et tertiaires. Inclut les habilitations électriques.",
  },
  {
    titre: "Habilitations Électriques BR/BC/B1",
    domaine: "Électricité",
    duree: "3 jours",
    format: "Présentiel",
    niveau: "Tous niveaux",
    description:
      "Obtenez vos habilitations électriques réglementaires pour intervenir sur installations basse et haute tension.",
  },
  {
    titre: "Réseaux Télécoms et Infrastructure",
    domaine: "Télécoms",
    duree: "6 jours",
    format: "Hybride",
    niveau: "Intermédiaire",
    description:
      "Déploiement et maintenance des infrastructures télécoms, câblage structuré et configuration équipements réseau.",
  },
  {
    titre: "Efficacité Énergétique Entreprise",
    domaine: "Énergie",
    duree: "4 jours",
    format: "Distanciel",
    niveau: "Avancé",
    description:
      "Audit énergétique, bilan carbone et plan d'action pour réduire la consommation et les coûts de votre entreprise.",
  },
];

const domainColors: Record<string, string> = {
  "Fibre Optique": "bg-blue/20 text-sky border-blue/40",
  "Photovoltaïque": "bg-green/10 text-green border-green/25",
  "Électricité": "bg-orange/10 text-orange border-orange/25",
  "Télécoms": "bg-blue/20 text-sky border-blue/40",
  "Énergie": "bg-green/10 text-green border-green/25",
};

export default function Carousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % formations.length);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <section className="px-10 py-24 border-b border-white/10">

      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-green text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-5 h-[2px] bg-green" />
            Formations phares
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
            Nos formations <span className="text-orange">phares</span>
          </h2>
        </div>
        <a href="#catalogue" className="text-sm font-semibold text-muted hover:text-white transition-colors hidden md:block">
          Voir tout le catalogue
        </a>
      </div>

      <div className="relative overflow-hidden mb-8">
        <div
          className="flex gap-3 transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(calc(-${active * 220}px))` }}
        >
          {[...formations, ...formations].map((f, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i % formations.length);
                setPaused(true);
                setTimeout(() => setPaused(false), 5000);
              }}
              className={`whitespace-nowrap text-sm font-semibold px-5 py-2 rounded-full border transition-all flex-shrink-0 ${
                active === i % formations.length
                  ? "bg-orange text-white border-orange"
                  : "bg-transparent text-muted border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {f.titre}
            </button>
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-base to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-base to-transparent pointer-events-none" />
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 bg-surface border border-white/10 rounded-xl p-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div>
          <span className={`text-xs font-bold px-3 py-1 rounded-sm border ${domainColors[formations[active].domaine]} mb-4 inline-block`}>
            {formations[active].domaine}
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight mb-3">
            {formations[active].titre}
          </h3>
          <p className="text-muted text-sm leading-relaxed max-w-xl mb-6">
            {formations[active].description}
          </p>
          <div className="flex gap-6 text-sm text-muted mb-8">
            <span>{formations[active].duree}</span>
            <span>{formations[active].format}</span>
            <span>{formations[active].niveau}</span>
          </div>
          <div className="flex gap-3">
            <button className="bg-orange text-white font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
              S&apos;inscrire
            </button>
            <button className="bg-transparent text-white font-medium text-sm px-5 py-3 rounded-md border border-white/20 hover:border-white/40 transition-colors">
              En savoir plus
            </button>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2 items-center justify-center">
          {formations.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                setPaused(true);
                setTimeout(() => setPaused(false), 5000);
              }}
              className={`rounded-full transition-all ${
                active === i
                  ? "w-3 h-3 bg-orange"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}