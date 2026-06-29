"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CATEGORIES } from "@/constants";

const NIVEAU_CLASS: Record<string, string> = {
  "Débutant":      "level-debutant",
  "Intermédiaire": "level-intermediaire",
  "Avancé":        "level-avance",
};

function FormationCard({ f }: { f: any }) {
  const levelClass = NIVEAU_CLASS[f.niveau] || NIVEAU_CLASS["Débutant"];
  return (
    <div className="fcard">
      <div className="fcard-header">
        <span className={`fcard-badge ${levelClass}`}>{f.niveau}</span>
        <span className="fcard-duree">
          <svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/></svg>
          {f.duree}
        </span>
      </div>
      <h4 className="fcard-titre">{f.titre}</h4>
      <p className="fcard-desc">{f.description}</p>
      <div className="fcard-footer">
        <span className="fcard-places">
          <svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,16.28,116.39,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/></svg>
          {f.places} places
        </span>
        <Link href={`/formations/${f.id}`} className="fcard-btn">Voir la formation</Link>
      </div>
    </div>
  );
}

function CategoryContainer({ cat, index }: { cat: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`cat-container ${cat.locked ? "locked" : ""}`}
      style={{
        opacity: 0,
        transform: "translateY(36px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      <div className="cat-header">
        <div className="cat-title-row">
          <h2 className="cat-title">
            {cat.label}
          </h2>
          {cat.locked ? (
            <span className="stay-tuned">
              <svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a28,28,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z"/></svg>
              Stay tuned
            </span>
          ) : (
            <span className="cat-count">{cat.formations.length} formations</span>
          )}
        </div>
        <p className="cat-desc">{cat.description}</p>
      </div>

      {cat.locked ? (
        <div className="locked-body">
          <div className="locked-placeholder">
            <div className="locked-icon">
              <svg width="28" height="28" viewBox="0 0 256 256" fill="currentColor"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a28,28,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z"/></svg>
            </div>
            <p className="locked-text">Ces formations arrivent bientôt.</p>
            <button className="locked-btn">Être notifié</button>
          </div>
        </div>
      ) : (
        <div className="formations-grid">
          {cat.formations.map((f: any) => (
            <FormationCard key={f.id} f={f} />
          ))}
        </div>
      )}
    </div>
  );
}

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

  return (
    <>
      <header className="page-header" ref={heroRef}>
        <div className="hero-grid">
          <div className="hero-left">
            <p className="header-eyebrow">Nos formations</p>
            <h1 className="header-title">
              Catalogue<br /><span>NovaLead</span>
            </h1>
            <p className="header-sub">
              Des formations terrain pensées pour les techniciens de demain — fibre optique, télécoms et énergie solaire.
            </p>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">3+</div>
                <div className="hero-stat-label">Formations disponibles</div>
              </div>
              <div>
                <div className="hero-stat-num">3</div>
                <div className="hero-stat-label">Domaines techniques</div>
              </div>
              <div>
                <div className="hero-stat-num">100%</div>
                <div className="hero-stat-label">Pratique terrain</div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format&fit=crop"
              alt="Technicien en formation"
            />
          </div>
        </div>
      </header>

      <div className="divider" />

      <div className="page-body">
        <div className="body-inner">
          <p className="section-label">Parcourir par domaine</p>
          {CATEGORIES.map((cat, i) => (
            <CategoryContainer key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}