"use client";

import dynamic from "next/dynamic";
import { Truck } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";

// The mini-map touches WebGL — keep it browser-only.
const MobilityMiniMap = dynamic(() => import("./MobilityMiniMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-hero-to" aria-hidden="true" />,
});

export default function MobilityMapCard({
  title,
  description,
  className = "",
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`relative isolate min-h-[18rem] overflow-hidden rounded-2xl ${className}`}>
      {/* Dimmed, non-interactive bus-route map */}
      <MobilityMiniMap className="absolute inset-0 z-0 h-full w-full" />

      {/* Dark-green wash so the text reads and the map stays a subtle backdrop */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-hero-from via-hero-from/60 to-hero-from/20" />

      {/* Content — absolute like the overlay (guaranteed above the map canvas) */}
      <div className="absolute inset-0 z-30 flex flex-col p-8">
        <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
          <Truck size={28} strokeWidth={2} />
        </span>
        <div className="mt-auto">
          <h3 className="mb-2 text-2xl font-black tracking-tight text-white">{title}</h3>
          <p className="mb-5 max-w-md text-base leading-relaxed text-white/80">{description}</p>
          <TransitionLink
            href="/location"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Suivre notre itinéraire
            <span aria-hidden="true">→</span>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
