"use client";

import dynamic from "next/dynamic";

// MapLibre touches window / WebGL, so it must never render on the server.
// ssr:false is only allowed inside a Client Component — hence this wrapper.
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  // Fixed-size placeholder → no layout shift before the map mounts.
  loading: () => (
    <div className="h-full w-full animate-pulse bg-stone" aria-hidden="true" />
  ),
});

export default function LocationMap({
  className,
  showItinerary = false,
}: {
  className?: string;
  showItinerary?: boolean;
}) {
  return (
    <div className={className}>
      <MapCanvas showItinerary={showItinerary} />
    </div>
  );
}
