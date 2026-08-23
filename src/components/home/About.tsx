import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Structural only — the four values' text lives once in messages (About.values.*),
// shared with the /apropos page. Here we keep just the order + accent colour.
const VALUE_KEYS = [
  { key: "proximity", color: "border-primary" },
  { key: "mobility", color: "border-secondary" },
  { key: "expertise", color: "border-primary" },
  { key: "accompaniment", color: "border-secondary" },
] as const;

export default function About() {
  const t = useTranslations("Home.about");
  const tv = useTranslations("About.values");
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>;

  return (
    <section id="about" className="px-10 py-24 border-b border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-5 h-[2px] bg-primary" />
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-graphite tracking-tighter leading-tight mb-6">
            {t.rich("title", { hl })}
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-6">{t("p1")}</p>
          <p className="text-muted text-sm leading-relaxed mb-10">{t("p2")}</p>
          <div className="flex gap-3">
            <Link href="/catalogue" className="bg-primary text-white font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
              {t("ctaFormations")}
            </Link>
            <Link href="/contact" className="bg-transparent text-faded font-medium text-sm px-5 py-3 rounded-md border border-black/20 hover:border-white/40 transition-colors inline-block">
              {t("ctaContact")}
            </Link>
          </div>
        </div>

        {/* Right — Values */}
        <div className="flex flex-col gap-4">
          {VALUE_KEYS.map((v) => (
            <div
              key={v.key}
              className={`glass-card border-s-4 ${v.color} px-6 py-5 rounded-e-xl`}
            >
              <h4 className="text-graphite font-bold text-sm mb-1">{tv(`${v.key}.title`)}</h4>
              <p className="text-muted text-xs leading-relaxed">{tv(`${v.key}.description`)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
