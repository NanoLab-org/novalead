"use client";

import { useState } from "react";
import LocationMap from "./LocationMap";
import LocationCard from "./LocationCard";

// Owns the one piece of state the map and the card share: whether the bus
// itinerary is currently drawn on the map.
export default function LocationView() {
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <>
      <LocationMap className="absolute inset-0 z-0" showItinerary={showItinerary} />
      <LocationCard
        itineraryActive={showItinerary}
        onToggleItinerary={() => setShowItinerary((v) => !v)}
      />
    </>
  );
}
