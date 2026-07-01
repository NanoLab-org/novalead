"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { formations, domainColors } from "@/constants";

export default function Carousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % formations.length);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

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
       <Link href="/catalogue" className="text-sm font-semibold text-muted hover:text-graphite transition-colors hidden md:block">
          Voir tout le catalogue
       </Link>
      </div>

      <div className="relative overflow-hidden mb-8">
        <div
          className="flex gap-3 transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(calc(-${active * 220}px))` }}
        >
          {[...formations, ...formations].map((f, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i % formations.length);
                setPaused(true);
                setTimeout(() => setPaused(false), 5000);
              }}
              className={`whitespace-nowrap text-sm font-semibold px-5 py-2 rounded-full border transition-all flex-shrink-0 ${
                active === i % formations.length
                  ? "bg-primary text-white border-primary"
                  : "bg-transparent text-muted border-black/10 hover:border-black/30 hover:text-graphite"
              }`}
            >
              {f.titre}
            </button>
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-base to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-base to-transparent pointer-events-none" />
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 glass-card rounded-xl p-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div>
          <span className={`text-xs font-bold px-3 py-1 rounded-sm border ${domainColors[formations[active].domaine]} mb-4 inline-block`}>
            {formations[active].domaine}
          </span>
          <h3 className="text-2xl font-black text-graphite tracking-tight mb-3">
            {formations[active].titre}
          </h3>
          <p className="text-muted text-sm leading-relaxed max-w-xl mb-6">
            {formations[active].description}
          </p>
          <div className="flex gap-6 text-sm text-muted mb-8">
            <span>{formations[active].duree}</span>
            <span>{formations[active].format}</span>
            <span>{formations[active].niveau}</span>
          </div>
          <div className="flex gap-3">
            <button className="bg-primary text-white font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
              S&apos;inscrire
            </button>
            <button className="bg-transparent text-graphite font-medium text-sm px-5 py-3 rounded-md border border-black/20 hover:border-black/40 transition-colors">
              En savoir plus
            </button>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2 items-center justify-center">
          {formations.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                setPaused(true);
                setTimeout(() => setPaused(false), 5000);
              }}
              className={`rounded-full transition-all ${
                active === i
                  ? "w-3 h-3 bg-primary"
                  : "w-2 h-2 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}