import LocationView from "@/components/location/LocationView";

export default function LocationPage() {
  return (
    <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
      {/* Full-bleed animated map + glass info card (shared itinerary state) */}
      <LocationView />
    </section>
  );
}
