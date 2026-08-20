"use client";

import { useEffect, useRef } from "react";
import {
  Map as MapLibreMap,
  Marker,
  LngLatBounds,
  prewarm,
  setWorkerUrl,
  type GeoJSONSource,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { officeLocation, busStops } from "@/constants";

// Decorative, NON-interactive mini-map for the À propos "Mobilité" card: shows
// the bus + its route across Tunisia, meant to sit under a dark overlay.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const ROUTE_COLOR = "#0d9488"; // --color-primary
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";
const WAYPOINTS: [number, number][] = [
  [officeLocation.lng, officeLocation.lat],
  ...busStops.map((s) => [s.lng, s.lat] as [number, number]),
];

function lineFeature(coordinates: [number, number][]) {
  return {
    type: "Feature" as const,
    properties: {},
    geometry: { type: "LineString" as const, coordinates },
  };
}

async function fetchRoadRoute(
  waypoints: [number, number][],
): Promise<[number, number][] | null> {
  const path = waypoints.map(([lng, lat]) => `${lng},${lat}`).join(";");
  try {
    const res = await fetch(`${OSRM_URL}/${path}?overview=full&geometries=geojson`);
    if (!res.ok) return null;
    const data = await res.json();
    const line = data?.routes?.[0]?.geometry?.coordinates;
    return Array.isArray(line) ? (line as [number, number][]) : null;
  } catch {
    return null;
  }
}

export default function MobilityMiniMap({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Same worker fix as the location map (Turbopack doesn't emit MapLibre's
    // worker beside the bundled chunk — see scripts/sync-maplibre-worker.mjs).
    setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
    prewarm();

    const map = new MapLibreMap({
      container,
      style: STYLE_URL,
      center: [officeLocation.lng, officeLocation.lat],
      zoom: 9,
      interactive: false, // decorative — never steals scroll or clicks
      attributionControl: { compact: true },
    });

    // Bus marker at the office.
    const el = document.createElement("div");
    el.className = "relative grid place-items-center";
    el.innerHTML = `
      <span class="absolute inline-flex h-7 w-7 rounded-full bg-primary opacity-40 animate-ping"></span>
      <img src="/bus.png" alt="" class="relative h-10 w-10 object-contain drop-shadow-md" />
    `;
    const marker = new Marker({ element: el })
      .setLngLat([officeLocation.lng, officeLocation.lat])
      .addTo(map);

    map.on("load", () => {
      map.resize();

      map.addSource("route", { type: "geojson", data: lineFeature(WAYPOINTS) });
      map.addLayer({
        id: "route-casing",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#ffffff", "line-width": 6, "line-opacity": 0.85 },
      });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": ROUTE_COLOR, "line-width": 3 },
      });

      // Stop dots.
      busStops.forEach((s) => {
        const dot = document.createElement("div");
        dot.className =
          "h-3 w-3 rounded-full bg-primary ring-2 ring-white shadow";
        new Marker({ element: dot }).setLngLat([s.lng, s.lat]).addTo(map);
      });

      const bounds = WAYPOINTS.reduce(
        (b, c) => b.extend(c),
        new LngLatBounds(WAYPOINTS[0], WAYPOINTS[0]),
      );
      map.fitBounds(bounds, {
        padding: { top: 48, right: 48, bottom: 120, left: 48 },
        duration: 0,
      });

      // Upgrade the straight placeholder to the real road-snapped route.
      fetchRoadRoute(WAYPOINTS).then((road) => {
        if (!road) return;
        const source = map.getSource("route") as GeoJSONSource | undefined;
        source?.setData(lineFeature(road));
      });
    });

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      marker.remove();
      map.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
