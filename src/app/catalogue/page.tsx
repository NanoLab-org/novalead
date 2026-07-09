"use client";
import { useEffect, useRef } from "react";
import { CATEGORIES } from "@/constants";
import Link from "next/link";

type Niveau = "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux";

type Formation = {
  id: number | string;
  titre: string;
  duree: string;
  niveau: Niveau | string;
  places: number;
  format: string;
  description: string;
};

type Category = {
  id: string;
  label: string;
  description: string;
  locked: boolean;
  formations: Formation[];
};



// Full class strings as literals so Tailwind generates them at build time.
const NIVEAU_CLASS: Record<string, string> = {
  "Débutant":      "bg-primary/15 text-level-beginner",
  "Intermédiaire": "bg-primary/15 text-level-intermediate",
  "Avancé":        "bg-level-advanced/15 text-level-advanced",
  "Tous niveaux":  "bg-primary/15 text-level-beginner",
};



// ── Sub-components ─────────────────────────────────────────────

function FormationCard({ f }: { f: Formation }) {
  return (
    <div className="group flex flex-col gap-3 bg-surface p-[22px] min-[900px]:py-7 min-[900px]:px-[30px] cursor-pointer transition-colors duration-200 hover:bg-surface-hover">
      <div className="flex justify-between items-center">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${NIVEAU_CLASS[f.niveau]}`}>
          {f.niveau}
        </span>
        <span className="flex items-center gap-[5px] text-xs text-faint">
          <svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/></svg>
          {f.duree}
        </span>
      </div>
      <h4 className="text-[15px] font-bold text-strong leading-[1.35]">{f.titre}</h4>
      <p className="text-[13px] text-faded leading-[1.65] grow">{f.description}</p>
      <div className="flex justify-between items-center mt-1 pt-3.5 border-t border-black/5">
        <span className="flex items-center gap-1.5 text-xs text-faint">
          <svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,16.28,116.39,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/></svg>
          {f.places} places
        </span>
        <Link href={`/formations/${f.id}`} className="fcard-btn">Voir la formation</Link>
      </div>
    </div>
  );
}

function CategoryContainer({ cat, index }: { cat: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = cat.locked ? "0.55" : "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [cat.locked]);

  return (
    <div
      ref={ref}
      className={`w-full border border-black/[0.07] rounded-2xl bg-surface overflow-hidden transition-colors duration-[250ms] ${cat.locked ? "" : "hover:border-primary/30"}`}
      style={{
        opacity: 0,
        transform: "translateY(36px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      <div className="px-5 pt-[22px] pb-[18px] min-[900px]:px-8 min-[900px]:pt-7 min-[900px]:pb-6 border-b border-black/[0.055]">
        <div className="flex items-center gap-3.5 mb-2">
          <h2 className={`text-xl font-bold ${cat.locked ? "text-locked" : "text-heading"}`}>
            {cat.label}
          </h2>
          {cat.locked ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-black/5 text-faded px-3 py-1 rounded-full">
              <svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a28,28,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z"/></svg>
              Stay tuned
            </span>
          ) : (
            <span className="text-xs font-bold bg-primary/15 text-primary px-3 py-1 rounded-full">
              {cat.formations.length} formations
            </span>
          )}
        </div>
        <p className="text-[13.5px] text-faded leading-[1.6]">{cat.description}</p>
      </div>

      {cat.locked ? (
        <div className="py-14 px-8 flex justify-center">
          <div className="flex flex-col items-center gap-3.5 text-center">
            <div className="w-14 h-14 rounded-full bg-black/[0.04] flex items-center justify-center text-faintest animate-pulse">
              <svg width="28" height="28" viewBox="0 0 256 256" fill="currentColor"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a28,28,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z"/></svg>
            </div>
            <p className="text-sm text-faint">Ces formations arrivent bientôt.</p>
            <button className="px-6 py-2.5 bg-transparent border border-black/10 rounded-[9px] text-faded text-[13px] font-semibold cursor-pointer transition-colors duration-200 hover:border-primary/45 hover:text-primary">
              Être notifié
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 gap-px bg-black/5">
          {cat.formations.map((f) => (
            <FormationCard key={f.id} f={f} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function CataloguePage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 50);
  }, []);

  // Derived from data so stats update automatically when CATEGORIES changes.
  const totalFormations = CATEGORIES.reduce((sum, cat) => sum + cat.formations.length, 0);
  const totalDomains    = CATEGORIES.length;

  return (
    <>
      <header
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-[#04211e] to-[#0a3a2e] pt-0 translate-y-0 transition-all duration-700 ease-out"
      >
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 min-h-[420px]">
          <div className="flex flex-col items-center justify-center text-center relative z-10 px-6 pt-14 pb-10 min-[900px]:px-0 min-[900px]:pb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-[18px]">
              Nos formations
            </p>
            <h1 className="text-[clamp(34px,4vw,54px)] font-extrabold text-white leading-[1.08] mb-5">
              Catalogue<br /><span className="text-primary">NovaLead</span>
            </h1>
            <p className="text-[15px] text-white/60 max-w-[460px] leading-[1.75] mb-8 mx-auto">
              Des formations terrain pensées pour les techniciens de demain — fibre optique, télécoms et énergie solaire.
            </p>
            <div className="flex gap-5 min-[600px]:gap-8">
            </div>
          </div>
         <div className="relative overflow-hidden h-[260px] min-[900px]:h-auto">
            <img
              className="w-full h-full object-cover object-center block"
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format&fit=crop"
              alt="Technicien en formation"
              style={{ filter: "brightness(0.45) saturate(0.85)" }}
            />
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: "#04211e", opacity: 0.35 }}
            />
          </div>
        </div>
      </header>

      <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgb(13_148_136/0.45)_30%,rgb(37_99_235/0.55)_70%,transparent_100%)]" />

      <div className="w-full bg-gradient-to-b from-deep to-base px-5 pt-8 pb-15 min-[900px]:px-12 min-[900px]:pt-13 min-[900px]:pb-25">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-7">
          <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[rgb(28_28_30/0.3)] mb-2">
            Parcourir par domaine
          </p>
          {CATEGORIES.map((cat, i) => (
            <CategoryContainer key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
