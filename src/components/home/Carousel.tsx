import Link from "next/link";
import Slideshow from "@/components/ui/slideshow";

export default function Carousel() {
  return (
    <section className="px-10 py-24 border-b border-black/10">

      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-5 h-[2px] bg-primary" />
            Formations phares
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter">
            Nos formations <span className="text-primary">phares</span>
          </h2>
        </div>
        <Link
          href="/catalogue"
          className="text-sm font-semibold text-muted hover:text-graphite transition-colors hidden md:block"
        >
          Voir tout le catalogue
        </Link>
      </div>

      <Slideshow />

    </section>
  );
}
