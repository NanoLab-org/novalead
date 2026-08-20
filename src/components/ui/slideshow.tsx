import { ProgramGalleryCarousel } from "@/components/ui/gallery-carousel";
import { CATEGORIES } from "@/constants";

// Derived from the single source of truth (CATEGORIES): one slide per domain,
// using its formation's image + title. Add a formation in constants and it
// shows up here automatically.
const slides = CATEGORIES.filter((c) => c.formations.length > 0).map((c) => {
  const f = c.formations[0];
  return { src: f.img, alt: c.label, label: c.label, caption: f.titre };
});

export default function Slideshow() {
  return (
    <section className="relative bg-gradient-to-b from-[#04211e] via-[#2a6a55] via-[40%] to-[#f5f0e8] pb-16 sm:pb-24 min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">    
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#04211e] to-transparent pointer-events-none z-10" />
      <div className="pt-8 px-6 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          Formations phares
          <span className="w-5 h-[2px] bg-primary" />
        </p>
        <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
          Nos formations <span className="text-primary">phares</span>
        </h2>
      </div>

      <ProgramGalleryCarousel images={slides} />
    </section>
  );
}