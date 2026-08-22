"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronUp } from "lucide-react";
import { address, contactInfo, openingHours, officeLocation } from "@/constants";

const { lat, lng } = officeLocation;
const openInMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

// Turn the shared contactInfo rows into real tel:/mailto:/wa.me links.
function contactHref(label: string, value: string) {
  const digits = value.replace(/[^\d+]/g, "");
  const key = label.toLowerCase();
  if (key.includes("mail")) return `mailto:${value}`;
  if (key.includes("whats")) return `https://wa.me/${digits.replace("+", "")}`;
  return `tel:${digits}`;
}

export default function LocationCard({
  itineraryActive,
  onToggleItinerary,
}: {
  itineraryActive: boolean;
  onToggleItinerary: () => void;
}) {
  const t = useTranslations("Location");
  // Collapsed on mobile by default; on desktop the body is always shown (the
  // sm: classes below force it open regardless of this state).
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[22rem] lg:bottom-10 lg:left-10">
      <div className="overflow-hidden rounded-t-3xl border border-white/60 bg-white/55 text-graphite shadow-card ring-1 ring-white/20 backdrop-blur-2xl backdrop-saturate-150 sm:rounded-2xl">
        {/* Mobile peek header — tap to expand/collapse. Hidden on desktop. */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="location-details"
          className="w-full sm:hidden"
        >
          <span className="mx-auto mt-2.5 block h-1.5 w-10 rounded-full bg-graphite/20" />
          <span className="flex items-center gap-3 px-5 py-3 text-start">
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-widest text-primary">
                {t("heroEyebrow")}
              </span>
              <span className="block font-bold">{address.name}</span>
            </span>
            <ChevronUp
              className={`ms-auto h-5 w-5 shrink-0 text-faint transition-transform duration-300 ${
                open ? "" : "rotate-180"
              }`}
            />
          </span>
        </button>

        {/* Body: collapsible on mobile (grid-rows 0fr→1fr animates height),
            always expanded on desktop via sm:grid-rows-[1fr]. */}
        <div
          id="location-details"
          className={`grid transition-[grid-template-rows] duration-300 ease-out sm:grid-rows-[1fr] ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex max-h-[70vh] flex-col gap-5 overflow-y-auto px-5 pb-5 sm:max-h-[78vh] sm:p-6">
              {/* Adresse */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                  {t("address")}
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
                  {t("contactDirect")}
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
                  {t("hours")}
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
                <button
                  type="button"
                  onClick={onToggleItinerary}
                  aria-pressed={itineraryActive}
                  aria-label={itineraryActive ? t("hideItineraryAria") : t("itineraryAria")}
                  className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:bg-primary-dark"
                >
                  {itineraryActive ? t("hideItinerary") : t("itinerary")}
                </button>
                <a
                  href={openInMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("openInMapsAria")}
                  className="flex-1 rounded-full border border-primary/40 px-4 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("openInMaps")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
