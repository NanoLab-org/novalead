import { GLSLHills } from "@/components/ui/glsl-hills";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import MobilityMapCard from "@/components/apropos/MobilityMapCard";
import CountUp from "@/components/apropos/CountUp";
import RevealText from "@/components/apropos/RevealText";
import { values } from "@/constants";
import {
  MapPin,
  Truck,
  Award,
  HeartHandshake,
  Globe,
  Users,
  type LucideIcon,
} from "lucide-react";

const VALUE_ICONS: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  truck: Truck,
  award: Award,
  "heart-handshake": HeartHandshake,
};

// Light card surface: a soft teal tint + thin teal border — reads as an
// intentional block on the seafoam bg instead of a stark white box.
const CARD = "border border-primary/15 bg-primary/5";

// Larger elevated panel (wraps a whole section) — same tint but with a gentle
// shadow so the section reads as one raised box.
const PANEL = `${CARD} shadow-[0_24px_60px_-28px_rgba(16,58,44,0.45)]`;

// Numeric stats (num/suffix) count up on scroll; text stats render as-is.
const STATS: (
  | { num: number; suffix: string; label: string }
  | { text: string; label: string }
)[] = [
  { num: 15, suffix: "+", label: "ans d'expérience en France" },
  { num: 3, suffix: "", label: "domaines d'expertise" },
  { text: "UE", label: "standards européens" },
  { text: "Mobile", label: "partout en Tunisie" },
];

export default function AProposPage() {
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
            À propos de NovaLead
            <span className="h-[2px] w-5 bg-primary" />
          </p>
          <h1 className="mb-6 text-4xl font-black tracking-tighter text-white sm:text-5xl lg:text-7xl">
            Former les techniciens, <br />
            <span className="text-primary">partout en Tunisie</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70">
            Un centre de formation <strong className="font-semibold text-white">mobile</strong>{" "}
            spécialisé en fibre optique, photovoltaïque et bornes de recharge (IRVE) — fort de plus
            de 15 ans d&apos;expérience en France.
          </p>
        </div>

        {/* Trust stats — merged into the hero, pinned near the bottom.
            Glass tiles: backdrop-blur actually bites here, over the shader. */}
        <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
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

      {/* Le concept — formation mobile (story, text + icons, fully server) */}
      <section className="border-b border-black/10 px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        {/* Whole section wrapped in one elevated panel */}
        <div className={`mx-auto max-w-6xl rounded-3xl p-8 lg:p-12 ${PANEL}`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                <span className="h-[2px] w-5 bg-primary" />
                Le concept
              </p>
              <h2 className="mb-6 text-3xl font-black tracking-tighter text-graphite lg:text-4xl">
                La formation <span className="text-primary">vient à vous</span>
              </h2>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-faded">
                <p>
                  Au lieu d&apos;attendre les stagiaires dans une salle de cours traditionnelle, nous
                  nous déplaçons directement dans les différentes régions de Tunisie afin de rendre la
                  formation accessible au plus grand nombre.
                </p>
                <p>
                  Avec plus de 15 ans d&apos;expérience en France dans la fibre optique, le
                  photovoltaïque et les bornes de recharge (IRVE), nous transmettons un savoir-faire
                  professionnel basé sur les méthodes et standards européens.
                </p>
                <p>
                  Notre objectif est simple : former des techniciens qualifiés grâce à des formations
                  pratiques, concrètes et adaptées aux besoins du marché.
                </p>
              </div>
            </div>

            {/* Icon-accent points — rows separated by a subtle line */}
            <div className="flex flex-col">
              {[
                {
                  Icon: Truck,
                  titre: "Formation mobile",
                  desc: "Nous venons à votre rencontre, dans votre région.",
                },
                {
                  Icon: Globe,
                  titre: "Standards européens",
                  desc: "Un savoir-faire hérité de 15+ ans d'expérience en France.",
                },
                {
                  Icon: Users,
                  titre: "Formateurs en activité",
                  desc: "Encadrement par des professionnels du terrain, sur matériel pro.",
                },
              ].map(({ Icon, titre, desc }, i, arr) => (
                <div
                  key={titre}
                  className={`flex items-start gap-4 py-5 ${
                    i < arr.length - 1 ? "border-b border-primary/15" : ""
                  }`}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-graphite">{titre}</h3>
                    <p className="text-sm leading-relaxed text-faded">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs — bento (fully server) */}
      <section className="border-b border-black/10 px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-[2px] w-5 bg-primary" />
            Nos Valeurs
          </p>
          <h2 className="mb-12 text-3xl font-black tracking-tighter text-graphite lg:text-4xl">
            Ce qui nous <span className="text-primary">définit</span>
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[minmax(11rem,1fr)]">
            {/* Proximité — top-left */}
            <ValueCard value={values[0]} />
            {/* Mobilité — feature card: live bus-route mini-map (2×2) */}
            <MobilityMapCard
              title={values[1].titre}
              description={values[1].description}
              className="sm:col-span-2 md:col-span-2 md:row-span-2"
            />
            {/* Expertise — under Proximité */}
            <ValueCard value={values[2]} />
            {/* Accompagnement — full-width bottom */}
            <ValueCard value={values[3]} className="sm:col-span-2 md:col-span-3" />
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="border-b border-black/10 px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          <span className="h-[2px] w-5 bg-primary" />
          Notre Équipe
        </p>
        <h2 className="mb-12 text-3xl font-black tracking-tighter text-graphite lg:text-4xl">
          Des experts <span className="text-primary">du terrain</span>
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
                designation: "Directeur & Formateur Senior — Fibre Optique",
                quote:
                  "Passionné par la transmission du savoir technique, j'accompagne chaque stagiaire vers une maîtrise complète des réseaux fibre optique FTTH, du tirage jusqu'au raccordement.",
                src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop",
              },
              {
                name: "Sarra Mansouri",
                designation: "Formatrice — Énergie Solaire",
                quote:
                  "Mon objectif est de rendre les énergies renouvelables accessibles à tous les techniciens. Chaque installation photovoltaïque réussie est une victoire pour la transition énergétique.",
                src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop",
              },
              {
                name: "Karim Trabelsi",
                designation: "Formateur — Bornes de Recharge (IRVE)",
                quote:
                  "La mobilité électrique explose. Ma mission est de préparer les techniciens à installer et maintenir les bornes de recharge selon les normes en vigueur.",
                src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

// Single bento card. `feature` makes it the larger, centered highlight tile.
function ValueCard({
  value,
  feature = false,
  className = "",
}: {
  value: { titre: string; icon: string; description: string };
  feature?: boolean;
  className?: string;
}) {
  const Icon = VALUE_ICONS[value.icon] ?? MapPin;
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl ${
        feature
          ? "justify-center bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-[0_18px_40px_-22px_rgba(13,148,136,0.55)]"
          : `${CARD} p-6`
      } ${className}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-xl ${
          feature ? "h-14 w-14 bg-white/15 text-white" : "h-11 w-11 bg-primary/10 text-primary"
        }`}
      >
        <Icon size={feature ? 28 : 22} strokeWidth={2} />
      </span>
      <div>
        <h3
          className={`font-black tracking-tight ${
            feature ? "mb-2 text-2xl text-white" : "mb-1 text-lg text-graphite"
          }`}
        >
          {value.titre}
        </h3>
        <p
          className={`leading-relaxed ${
            feature ? "text-base text-white/75" : "text-sm text-faded"
          }`}
        >
          {value.description}
        </p>
      </div>
    </div>
  );
}
