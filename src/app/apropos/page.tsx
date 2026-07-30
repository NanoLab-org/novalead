import { GLSLHills } from "@/components/ui/glsl-hills";
import ValuesCarousel from "@/components/ValuesCarousel";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-transparent">

      {/* Hero — server-rendered text over the animated GLSL hills (client island) */}
      <section
        data-dark-hero
        className="relative overflow-hidden bg-gradient-to-br from-hero-from to-hero-to min-h-[85vh] flex flex-col items-center justify-center text-center px-16 pt-32 pb-20"
      >
        <GLSLHills className="absolute inset-0 z-0" />
        <div className="relative z-10">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <span className="w-5 h-[2px] bg-primary" />
            À propos de NovaLead
            <span className="w-5 h-[2px] bg-primary" />
          </p>
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6">
            Former les experts <br />
            <span className="text-primary">de demain</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
            NovaLead est un centre de formation spécialisé dans les métiers techniques de la fibre optique,
            du photovoltaïque et des télécommunications en Tunisie.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-16 py-24 border-b border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface shadow-card border border-black/10 rounded-xl p-8">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Notre Mission</p>
            <h2 className="text-2xl font-black text-graphite tracking-tighter mb-4">
              Rendre l&apos;expertise technique accessible
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
              à l&apos;échelle internationale.
            </p>
          </div>
        </div>
      </section>

      {/* Nos Valeurs — carousel (client island) */}
      <section className="px-16 py-24 border-b border-black/10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          Nos Valeurs
        </p>
        <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter mb-12">
          Ce qui nous <span className="text-primary">définit</span>
        </h2>
        <ValuesCarousel />
      </section>

      {/* Notre Équipe */}
      <section className="px-16 py-24 border-b border-black/10">
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
            fontSizes={{ name: "24px", designation: "14px", quote: "15px" }}
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

    </div>
  );
}
