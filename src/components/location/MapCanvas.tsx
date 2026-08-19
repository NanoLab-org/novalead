"use client";

import { useEffect, useRef } from "react";
import {
  Map as MapLibreMap,
  Marker,
  Popup,
  LngLatBounds,
  NavigationControl,
  prewarm,
  setWorkerUrl,
  type GeoJSONSource,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { officeLocation, busStops } from "@/constants";

// ── Swap these to re-point / restyle the map ─────────────────────────────
// Keyless OpenFreeMap vector tiles — no token, no billing.
// Use ".../styles/liberty" for a warmer look, or drop in a MapTiler style URL
// later if we ever want a key-based style.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const CENTER: [number, number] = [officeLocation.lng, officeLocation.lat];
const ZOOM = officeLocation.zoom;

// Intro animation: start on the globe, zoomed out and offset in longitude, spin
// onto the office's longitude, then dive to street level.
const GLOBE_ZOOM = 0.5; // whole-earth view for the opening frame
const SPIN_LNG_OFFSET = 120; // start this many degrees west of the target
const SPIN_ZOOM = 2.4; // zoom the spin settles on before the final dive

// Brand teal for the WebGL route layer (matches --color-primary in globals.css;
// map paint properties need a literal color value, not a Tailwind class).
const ROUTE_COLOR = "#0d9488";
const ROUTE_SOURCE = "bus-route";

// Road-snapped routing via the keyless OSRM demo server (no token / no billing).
// It's a shared demo host — fine for this placeholder; for production traffic
// self-host OSRM or swap in a keyed provider (OpenRouteService / Mapbox).
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

// Ordered itinerary: office first, then each stop.
const ITINERARY: { name: string; lng: number; lat: number }[] = [
  { name: "Centre NovaLead", lng: officeLocation.lng, lat: officeLocation.lat },
  ...busStops.map((s) => ({ name: s.name, lng: s.lng, lat: s.lat })),
];

export default function MapCanvas({ showItinerary }: { showItinerary: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const stopMarkersRef = useRef<Marker[]>([]);

  // ── Create the map once ──────────────────────────────────────────────
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
      // Non-reduced: open on the globe, offset west so the spin lands on CENTER.
      center: reduced ? CENTER : [CENTER[0] - SPIN_LNG_OFFSET, CENTER[1]],
      zoom: reduced ? ZOOM : GLOBE_ZOOM,
      attributionControl: { compact: true },
      // Scroll won't hijack the page: zoom needs ctrl (desktop) / two fingers
      // (touch). MapLibre shows the "use ctrl + scroll" hint automatically.
      cooperativeGestures: true,
    });
    mapRef.current = map;

    map.addControl(
      new NavigationControl({ visualizePitch: true }),
      "bottom-right",
    );

    // Branded marker — the bus illustration (public/bus.png) floating over a
    // pulsing brand-teal ring. Built as a DOM element; Tailwind picks up the
    // class strings here and animate-ping drives the ring.
    const el = document.createElement("div");
    el.className = "relative grid place-items-center";
    el.innerHTML = `
      <span class="absolute inline-flex h-8 w-8 rounded-full bg-primary opacity-40 animate-ping"></span>
      <img src="/bus.png" alt="" class="relative h-12 w-12 object-contain drop-shadow-md" />
    `;
    const marker = new Marker({ element: el })
      .setLngLat(CENTER)
      .addTo(map);

    map.on("load", () => {
      // The map may have been created before the container had its final size
      // (dynamic-import mount race) — force it to read the real size and request
      // tiles, otherwise the tile layer stays blank while controls/marker show.
      map.resize();

      // Projection can only be set once the style has loaded (i.e. here).
      // Reduced-motion users get the flat map and stay put.
      if (reduced) {
        map.setProjection({ type: "mercator" });
        return;
      }
      map.setProjection({ type: "globe" });

      // Phase 1 — spin the globe onto the office's longitude (~1.2s, linear).
      map.easeTo({
        center: CENTER,
        zoom: SPIN_ZOOM,
        duration: 1200,
        easing: (t) => t,
      });
      // Phase 2 — once the spin lands, dive down to street level.
      map.once("moveend", () => {
        map.flyTo({ center: CENTER, zoom: ZOOM, duration: 2800, essential: true });
      });
    });

    // Keep the map matched to the container size on any later layout change.
    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(container);

    // Clean up the instance + markers on unmount to avoid WebGL/context leaks.
    return () => {
      resizeObserver.disconnect();
      stopMarkersRef.current.forEach((m) => m.remove());
      stopMarkersRef.current = [];
      marker.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Draw / clear the bus itinerary when the toggle changes ───────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const run = () => {
      if (showItinerary) drawItinerary(map, stopMarkersRef);
      else clearItinerary(map, stopMarkersRef);
    };

    if (map.isStyleLoaded()) run();
    else map.once("load", run);
  }, [showItinerary]);

  return <div ref={containerRef} className="h-full w-full" />;
}

