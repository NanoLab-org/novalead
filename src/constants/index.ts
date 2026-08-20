// (The old `formations` array was removed — formation data now lives once in
//  CATEGORIES below, consumed by the catalogue, the detail page and the home
//  slideshow.)

export const domainColors: Record<string, string> = {
  "Fibre Optique": "bg-secondary/20 text-secondary border-secondary/40",
  Photovoltaïque: "bg-primary/10 text-primary border-primary/25",
  Électricité: "bg-primary/10 text-primary border-primary/25",
  Télécoms: "bg-secondary/20 text-secondary border-secondary/40",
  Énergie: "bg-primary/10 text-primary border-primary/25",
};


// ─── About ───────────────────────────────────────────────────────────────────

// The four values NovaLead is built on. Order is meaningful — the À propos
// bento uses it (Mobilité is the feature card). `icon` maps to a lucide icon.
export const values = [
  {
    titre: "Proximité",
    icon: "map-pin",
    color: "border-primary",
    description:
      "Nous venons à votre rencontre, partout en Tunisie, pour rendre la formation accessible au plus grand nombre.",
  },
  {
    titre: "Mobilité",
    icon: "truck",
    color: "border-secondary",
    description:
      "Un concept de formation mobile : nous nous déplaçons dans les régions au lieu d'attendre les stagiaires en salle.",
  },
  {
    titre: "Expertise",
    icon: "award",
    color: "border-primary",
    description:
      "Plus de 15 ans d'expérience en France en fibre optique, photovoltaïque et IRVE, selon les standards européens.",
  },
  {
    titre: "Accompagnement",
    icon: "heart-handshake",
    color: "border-secondary",
    description:
      "Un suivi concret et personnalisé pour construire votre avenir professionnel et répondre aux besoins du marché.",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const heroTags = [
  "Photovoltaïque",
  "Fibre optique",
  "Télécoms",
  "Certifiant",
  "Éco-responsable",
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "À propos", href: "/apropos" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Localisation", href: "/location" },
  { label: "Contact", href: "/contact" },
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footerLinks = ["Catalogue", "À propos", "Localisation", "Contact"];

export const contactInfo = [
  { label: "Tel", value: "+216 XX XXX XXX" },
  { label: "Email", value: "contact@novalead.tn" },
  { label: "WhatsApp", value: "+216 XX XXX XXX" },
];

export const openingHours = [
  { day: "Lundi - Vendredi", hours: "08h00 - 18h00", closed: false },
  { day: "Samedi", hours: "09h00 - 13h00", closed: false },
  { day: "Dimanche", hours: "Fermé", closed: true },
];

export const address = {
  name: "Centre NovaLead",
  lines: ["Rue Lorem Ipsum, Immeuble Dolor Sit", "1000 Tunis, Tunisie"],
};

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

// Real NovaLead offering. `duree`, `niveau`, `places`, `prix`, `prerequis` and
// `certification` are "Sur demande" until the client provides them; `programme`
// (day-by-day) is empty for now — only the topic list (`objectifs`) is known.
// Images are placeholders (no real photos yet).
export const CATEGORIES = [
  {
    id: "fibre",
    label: "Fibre Optique",
    description:
      "Installation, raccordement, soudure et mesures des réseaux fibre optique FTTH, de la conception jusqu'au raccordement de l'abonné.",
    locked: false,
    formations: [
      {
        id: 1,
        img: "https://images.unsplash.com/photo-1520869562399-e772f042f422?w=1600&q=80",
        titre: "Fibre Optique — Initiation & Fondamentaux",
        duree: "Sur demande",
        niveau: "Débutant",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Comprenez l'architecture des réseaux FTTH et les bases du déploiement fibre, de la lecture de plans jusqu'au tirage des câbles.",
        objectifs: [
          "Fondamentaux : principe de la fibre, types de fibres, architecture FTTH (NRO, PM, PBO, PTO), normes",
          "Lecture de plans : synoptiques, plans de boîtes, repérage terrain, codes couleurs",
          "Tirage et déploiement : aérien, souterrain, façade et colonne montante",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
      {
        id: 2,
        img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1600&q=80",
        titre: "Fibre Optique — Raccordement & Soudure",
        duree: "Sur demande",
        niveau: "Intermédiaire",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Maîtrisez le raccordement optique : préparation, clivage, soudure par fusion, connectorisation et raccordement client (D3).",
        objectifs: [
          "Raccordement : préparation, clivage, soudure par fusion, connectorisation, lovages",
          "Raccordement client (D3) : pose de PTO, mise en service de la box, relation client",
          "Sécurité : EPI, travaux en hauteur, AIPR, habilitations",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
      {
        id: 3,
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
        titre: "Fibre Optique — Mesures & Recette",
        duree: "Sur demande",
        niveau: "Avancé",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Contrôlez la qualité du réseau : photométrie, réflectométrie OTDR, bilan optique et livrables de recette.",
        objectifs: [
          "Mesures et contrôles : photométrie, réflectométrie (OTDR), bilan optique",
          "Recette et livrables : PV de recette, comptes rendus, reportage photo",
          "Interprétation des courbes et diagnostic des défauts",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
    ],
  },
  {
    id: "photovoltaique",
    label: "Photovoltaïque",
    description:
      "Conception, pose et maintenance des installations solaires photovoltaïques résidentielles et professionnelles.",
    locked: false,
    formations: [
      {
        id: 4,
        img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
        titre: "Photovoltaïque — Conception & Dimensionnement",
        duree: "Sur demande",
        niveau: "Débutant",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Étudiez et dimensionnez une installation solaire, des bases de l'énergie solaire jusqu'à la lecture des plans électriques.",
        objectifs: [
          "Bases de l'énergie solaire",
          "Étude et dimensionnement d'une installation",
          "Lecture de plans électriques",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
      {
        id: 5,
        img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
        titre: "Photovoltaïque — Installation & Raccordement",
        duree: "Sur demande",
        niveau: "Intermédiaire",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Posez et raccordez une installation photovoltaïque : panneaux, onduleurs, systèmes de stockage et mise en service.",
        objectifs: [
          "Pose des panneaux photovoltaïques",
          "Raccordement électrique",
          "Onduleurs et systèmes de stockage",
          "Mise en service",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
      {
        id: 6,
        img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
        titre: "Photovoltaïque — Maintenance & Sécurité",
        duree: "Sur demande",
        niveau: "Avancé",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Assurez la maintenance et le dépannage des installations solaires dans le respect des normes et de la sécurité.",
        objectifs: [
          "Maintenance et dépannage",
          "Normes et sécurité",
          "Diagnostic des pannes et optimisation du rendement",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
    ],
  },
  {
    id: "irve",
    label: "Bornes de Recharge (IRVE)",
    description:
      "Installation, raccordement et mise en service des bornes de recharge pour véhicules électriques (IRVE).",
    locked: false,
    formations: [
      {
        id: 7,
        img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80",
        titre: "IRVE — Fondamentaux",
        duree: "Sur demande",
        niveau: "Débutant",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Découvrez la réglementation IRVE, la technologie des véhicules électriques et le dimensionnement des bornes de recharge.",
        objectifs: [
          "Réglementation IRVE",
          "Technologie des véhicules électriques",
          "Choix et dimensionnement des bornes",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
      {
        id: 8,
        img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80",
        titre: "IRVE — Installation & Mise en Service",
        duree: "Sur demande",
        niveau: "Intermédiaire",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Installez et raccordez des bornes de recharge : protections électriques, paramétrage et mise en service.",
        objectifs: [
          "Installation et raccordement",
          "Protections électriques",
          "Paramétrage et mise en service",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
      {
        id: 9,
        img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80",
        titre: "IRVE — Maintenance & Diagnostic",
        duree: "Sur demande",
        niveau: "Avancé",
        places: "Sur demande",
        format: "Formation mobile",
        prix: "Sur demande",
        description:
          "Diagnostiquez et maintenez les bornes de recharge en toute sécurité, avec études de cas pratiques.",
        objectifs: [
          "Maintenance et diagnostic des pannes",
          "Sécurité des installations",
          "Études de cas pratiques",
        ],
        programme: [] as { jour: string; contenu: string }[],
        prerequis: "Sur demande",
        certification: "Sur demande",
      },
    ],
  },
];