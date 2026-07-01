"use client";

import React, { useState } from "react";

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

export default function Component() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="slideshow">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide ${i === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="slide-text">
            {slide.text.map((t, j) => (
              <span key={j}>{t}</span>
            ))}
          </div>
        </div>
      ))}

      {/* Controls */}
      <button className="nav left" onClick={prevSlide}>
        ←
      </button>
      <button className="nav right" onClick={nextSlide}>
        →
      </button>

      {/* Counter */}
      <div className="counter">
        0{current + 1} / 0{slides.length}
      </div>
    </div>
  );
}
