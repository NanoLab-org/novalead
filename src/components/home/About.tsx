import { values } from "@/constants";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="px-10 py-24 border-b border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-5 h-[2px] bg-primary" />
            À propos de NovaLead
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter leading-tight mb-6">
            La référence en formation <span className="text-primary">technique</span> en Tunisie
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-6">
            NovaLead est un centre de formation spécialisé dans les métiers techniques de la fibre
            optique, du photovoltaïque et des télécommunications. Fondé par des professionnels du
            secteur, notre mission est de former les techniciens et les entreprises aux compétences
            de demain.
          </p>
          <p className="text-muted text-sm leading-relaxed mb-10">
            Nous proposons des formations certifiantes en présentiel et à distance, conçues pour
            répondre aux besoins réels du marché tunisien et international. Chaque programme est
            pensé pour être directement applicable sur le terrain dès le lendemain.
          </p>
          <div className="flex gap-3">
            <button className="bg-primary text-white font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
              Nos formations
            </button>
            <button className="bg-transparent text-graphite font-medium text-sm px-5 py-3 rounded-md border border-black/20 hover:border-black/40 transition-colors">
              Nous contacter
            </button>
          </div>
        </div>

        {/* Right — Values */}
        <div className="flex flex-col gap-4">
          {values.map((v, i) => (
            <div
              key={i}
              className={`bg-surface border-l-4 ${v.color} px-6 py-5 rounded-r-xl`}
            >
              <h4 className="text-graphite font-bold text-sm mb-1">{v.titre}</h4>
              <p className="text-muted text-xs leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}