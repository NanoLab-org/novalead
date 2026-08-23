import { useTranslations } from "next-intl";
import { contactInfo, openingHours, mapEmbedUrl } from "@/constants";

export default function Location() {
  const t = useTranslations("Home.location");
  const tLoc = useTranslations("Location");
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>;
  const addressLines = tLoc.raw("addressLines") as string[];

  return (
    <section id="location" className="px-10 py-24 border-b border-black/10">

      <div className="mb-12">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-5 h-[2px] bg-primary" />
          {t("eyebrow")}
        </p>
        <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter">
          {t.rich("title", { hl })}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        <div className="flex flex-col gap-6">

          <div className="glass-card rounded-xl p-6">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{t("addressLabel")}</p>
            <p className="text-graphite font-semibold text-sm mb-1">{tLoc("addressName")}</p>
            <p className="text-muted text-sm leading-relaxed">
              {addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{t("contactLabel")}</p>
            <div className="flex flex-col gap-2">
              {contactInfo.map((c) => (
                <div key={c.key} className="flex items-center gap-3">
                  <span className="text-primary text-sm">{tLoc(`contactLabels.${c.key}`)}</span>
                  <span className="text-muted text-sm" dir="ltr">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{t("hoursLabel")}</p>
            <div className="flex flex-col gap-2 text-sm">
              {openingHours.map((o) => (
                <div key={o.key} className="flex justify-between">
                  <span className="text-muted">{tLoc(`days.${o.key}`)}</span>
                  {o.closed ? (
                    <span className="text-primary font-medium">{tLoc("closed")}</span>
                  ) : (
                    <span className="text-graphite font-medium" dir="ltr">{o.hours}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="rounded-xl overflow-hidden border border-black/10 h-[500px]">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}
