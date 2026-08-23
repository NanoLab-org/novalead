// (The old `formations` array was removed — formation data now lives once in
//  CATEGORIES below, consumed by the catalogue, the detail page and the home
//  slideshow.)

// ─── Navbar ───────────────────────────────────────────────────────────────────

// `key` maps to the Nav namespace in the message catalogs (labels are translated).
export const navLinks = [
  { key: "about", href: "/apropos" },
  { key: "catalogue", href: "/catalogue" },
  { key: "location", href: "/location" },
  { key: "contact", href: "/contact" },
] as const;

// ─── Contact / hours ─────────────────────────────────────────────────────────

// `key` maps to the Location.contactLabels / Location.days message keys.
// Values (phone/email/hours) are locale-invariant and stay here.
export const contactInfo = [
  { key: "tel", value: "+216 XX XXX XXX" },
  { key: "email", value: "contact@novalead.tn" },
  { key: "whatsapp", value: "+216 XX XXX XXX" },
];

export const openingHours: { key: string; hours?: string; closed: boolean }[] = [
  { key: "weekdays", hours: "08h00 - 18h00", closed: false },
  { key: "saturday", hours: "09h00 - 13h00", closed: false },
  { key: "sunday", closed: true },
];

// Office coordinates — single source of truth for the map + the "Itinéraire" /
// "Ouvrir dans Maps" links. Placeholder Tunis center for now; swap lat/lng/zoom.
export const officeLocation = {
  lat: 36.8065,
  lng: 10.1815,
  zoom: 15,
};

// Monthly bus itinerary — the ordered stops the shuttle serves, starting from
// the office (officeLocation). Placeholder Tunis-area coords; swap freely.
export const busStops = [
  { name: "Arrêt Les Berges du Lac", lat: 36.833, lng: 10.227 },
  { name: "Arrêt Ariana Centre", lat: 36.8625, lng: 10.193 },
  { name: "Arrêt Le Bardo", lat: 36.809, lng: 10.14 },
];

// Google Maps embed for the office location (Tunis)
export const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102115.39799550319!2d10.074691!3d36.806389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis!5e0!3m2!1sfr!2stn!4v1234567890";


// ─── Catalogue ───────────────────────────────────────────────────────────────

// Structural data only — translatable text (category labels/descriptions,
// formation titles/descriptions/objectives, levels, "Sur demande") lives in the
// Formations message namespace, keyed by category id and formation id.
export const CATEGORIES = [
  {
    id: "fibre",
    locked: false,
    formations: [
      { id: 1, img: "https://images.unsplash.com/photo-1520869562399-e772f042f422?w=1600&q=80", niveau: "beginner" },
      { id: 2, img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=80", niveau: "intermediate" },
      { id: 3, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80", niveau: "advanced" },
    ],
  },
  {
    id: "photovoltaique",
    locked: false,
    formations: [
      { id: 4, img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80", niveau: "beginner" },
      { id: 5, img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80", niveau: "intermediate" },
      { id: 6, img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80", niveau: "advanced" },
    ],
  },
  {
    id: "irve",
    locked: false,
    formations: [
      { id: 7, img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80", niveau: "beginner" },
      { id: 8, img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80", niveau: "intermediate" },
      { id: 9, img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80", niveau: "advanced" },
    ],
  },
];
