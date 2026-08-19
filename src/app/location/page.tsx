import LocationMap from "@/components/location/LocationMap";
import { address, contactInfo, openingHours, officeLocation } from "@/constants";

const { lat, lng } = officeLocation;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
const openInMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

// Turn the shared contactInfo rows into real tel:/mailto:/wa.me links.
function contactHref(label: string, value: string) {
  const digits = value.replace(/[^\d+]/g, "");
  const key = label.toLowerCase();
  if (key.includes("mail")) return `mailto:${value}`;
  if (key.includes("whats")) return `https://wa.me/${digits.replace("+", "")}`;
  return `tel:${digits}`;
}

export default function LocationPage() {
  return (
    <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
      {/* Full-bleed animated map — client island, browser-only */}
      <LocationMap className="absolute inset-0 z-0" />

      {/* Floating frosted-glass info card:
          bottom-left on desktop, full-width at the bottom on mobile. */}
      <div className="absolute inset-x-4 bottom-4 z-10 flex max-h-[78vh] flex-col gap-5 overflow-y-auto rounded-2xl border border-white/40 bg-white/70 p-6 text-graphite shadow-card backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[22rem] lg:bottom-10 lg:left-10">
        {/* Adresse */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            Adresse
          </p>
          <p className="font-bold">{address.name}</p>
          {address.lines.map((line) => (
            <p key={line} className="text-sm text-muted">
              {line}
            </p>
          ))}
        </div>

        {/* Contact direct */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            Contact direct
          </p>
          <ul className="flex flex-col gap-2">
            {contactInfo.map((c) => {
              const href = contactHref(c.label, c.value);
              const external = href.startsWith("http");
              return (
                <li
                  key={c.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-faint">
                    {c.label}
                  </span>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="rounded text-sm font-medium transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {c.value}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Horaires d'ouverture */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            Horaires d&apos;ouverture
          </p>
          <ul className="flex flex-col gap-1.5 text-sm">
            {openingHours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="text-muted">{h.day}</span>
                <span
                  className={
                    h.closed ? "font-semibold text-error" : "font-semibold"
                  }
                >
                  {h.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir l'itinéraire vers le centre dans Google Maps"
            className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Itinéraire
          </a>
          <a
            href={openInMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir la localisation du centre dans Google Maps"
            className="flex-1 rounded-full border border-primary/40 px-4 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Ouvrir dans Maps
          </a>
        </div>
      </div>
    </section>
  );
}
