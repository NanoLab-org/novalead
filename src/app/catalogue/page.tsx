"use client";

import { useEffect, useRef } from "react";

const CATEGORIES = [
  {
    id: "fibre",
    label: "Fibre Optique",
    description: "Installation, soudure, mesure et maintenance des réseaux fibre optique FTTH/FTTB.",
    locked: false,
    formations: [
      { id: 1, titre: "Installation Fibre Optique FTTH", duree: "5 jours", niveau: "Débutant", places: 12, description: "Maîtrisez l'installation complète d'un réseau fibre optique FTTH, du tirage jusqu'au raccordement." },
      { id: 2, titre: "Soudure et Mesure Fibre", duree: "3 jours", niveau: "Intermédiaire", places: 8, description: "Techniques de soudure par fusion et réflectométrie OTDR pour les techniciens fibre." },
      { id: 3, titre: "Maintenance Réseau Fibre", duree: "4 jours", niveau: "Avancé", places: 6, description: "Diagnostic, dépannage et maintenance préventive des infrastructures fibre déployées." },
    ],
  },
  {
    id: "telecom",
    label: "Télécoms",
    description: "Antennes, VoIP, câblage structuré et équipements de télécommunication.",
    locked: true,
    formations: [],
  },
  {
    id: "solaire",
    label: "Énergie Solaire",
    description: "Dimensionnement, installation et maintenance des systèmes photovoltaïques.",
    locked: true,
    formations: [],
  },
];

const NIVEAU_STYLE: Record<string, { bg: string; color: string }> = {
  "Débutant":      { bg: "rgba(46,158,107,0.15)", color: "#4eda96" },
  "Intermédiaire": { bg: "rgba(249,115,22,0.15)",  color: "#fb923c" },
  "Avancé":        { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
};

function FormationCard({ f }: { f: any }) {
  const niv = NIVEAU_STYLE[f.niveau] || NIVEAU_STYLE["Débutant"];
  return (
    <div className="fcard">
      <div className="fcard-header">
        <span className="fcard-badge" style={{ background: niv.bg, color: niv.color }}>{f.niveau}</span>
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
        <button className="fcard-btn">Voir la formation</button>
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
          <h2 className="cat-title" style={{ color: cat.locked ? "#4a5568" : "#f0f6fc" }}>
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
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: #0f1b2d;
          color: #e6edf3;
          min-height: 100vh;
        }

        .page-header {
          background: #0f1b2d;
          padding: 0;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 420px;
          max-width: 100%;
        }

        .hero-left {
          padding: 72px 56px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .hero-right {
          position: relative;
          overflow: hidden;
        }

        .hero-right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: brightness(0.7) saturate(0.85);
        }

        .hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #0f1b2d 0%, transparent 40%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-right::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, #0f1b2d 100%);
          z-index: 1;
          pointer-events: none;
        }

        .header-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f97316;
          margin-bottom: 18px;
        }

        .header-title {
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.08;
          margin-bottom: 20px;
        }
        .header-title span { color: #f97316; }

        .header-sub {
          font-size: 15px;
          color: rgba(230,237,243,0.5);
          max-width: 460px;
          line-height: 1.75;
          margin-bottom: 32px;
        }

        .hero-stats {
          display: flex;
          gap: 32px;
        }

        .hero-stat-num {
          font-size: 22px;
          font-weight: 800;
          color: #f97316;
          line-height: 1;
          margin-bottom: 4px;
        }

        .hero-stat-label {
          font-size: 12px;
          color: rgba(230,237,243,0.4);
          font-weight: 500;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.45) 30%, rgba(27,79,114,0.55) 70%, transparent 100%);
        }

        .page-body {
          width: 100%;
          background: linear-gradient(180deg, #0a1525 0%, #0f1b2d 100%);
          padding: 52px 48px 100px;
        }

        .body-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(230,237,243,0.3);
          margin-bottom: 8px;
        }

        .cat-container {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          background: #111d2e;
          overflow: hidden;
          transition: border-color 0.25s;
        }
        .cat-container:not(.locked):hover {
          border-color: rgba(249,115,22,0.28);
        }
        .cat-container.locked { opacity: 0.55; }

        .cat-header {
          padding: 28px 32px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.055);
        }

        .cat-title-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 8px;
        }

        .cat-title { font-size: 20px; font-weight: 700; }

        .cat-count {
          font-size: 12px;
          font-weight: 700;
          background: rgba(249,115,22,0.14);
          color: #f97316;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .stay-tuned {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          background: rgba(255,255,255,0.05);
          color: #6e7681;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .cat-desc {
          font-size: 13.5px;
          color: #6e7681;
          line-height: 1.6;
        }

        .formations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.05);
        }

        .fcard {
          background: #111d2e;
          padding: 28px 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: background 0.18s;
          cursor: pointer;
        }
        .fcard:hover { background: #15253a; }

        .fcard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fcard-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .fcard-duree {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #484f58;
        }

        .fcard-titre {
          font-size: 15px;
          font-weight: 700;
          color: #dde8f0;
          line-height: 1.35;
        }

        .fcard-desc {
          font-size: 13px;
          color: #6e7681;
          line-height: 1.65;
          flex-grow: 1;
        }

        .fcard-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .fcard-places {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #484f58;
        }

        .fcard-btn {
          padding: 8px 16px;
          background: transparent;
          color: #f97316;
          border: 1px solid rgba(249,115,22,0.3);
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .fcard-btn:hover {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.6);
        }

        .locked-body {
          padding: 56px 32px;
          display: flex;
          justify-content: center;
        }

        .locked-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          text-align: center;
        }

        .locked-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3a4a5a;
          animation: pulse 2.8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }

        .locked-text { font-size: 14px; color: #484f58; }

        .locked-btn {
          padding: 10px 24px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          color: #6e7681;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .locked-btn:hover {
          border-color: rgba(249,115,22,0.45);
          color: #f97316;
        }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-right { height: 260px; }
          .hero-left { padding: 48px 24px 40px; }
          .page-body { padding: 32px 20px 60px; }
          .formations-grid { grid-template-columns: repeat(2, 1fr); }
          .cat-header { padding: 22px 20px 18px; }
          .fcard { padding: 22px; }
        }

        @media (max-width: 600px) {
          .formations-grid { grid-template-columns: 1fr; }
          .hero-stats { gap: 20px; }
        }
      `}</style>

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