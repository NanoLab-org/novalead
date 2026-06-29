import { heroTags } from "@/constants";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col justify-center min-h-screen px-10 pt-32 pb-20 border-b border-white/10">

      <div className="flex items-center gap-2 text-green text-xs font-bold uppercase tracking-widest mb-8">
        <span className="w-6 h-[2px] bg-green" />
        Centre de Formation Professionnelle
      </div>

      <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-6 max-w-4xl">
        Formez-vous.<br />
        Évoluez.<br />
        <span className="relative inline-block text-green">
          Performez.
          <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-orange rounded-full" />
        </span>
      </h1>

      <p className="text-muted text-base leading-relaxed max-w-xl mb-10">
        NovaLead accompagne les techniciens et les entreprises dans la maîtrise
        des métiers de demain — fibre optique, photovoltaïque et télécommunications
        en Tunisie. Des formations certifiantes, ancrées dans la réalité du terrain.
      </p>

      <div className="flex gap-3 flex-wrap mb-10">
        <Link href="/catalogue" className="bg-orange text-white font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
        Voir nos formations →
        </Link>
        <button className="bg-transparent text-white font-medium text-sm px-5 py-3 rounded-md border border-white/20 hover:border-white/40 transition-colors">
          Parler à un conseiller
        </button>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {["Photovoltaïque", "Fibre optique", "Télécoms", "Certifiant", "Éco-responsable"].map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-3 py-1 rounded-sm bg-green/10 text-green border border-green/25"
          >
            {tag}
          </span>
        ))}
      </div>

    </section>
  );
}