"use client";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

export default function AProposPage() {
  return (
   <div className="min-h-screen bg-base">

      {/* Hero */}
<div className="bg-gradient-to-br from-[#04211e] to-[#0a3a2e] px-16 pt-36 pb-20 text-center">
  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
    <span className="w-5 h-[2px] bg-primary" />
    À propos de NovaLead
    <span className="w-5 h-[2px] bg-primary" />
  </p>
  <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6">
    Former les experts <br />
    <span className="text-primary">de demain</span>
  </h1>
  <p className="text-white/60 text-base leading-relaxed max-w-2xl mx-auto mb-12">
    NovaLead est un centre de formation spécialisé dans les métiers techniques de la fibre optique,
    du photovoltaïque et des télécommunications en Tunisie.
  </p>
</div>

      {/* Mission & Vision */}
      <section className="px-16 py-24 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface border border-white/10 rounded-xl p-8">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Notre Mission</p>
            <h2 className="text-2xl font-black text-graphite tracking-tighter mb-4">
              Rendre l'expertise technique accessible
            </h2>
            <p className="text-faded text-sm leading-relaxed">
              Notre mission est de former les techniciens et les entreprises aux compétences
              de demain. Chaque programme est pensé pour être directement applicable sur le
              terrain dès le lendemain de la formation.
            </p>
          </div>
          <div className="glass-card rounded-xl p-8">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Notre Vision</p>
            <h2 className="text-2xl font-black text-graphite tracking-tighter mb-4">
              Devenir la référence en Tunisie et au Maghreb
            </h2>
            <p className="text-faded text-sm leading-relaxed">
              Nous visons à devenir le centre de formation technique de référence en Tunisie
              et dans la région du Maghreb, en proposant des formations certifiantes reconnues
              à l'échelle internationale.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="px-16 py-24 border-b border-white/10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          Notre Histoire
        </p>
        <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter mb-12">
          Comment tout a <span className="text-primary">commencé</span>
        </h2>
        <div className="flex flex-col gap-8">
          {[
            { year: "2020", title: "La fondation", desc: "NovaLead est fondé par des professionnels du secteur télécoms et énergie, avec une vision claire : former des techniciens opérationnels dès le premier jour." },
            { year: "2021", title: "Premiers programmes", desc: "Lancement des premières formations en fibre optique FTTH. Plus de 50 techniciens formés la première année." },
            { year: "2022", title: "Expansion", desc: "Ouverture des formations en photovoltaïque et en habilitations électriques. Partenariats avec les opérateurs télécoms tunisiens." },
            { year: "2024", title: "Aujourd'hui", desc: "NovaLead forme aujourd'hui des centaines de techniciens par an et développe de nouveaux programmes pour répondre aux besoins du marché." },
          ].map((item, i) => (
            <div key={i} className="flex gap-8 items-start">
              <div className="text-primary font-black text-xl w-16 shrink-0">{item.year}</div>
              <div className="border-l border-primary/30 pl-8">
                <h3 className="text-graphite font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-faded text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="px-16 py-24 border-b border-white/10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          Nos Valeurs
        </p>
        <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter mb-12">
          Ce qui nous <span className="text-primary">définit</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { titre: "Formateurs praticiens", desc: "Tous nos formateurs exercent encore dans leur domaine. Pas de théorie déconnectée du terrain.", color: "border-primary" },
            { titre: "Certifications reconnues", desc: "Nos programmes sont certifiants et reconnus par les organismes officiels du secteur télécoms et énergie.", color: "border-secondary" },
            { titre: "Éco-responsable", desc: "Centre engagé dans la transition énergétique — fibre optique, photovoltaïque, efficacité énergétique.", color: "border-primary" },
            { titre: "Sur mesure entreprise", desc: "Programmes intra adaptés à votre contexte, vos équipes et vos enjeux métier spécifiques.", color: "border-primary" },
          ].map((v, i) => (
            <div key={i} className={`glass-card border-l-4 ${v.color} px-6 py-5 rounded-r-xl`}>
              <h4 className="text-graphite font-bold text-sm mb-2">{v.titre}</h4>
              <p className="text-faded text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notre Équipe */}
<section className="px-16 py-24 border-b border-white/10">
  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
    <span className="w-5 h-[2px] bg-primary" />
    Notre Équipe
  </p>
  <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter mb-12">
    Des experts <span className="text-primary">du terrain</span>
  </h2>
  <div className="flex justify-center">
    <CircularTestimonials
      autoplay={true}
      colors={{
        name: "#07473f",
        designation: "#2e9e6b",
        testimony: "#7a96aa",
        arrowBackground: "#162436",
        arrowForeground: "#f1f1f7",
        arrowHoverBackground: "#2e9e6b",
      }}
      fontSizes={{
        name: "24px",
        designation: "14px",
        quote: "15px",
      }}
      testimonials={[
        {
          name: "Mohamed Ben Ali",
          designation: "Directeur & Formateur Senior — Fibre Optique",
          quote: "Passionné par la transmission du savoir technique, j'accompagne chaque stagiaire vers une maîtrise complète des réseaux fibre optique FTTH, du tirage jusqu'au raccordement.",
          src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop",
        },
        {
          name: "Sarra Mansouri",
          designation: "Formatrice — Énergie Solaire",
          quote: "Mon objectif est de rendre les énergies renouvelables accessibles à tous les techniciens. Chaque installation photovoltaïque réussie est une victoire pour la transition énergétique.",
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop",
        },
        {
          name: "Karim Trabelsi",
          designation: "Formateur — Télécommunications",
          quote: "Les télécoms évoluent rapidement. Ma mission est de préparer les techniciens aux défis d'aujourd'hui et de demain, avec des formations ancrées dans la réalité du terrain.",
          src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop",
        },
      ]}
    />
  </div>
</section>

      {/* Nos Certifications — coming soon
      <section className="px-16 py-24 max-w-6xl mx-auto">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          Nos Certifications
        </p>
        <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter mb-12">
          Reconnus et <span className="text-primary">certifiés</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { titre: "Certification Fibre Optique", org: "Ministère des TIC Tunisie", year: "2021" },
            { titre: "Habilitations Électriques", org: "STEG — Société Tunisienne de l'Électricité", year: "2022" },
            { titre: "Formation Photovoltaïque", org: "ANME — Agence Nationale pour la Maîtrise de l'Énergie", year: "2022" },
          ].map((cert, i) => (
            <div key={i} className="glass-card rounded-xl p-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-primary text-lg">✓</span>
              </div>
              <h3 className="text-graphite font-bold text-sm mb-2">{cert.titre}</h3>
              <p className="text-faded text-xs mb-1">{cert.org}</p>
              <p className="text-primary text-xs font-semibold">{cert.year}</p>
            </div>
          ))}
        </div>
      </section>
      */}

    </div>
  );
}
