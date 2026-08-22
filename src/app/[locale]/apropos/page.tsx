import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import MobilityMapCard from "@/components/apropos/MobilityMapCard";
import CountUp from "@/components/apropos/CountUp";
import RevealText from "@/components/apropos/RevealText";
import Reveal from "@/components/ui/Reveal";
import {
  MapPin,
  Truck,
  Award,
  HeartHandshake,
  Globe,
  Users,
  type LucideIcon,
} from "lucide-react";

// Light card surface: a soft teal tint + thin teal border — reads as an
// intentional block on the seafoam bg instead of a stark white box.
const CARD = "border border-primary/15 bg-primary/5";

// Larger elevated panel (wraps a whole section) — same tint but with a gentle
// shadow so the section reads as one raised box.
const PANEL = `${CARD} shadow-[0_24px_60px_-28px_rgba(16,58,44,0.45)]`;

// Highlight chunk for t.rich <hl> tags.
const hl = (chunks: ReactNode) => <span className="text-primary">{chunks}</span>;

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  const stats: (
    | { num: number; suffix: string; label: string }
    | { text: string; label: string }
  )[] = [
    { num: 15, suffix: "+", label: t("stats.experienceLabel") },
    { num: 3, suffix: "", label: t("stats.domainsLabel") },
    { text: t("stats.standardsValue"), label: t("stats.standardsLabel") },
    { text: t("stats.reachValue"), label: t("stats.reachLabel") },
  ];

  const points = [
    { Icon: Truck, title: t("points.mobileTitle"), desc: t("points.mobileDesc") },
    { Icon: Globe, title: t("points.standardsTitle"), desc: t("points.standardsDesc") },
    { Icon: Users, title: t("points.trainersTitle"), desc: t("points.trainersDesc") },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero — text + trust stats over the animated GLSL hills (client island) */}
      <section
        data-dark-hero
        className="relative flex min-h-[92vh] flex-col overflow-hidden bg-gradient-to-br from-hero-from to-hero-to px-6 pb-12 pt-32 text-center sm:px-10 lg:px-16"
      >
        <GLSLHills className="absolute inset-0 z-0" />

        {/* Title block — centred in the space above the stats */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
          <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-[2px] w-5 bg-primary" />
            {t("heroEyebrow")}
            <span className="h-[2px] w-5 bg-primary" />
          </p>
          <h1 className="mb-6 text-4xl font-black tracking-tighter text-white sm:text-5xl lg:text-7xl">
            {t.rich("heroTitle", { hl })}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70">
            {t.rich("heroSubtitle", {
              b: (chunks) => (
                <strong className="font-semibold text-white">{chunks}</strong>
              ),
            })}
          </p>
        </div>

        {/* Trust stats — merged into the hero, pinned near the bottom. */}
        <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
            >
              <span className="text-2xl font-black tracking-tighter text-white lg:text-3xl">
                {"num" in s ? (
                  <CountUp num={s.num} suffix={s.suffix} />
                ) : (
                  <RevealText>{s.text}</RevealText>
                )}
              </span>
              <span className="text-xs font-medium leading-snug text-white/60">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Le concept — formation mobile (story, text + icons) */}
      <section className="border-b border-black/10 px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <Reveal className="mx-auto max-w-6xl">
          <div className={`rounded-3xl p-8 lg:p-12 ${PANEL}`}>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <span className="h-[2px] w-5 bg-primary" />
                  {t("conceptEyebrow")}
                </p>
                <h2 className="mb-6 text-3xl font-black tracking-tighter text-graphite lg:text-4xl">
                  {t.rich("conceptTitle", { hl })}
                </h2>
                <div className="flex flex-col gap-4 text-sm leading-relaxed text-faded">
                  <p>{t("conceptP1")}</p>
                  <p>{t("conceptP2")}</p>
                  <p>{t("conceptP3")}</p>
                </div>
              </div>

              {/* Icon-accent points — rows separated by a subtle line */}
              <div className="flex flex-col">
                {points.map(({ Icon, title, desc }, i, arr) => (
                  <div
                    key={title}
                    className={`flex items-start gap-4 py-5 ${
                      i < arr.length - 1 ? "border-b border-primary/15" : ""
                    }`}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-graphite">{title}</h3>
                      <p className="text-sm leading-relaxed text-faded">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Nos Valeurs — bento */}
      <section className="border-b border-black/10 px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <Reveal className="mx-auto max-w-6xl">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-[2px] w-5 bg-primary" />
            {t("valuesEyebrow")}
          </p>
          <h2 className="mb-12 text-3xl font-black tracking-tighter text-graphite lg:text-4xl">
            {t.rich("valuesTitle", { hl })}
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[minmax(11rem,1fr)]">
            {/* Proximité — top-left */}
            <ValueCard
              icon={MapPin}
              title={t("values.proximity.title")}
              description={t("values.proximity.description")}
            />
            {/* Mobilité — feature card: live bus-route mini-map (2×2) */}
            <MobilityMapCard
              title={t("values.mobility.title")}
              description={t("values.mobility.description")}
              ctaLabel={t("mapCta")}
              className="sm:col-span-2 md:col-span-2 md:row-span-2"
            />
            {/* Expertise — under Proximité */}
            <ValueCard
              icon={Award}
              title={t("values.expertise.title")}
              description={t("values.expertise.description")}
            />
            {/* Accompagnement — full-width bottom */}
            <ValueCard
              icon={HeartHandshake}
              title={t("values.accompaniment.title")}
              description={t("values.accompaniment.description")}
              className="sm:col-span-2 md:col-span-3"
            />
          </div>
        </Reveal>
      </section>

      {/* Notre Équipe — testimonials (member data localized in a later step) */}
      <section className="border-b border-black/10 px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          <span className="h-[2px] w-5 bg-primary" />
          {t("teamEyebrow")}
        </p>
        <h2 className="mb-12 text-3xl font-black tracking-tighter text-graphite lg:text-4xl">
          {t.rich("teamTitle", { hl })}
        </h2>
        <div className="flex justify-center">
          <CircularTestimonials
            autoplay={true}
            colors={{
              name: "#07473f",
              designation: "#2e9e6b",
              testimony: "#7a96aa",
              arrowBackground: "#162436",
              arrowForeground: "#f1f1f7",
              arrowHoverBackground: "#2e9e6b",
            }}
            fontSizes={{ name: "24px", designation: "14px", quote: "15px" }}
            testimonials={[
              {
                name: "Mohamed Ben Ali",
                designation: t("team.m1.designation"),
                quote: t("team.m1.quote"),
                src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop",
              },
              {
                name: "Sarra Mansouri",
                designation: t("team.m2.designation"),
                quote: t("team.m2.quote"),
                src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop",
              },
              {
                name: "Karim Trabelsi",
                designation: t("team.m3.designation"),
                quote: t("team.m3.quote"),
                src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

// Single bento card.
function ValueCard({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 rounded-2xl p-6 ${CARD} ${className}`}>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon size={22} strokeWidth={2} />
      </span>
      <div>
        <h3 className="mb-1 text-lg font-black tracking-tight text-graphite">{title}</h3>
        <p className="text-sm leading-relaxed text-faded">{description}</p>
      </div>
    </div>
  );
}
