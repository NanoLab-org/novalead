"use client";

import { useState } from "react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&auto=format&fit=crop",
    text: ["INSTALLATION FIBRE", "OPTIQUE FTTH"],
  },
  {
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80&auto=format&fit=crop",
    text: ["INSTALLATION", "PHOTOVOLTAÏQUE"],
  },
  {
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80&auto=format&fit=crop",
    text: ["HABILITATIONS", "ÉLECTRIQUES"],
  },
  {
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
    text: ["RÉSEAUX TÉLÉCOMS", "& INFRASTRUCTURE"],
  },
  {
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80&auto=format&fit=crop",
    text: ["EFFICACITÉ", "ÉNERGÉTIQUE"],
  },
];

const navBtn =
  "absolute top-1/2 -translate-y-1/2 z-[2] flex items-center justify-center w-[52px] h-[52px] text-[1.4rem] text-white cursor-pointer bg-white/[0.12] border border-white/25 backdrop-blur hover:bg-white/25 transition-colors";

export default function Component() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[80vh] min-h-[500px] overflow-hidden rounded-2xl">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex items-end bg-cover bg-center transition-opacity duration-1000 ${
            i === current
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          // Per-slide image is data-driven, so it stays an inline style.
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          {/* Readability overlay (was the ::after gradient) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04211e]/85 via-[#04211e]/10 to-transparent" />
          <div className="relative z-[1] flex flex-col p-[clamp(1.5rem,4vw,3.5rem)] text-white font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)]">
            {slide.text.map((t, j) => (
              <span key={j}>{t}</span>
            ))}
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        className={`${navBtn} left-5`}
        onClick={prevSlide}
        aria-label="Formation précédente"
      >
        ←
      </button>
      <button
        className={`${navBtn} right-5`}
        onClick={nextSlide}
        aria-label="Formation suivante"
      >
        →
      </button>

      {/* Counter */}
      <div className="absolute right-6 bottom-6 z-[2] text-white/90 text-[0.85rem] font-semibold tracking-[0.15em]">
        0{current + 1} / 0{slides.length}
      </div>
    </div>
  );
}
