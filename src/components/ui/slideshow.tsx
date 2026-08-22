import { useTranslations } from "next-intl";
import { ProgramGalleryCarousel } from "@/components/ui/gallery-carousel";
import { CATEGORIES } from "@/constants";

export default function Slideshow() {
  const t = useTranslations("Home");
  const tf = useTranslations("Formations");

  // One slide per domain: category label + first formation's image & title.
  const slides = CATEGORIES.filter((c) => c.formations.length > 0).map((c) => {
    const f = c.formations[0];
    const label = tf(`categories.${c.id}.label`);
    return { src: f.img, alt: label, label, caption: tf(`items.${f.id}.titre`) };
  });
  return (
    <section className="relative bg-gradient-to-b from-[#04211e] via-[#2a6a55] via-[40%] to-[#f5f0e8] pb-16 sm:pb-24 min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#04211e] to-transparent pointer-events-none z-10" />
      <div className="pt-8 px-6 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          {t("slidesEyebrow")}
          <span className="w-5 h-[2px] bg-primary" />
        </p>
        <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter">
          {t.rich("slidesTitle", {
            hl: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h2>
      </div>

      <ProgramGalleryCarousel images={slides} />
    </section>
  );
}