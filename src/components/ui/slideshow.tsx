import { ProgramGalleryCarousel } from "@/components/ui/gallery-carousel";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&auto=format&fit=crop",
    alt: "Installation fibre optique",
    label: "Fibre Optique",
    caption: "Installation Fibre Optique FTTH",
  },
  {
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80&auto=format&fit=crop",
    alt: "Installation photovoltaïque",
    label: "Énergie Solaire",
    caption: "Installation Photovoltaïque",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80&auto=format&fit=crop",
    alt: "Habilitations électriques",
    label: "Électricité",
    caption: "Habilitations Électriques BR/BC/B1",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
    alt: "Réseaux télécoms",
    label: "Télécoms",
    caption: "Réseaux Télécoms & Infrastructure",
  },
  {
    src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80&auto=format&fit=crop",
    alt: "Efficacité énergétique",
    label: "Énergie",
    caption: "Efficacité Énergétique Entreprise",
  },
];

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