import { heroTags } from "@/constants";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col justify-center min-h-screen px-10 pt-32 pb-20 border-b border-black/10">

      <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-8">
        <span className="w-6 h-[2px] bg-primary" />
        Centre de Formation Professionnelle
      </div>

      <h1 className="text-5xl lg:text-7xl font-black text-graphite leading-tight tracking-tighter mb-6 max-w-4xl">
        Formez-vous.<br />
        Évoluez.<br />
        <span className="relative inline-block text-primary">
          Performez.
          <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-primary rounded-full" />
        </span>
      </h1>

      <p className="text-muted text-base leading-relaxed max-w-xl mb-10">
        NovaLead accompagne les techniciens et les entreprises dans la maîtrise
        des métiers de demain — fibre optique, photovoltaïque et télécommunications
        en Tunisie. Des formations certifiantes, ancrées dans la réalité du terrain.
      </p>

      <div className="flex gap-3 flex-wrap mb-10">
        <Link
          href="/catalogue"
          className="bg-primary text-white font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity inline-block"
        >
          Voir nos formations →
        </Link>
        <Link
          href="/contact"
          className="bg-transparent text-graphite font-medium text-sm px-5 py-3 rounded-md border border-black/20 hover:border-black/40 transition-colors inline-block"
        >
          Nous contacter
        </Link>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {["Photovoltaïque", "Fibre optique", "Télécoms", "Certifiant", "Éco-responsable"].map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-3 py-1 rounded-sm bg-primary/10 text-primary border border-primary/25"
          >
            {tag}
          </span>
        ))}
      </div>

    </section>
  );
}