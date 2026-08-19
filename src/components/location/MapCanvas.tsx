"use client";

import { useEffect, useRef } from "react";
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  prewarm,
  setWorkerUrl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { officeLocation } from "@/constants";

// ── Swap these to re-point / restyle the map ─────────────────────────────
// Keyless OpenFreeMap vector tiles — no token, no billing.
// Use ".../styles/liberty" for a warmer look, or drop in a MapTiler style URL
// later if we ever want a key-based style.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const CENTER: [number, number] = [officeLocation.lng, officeLocation.lat];
const ZOOM = officeLocation.zoom;

export default function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Serve MapLibre's worker from /public (copied there by
    // scripts/sync-maplibre-worker.mjs). Turbopack doesn't emit the worker
    // beside the bundled chunk, so MapLibre's self-derived worker URL 404s and
    // no tiles/glyphs are ever fetched. This points it at a URL that resolves.
    setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

    // Keep the shared worker pool alive across React StrictMode's dev
    // double-mount so the second (visible) map instance keeps a live worker.
    prewarm();

    // Respect the user's motion preference: fly in for everyone else.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const map = new MapLibreMap({
      container,
      style: STYLE_URL,
      center: CENTER,
      zoom: reduced ? ZOOM : 3.2, // start zoomed out, then fly to CENTER on load
      attributionControl: { compact: true },
      // Scroll won't hijack the page: zoom needs ctrl (desktop) / two fingers
      // (touch). MapLibre shows the "use ctrl + scroll" hint automatically.
      cooperativeGestures: true,
    });

    map.addControl(
      new NavigationControl({ visualizePitch: true }),
      "bottom-right",
    );

    // Branded pulsing marker — a DOM element, not the default teardrop.
    // Tailwind's animate-ping drives the ring; bg-primary is the brand teal.
    const el = document.createElement("div");
    el.className = "grid place-items-center";
    el.innerHTML = `
      <span class="absolute inline-flex h-7 w-7 rounded-full bg-primary opacity-50 animate-ping"></span>
      <span class="relative inline-flex h-4 w-4 rounded-full bg-primary shadow-md ring-2 ring-white"></span>
    `;
    const marker = new Marker({ element: el })
      .setLngLat(CENTER)
      .addTo(map);

    map.on("load", () => {
      // The map may have been created before the container had its final size
      // (dynamic-import mount race) — force it to read the real size and request
      // tiles, otherwise the tile layer stays blank while controls/marker show.
      map.resize();
      if (!reduced) {
        map.flyTo({ center: CENTER, zoom: ZOOM, duration: 2600, essential: true });
      }
    });

    // Keep the map matched to the container size on any later layout change.
    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(container);

    // Clean up the instance + marker on unmount to avoid WebGL/context leaks.
    return () => {
      resizeObserver.disconnect();
      marker.remove();
      map.remove();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}
