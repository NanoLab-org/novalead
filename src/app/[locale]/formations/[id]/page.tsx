import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/constants";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

// Prerender each formation per locale so getTranslations({locale}) resolves at
// build time (request-time locale resolution is unreliable on this setup).
export function generateStaticParams() {
  const ids = CATEGORIES.flatMap((cat) => cat.formations).map((f) => String(f.id));
  return routing.locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

export default async function FormationFiche({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Formation" });
  const tf = await getTranslations({ locale, namespace: "Formations" });

  const formation = CATEGORIES.flatMap((cat) => cat.formations).find(
    (f) => f.id === Number(id)
  );

  if (!formation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-graphite">
        <h1 className="text-3xl font-black mb-4">{t("notFoundTitle")}</h1>
        <Link href="/catalogue" className="text-primary hover:underline">
          {t("back")}
        </Link>
      </div>
    );
  }

  const onRequest = tf("onRequest");
  const objectives = tf.raw(`items.${id}.objectives`) as string[];

  return (
    <div className="min-h-screen bg-transparent">

      {/* Hero Banner */}
<div
  className="relative px-16 pt-36 pb-16 overflow-hidden"
  style={{
    backgroundImage: `url(${formation.img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#04211e]/95 via-[#04211e]/70 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#04211e] via-transparent to-transparent" />

  {/* Content */}
  <div className="relative z-10 text-center">
    <Link href="/catalogue" className="text-white/70 text-sm hover:text-graphite transition-colors mb-8 inline-block">
      <span className="inline-block rtl-flip">←</span> {t("back")}
    </Link>
    <div className="flex gap-3 mb-6 text-center justify-center">
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-center">{tf(`levels.${formation.niveau}`)}</span>
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/70 border border-black/20 text-center">{tf("format")}</span>
    </div>
    <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-6 max-w-3xl text-center mx-auto">
      {tf(`items.${id}.titre`)}
    </h1>
    <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-8 text-center mx-auto">
      {tf(`items.${id}.description`)}
    </p>
    <div className="flex gap-8 text-sm text-white/70">
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {/* Left — Objectifs + Prérequis */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Objectifs */}
          <div className="bg-surface shadow-card rounded-2xl p-8">
            <h2 className="text-graphite font-black text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {t("objectives")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 bg-transparent rounded-xl p-4">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-muted text-sm leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prérequis */}
          <div className="bg-surface shadow-card rounded-2xl p-8">
            <h2 className="text-graphite font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              {t("prerequisites")}
            </h2>
            <p className="text-muted text-sm leading-relaxed">{onRequest}</p>
          </div>

        </div>

        {/* Right — Sidebar */}
        <div className="flex flex-col gap-6">

          {/* Infos pratiques */}
          <div className="bg-surface shadow-card rounded-2xl p-6 sticky top-28">
            <h2 className="text-graphite font-black text-base mb-5">{t("practicalInfo")}</h2>
            <div className="flex flex-col gap-4 text-sm mb-6">
              {[
                { label: t("duration"), value: onRequest },
                { label: t("format"), value: tf("format") },
                { label: t("level"), value: tf(`levels.${formation.niveau}`) },
                { label: t("seats"), value: onRequest },
                { label: t("certification"), value: onRequest },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1 pb-4 border-b border-black/5 last:border-0 last:pb-0">
                  <span className="text-faded text-xs uppercase tracking-widest">{item.label}</span>
                  <span className="text-graphite font-semibold">{item.value}</span>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <span className="text-faded text-xs uppercase tracking-widest">{t("price")}</span>
                <span className="text-primary font-black text-2xl">{onRequest}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="block w-full bg-primary text-white font-semibold text-sm px-6 py-4 rounded-xl hover:opacity-90 transition-opacity text-center mb-3"
            >
              {t("enroll")}
            </Link>
            <Link
              href="/contact"
              className="block w-full bg-transparent text-graphite font-medium text-sm px-6 py-3 rounded-xl border border-black/15 hover:border-primary hover:text-primary transition-colors text-center"
            >
              {t("moreInfo")}
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-hero-from to-hero-to px-16 py-16 text-center">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{t("ctaEyebrow")}</p>
        <h2 className="text-3xl font-black text-white mb-4">{t("ctaTitle")}</h2>
        <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
          {t("ctaText")}
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/contact" className="bg-primary text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
            {t("ctaEnroll")}
          </Link>
          <Link href="/catalogue" className="bg-white/10 text-graphite font-medium px-8 py-3 rounded-full hover:bg-white/20 transition-colors">
            {t("ctaOther")}
          </Link>
        </div>
      </div>

    </div>
  );
}
