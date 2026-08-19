import LocationMap from "@/components/location/LocationMap";
import LocationCard from "@/components/location/LocationCard";

export default function LocationPage() {
  return (
    <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
      {/* Full-bleed animated map — client island, browser-only */}
      <LocationMap className="absolute inset-0 z-0" />

      {/* Floating glass card on desktop; collapsible bottom sheet on mobile */}
      <LocationCard />
    </section>
  );
}