// ── Itinerary helpers ──────────────────────────────────────────────────

function lineFeature(coordinates: [number, number][]) {
  return {
    type: "Feature" as const,
    properties: {},
    geometry: { type: "LineString" as const, coordinates },
  };
}

function fitToCoords(map: MapLibreMap, coords: [number, number][]) {
  const bounds = coords.reduce(
    (b, c) => b.extend(c),
    new LngLatBounds(coords[0], coords[0]),
  );
  map.fitBounds(bounds, {
    padding: { top: 90, right: 70, bottom: 210, left: 70 },
    duration: 1200,
    maxZoom: 14,
  });
}

// Ask OSRM for the driving path through the waypoints; returns road-snapped
// [lng, lat] points, or null on any failure (caller keeps the straight line).
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

async function drawItinerary(
  map: MapLibreMap,
  stopMarkersRef: { current: Marker[] },
) {
  const waypoints = ITINERARY.map((p) => [p.lng, p.lat] as [number, number]);

  // Route line (with a white casing underneath for contrast on any basemap).
  // Starts as a straight placeholder; upgraded to the road path once it loads.
  if (!map.getSource(ROUTE_SOURCE)) {
    map.addSource(ROUTE_SOURCE, { type: "geojson", data: lineFeature(waypoints) });
    map.addLayer({
      id: `${ROUTE_SOURCE}-casing`,
      type: "line",
      source: ROUTE_SOURCE,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": "#ffffff", "line-width": 8, "line-opacity": 0.9 },
    });
    map.addLayer({
      id: `${ROUTE_SOURCE}-line`,
      type: "line",
      source: ROUTE_SOURCE,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": ROUTE_COLOR, "line-width": 5 },
    });
  }

  // Pulsing markers at each stop (skip index 0 — that's the office/bus).
  if (stopMarkersRef.current.length === 0) {
    ITINERARY.slice(1).forEach((stop, i) => {
      const el = document.createElement("div");
      el.className = "relative grid place-items-center";
      el.innerHTML = `
        <span class="absolute inline-flex h-6 w-6 rounded-full bg-primary opacity-40 animate-ping"></span>
        <span class="relative grid h-6 w-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-white shadow-md ring-2 ring-white">${i + 1}</span>
      `;
      const marker = new Marker({ element: el })
        .setLngLat([stop.lng, stop.lat])
        .setPopup(new Popup({ offset: 16, closeButton: false }).setText(stop.name))
        .addTo(map);
      stopMarkersRef.current.push(marker);
    });
  }

  fitToCoords(map, waypoints);

  // Upgrade the straight placeholder to the actual road-snapped route.
  const road = await fetchRoadRoute(waypoints);
  if (!road) return; // request failed — keep the straight fallback
  const source = map.getSource(ROUTE_SOURCE) as GeoJSONSource | undefined;
  if (!source) return; // itinerary was toggled off while the request was in flight
  source.setData(lineFeature(road));
}

function clearItinerary(
  map: MapLibreMap,
  stopMarkersRef: { current: Marker[] },
) {
  // Only fly back to the office if an itinerary was actually showing — this
  // keeps the initial mount (nothing drawn yet) from hijacking the globe intro.
  const hadRoute = Boolean(map.getSource(ROUTE_SOURCE));

  for (const id of [`${ROUTE_SOURCE}-line`, `${ROUTE_SOURCE}-casing`]) {
    if (map.getLayer(id)) map.removeLayer(id);
  }
  if (map.getSource(ROUTE_SOURCE)) map.removeSource(ROUTE_SOURCE);

  stopMarkersRef.current.forEach((m) => m.remove());
  stopMarkersRef.current = [];

  if (hadRoute) {
    map.flyTo({ center: CENTER, zoom: ZOOM, duration: 1000, essential: true });
  }
}
