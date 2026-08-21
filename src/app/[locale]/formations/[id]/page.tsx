import Link from "next/link";
import { CATEGORIES } from "@/constants";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FormationFiche({ params }: Props) {
  const { id } = await params;

  const formation = CATEGORIES.flatMap((cat) => cat.formations).find(
    (f) => f.id === Number(id)
  );

  if (!formation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-graphite">
        <h1 className="text-3xl font-black mb-4">Formation introuvable</h1>
        <Link href="/catalogue" className="text-primary hover:underline">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">

      {/* Hero Banner */}
<div 
  className="relative px-16 pt-36 pb-16 overflow-hidden"
  style={{
    backgroundImage: `url(${formation.img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#04211e]/95 via-[#04211e]/70 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#04211e] via-transparent to-transparent" />
  
  {/* Content */}
  <div className="relative z-10 text-center">
    <Link href="/catalogue" className="text-white/70 text-sm hover:text-graphite transition-colors mb-8 inline-block">
      ← Retour au catalogue
    </Link>
    <div className="flex gap-3 mb-6 text-center justify-center">
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-center">{formation.niveau}</span>
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 border border-black/20 text-center">{formation.format}</span>
    </div>
    <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-6 max-w-3xl text-center mx-auto">
      {formation.titre}
    </h1>
    <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-8 text-center mx-auto">
      {formation.description}
    </p>
    <div className="flex gap-8 text-sm text-white/70">
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {/* Left — Programme + Objectifs */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Objectifs */}
          <div className="bg-surface shadow-card rounded-2xl p-8">
            <h2 className="text-graphite font-black text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Objectifs de la formation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formation.objectifs.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 bg-transparent rounded-xl p-4">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-muted text-sm leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Programme — only shown when we have a day-by-day schedule */}
          {formation.programme.length > 0 && (
          <div className="bg-surface shadow-card rounded-2xl p-8">
            <h2 className="text-graphite font-black text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Programme jour par jour
            </h2>
            <div className="flex flex-col gap-0">
              {formation.programme.map((p, i) => (
                <div key={i} className="flex gap-6 items-stretch">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    {i < formation.programme.length - 1 && (
                      <div className="w-[2px] flex-1 bg-primary/20 my-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mb-1">{p.jour}</p>
                    <p className="text-muted text-sm leading-relaxed">{p.contenu}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Prérequis */}
          <div className="bg-surface shadow-card rounded-2xl p-8">
            <h2 className="text-graphite font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              Prérequis
            </h2>
            <p className="text-muted text-sm leading-relaxed">{formation.prerequis}</p>
          </div>

        </div>

        {/* Right — Sidebar */}
        <div className="flex flex-col gap-6">

          {/* Infos pratiques */}
          <div className="bg-surface shadow-card rounded-2xl p-6 sticky top-28">
            <h2 className="text-graphite font-black text-base mb-5">Infos pratiques</h2>
            <div className="flex flex-col gap-4 text-sm mb-6">
              {[
                { label: "Durée", value: formation.duree },
                { label: "Format", value: formation.format },
                { label: "Niveau", value: formation.niveau },
                { label: "Places disponibles", value: typeof formation.places === "number" ? `${formation.places} places` : formation.places },
                { label: "Certification", value: formation.certification },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1 pb-4 border-b border-black/5 last:border-0 last:pb-0">
                  <span className="text-faded text-xs uppercase tracking-widest">{item.label}</span>
                  <span className="text-graphite font-semibold">{item.value}</span>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <span className="text-faded text-xs uppercase tracking-widest">Prix</span>
                <span className="text-primary font-black text-2xl">{formation.prix}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="block w-full bg-primary text-white font-semibold text-sm px-6 py-4 rounded-xl hover:opacity-90 transition-opacity text-center mb-3"
            >
              S'inscrire à cette formation
            </Link>
            <Link
              href="/contact"
              className="block w-full bg-transparent text-graphite font-medium text-sm px-6 py-3 rounded-xl border border-black/15 hover:border-primary hover:text-primary transition-colors text-center"
            >
              Demander plus d'infos
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-hero-from to-hero-to px-16 py-16 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Prêt à vous former ?</p>
        <h2 className="text-3xl font-black text-white mb-4">Rejoignez la prochaine session</h2>
        <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
          Places limitées — inscrivez-vous dès maintenant pour garantir votre place dans la prochaine session.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/contact" className="bg-primary text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            S'inscrire maintenant
          </Link>
          <Link href="/catalogue" className="bg-white/10 text-graphite font-medium px-8 py-3 rounded-full hover:bg-white/20 transition-colors">
            Voir d'autres formations
          </Link>
        </div>
      </div>

    </div>
  );
}