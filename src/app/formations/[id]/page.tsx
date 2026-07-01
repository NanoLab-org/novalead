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
    <main className="min-h-screen bg-base px-10 py-32 max-w-4xl mx-auto">

      <Link href="/catalogue" className="text-muted text-sm hover:text-graphite transition-colors mb-8 inline-block">
        ← Retour au catalogue
      </Link>

      <div className="flex gap-3 mb-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-sm bg-primary/10 text-primary border border-primary/25">{formation.niveau}</span>
        <span className="text-xs font-semibold px-3 py-1 rounded-sm bg-primary/10 text-primary border border-primary/25">{formation.format}</span>
      </div>

      <h1 className="text-4xl lg:text-5xl font-black text-graphite tracking-tighter mb-4">
        {formation.titre}
      </h1>

      <div className="flex gap-6 text-sm text-muted mb-8">
        <span>⏱ {formation.duree}</span>
        <span>👥 {formation.places} places</span>
        <span>💰 {formation.prix}</span>
      </div>

      <p className="text-muted text-base leading-relaxed max-w-2xl mb-12">
        {formation.description}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-graphite font-bold text-sm uppercase tracking-widest mb-4">Objectifs</h2>
          <ul className="flex flex-col gap-3">
            {formation.objectifs.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-muted text-sm">
                <span className="text-primary mt-0.5">✓</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-graphite font-bold text-sm uppercase tracking-widest mb-4">Infos pratiques</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Durée</span>
              <span className="text-graphite font-medium">{formation.duree}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Format</span>
              <span className="text-graphite font-medium">{formation.format}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Niveau</span>
              <span className="text-graphite font-medium">{formation.niveau}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Places disponibles</span>
              <span className="text-graphite font-medium">{formation.places}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Prix</span>
              <span className="text-primary font-bold">{formation.prix}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Certification</span>
              <span className="text-graphite font-medium text-right max-w-[200px]">{formation.certification}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="text-graphite font-bold text-sm uppercase tracking-widest mb-4">Programme</h2>
        <div className="flex flex-col gap-3">
          {formation.programme.map((p, i) => (
            <div key={i} className="flex gap-4 text-sm">
              <span className="text-primary font-bold w-16 shrink-0">{p.jour}</span>
              <span className="text-muted">{p.contenu}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 mb-10">
        <h2 className="text-graphite font-bold text-sm uppercase tracking-widest mb-2">Prérequis</h2>
        <p className="text-muted text-sm">{formation.prerequis}</p>
      </div>

      <button className="bg-primary text-white font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
        S'inscrire à cette formation
      </button>

    </main>
  );
}