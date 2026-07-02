// ─── Carousel ────────────────────────────────────────────────────────────────

export const formations = [
  {
    titre: "Installation Fibre Optique FTTH",
    domaine: "Fibre Optique",
    duree: "5 jours",
    format: "Présentiel",
    niveau: "Débutant",
    description:
      "Maîtrisez les techniques de raccordement, soudure et mesures OTDR pour le déploiement de la fibre optique jusqu'au domicile.",
  },
  {
    titre: "Installation Photovoltaïque",
    domaine: "Photovoltaïque",
    duree: "7 jours",
    format: "Présentiel",
    niveau: "Intermédiaire",
    description:
      "Conception, pose et maintenance de systèmes solaires résidentiels et tertiaires. Inclut les habilitations électriques.",
  },
  {
    titre: "Habilitations Électriques BR/BC/B1",
    domaine: "Électricité",
    duree: "3 jours",
    format: "Présentiel",
    niveau: "Tous niveaux",
    description:
      "Obtenez vos habilitations électriques réglementaires pour intervenir sur installations basse et haute tension.",
  },
  {
    titre: "Réseaux Télécoms et Infrastructure",
    domaine: "Télécoms",
    duree: "6 jours",
    format: "Hybride",
    niveau: "Intermédiaire",
    description:
      "Déploiement et maintenance des infrastructures télécoms, câblage structuré et configuration équipements réseau.",
  },
  {
    titre: "Efficacité Énergétique Entreprise",
    domaine: "Énergie",
    duree: "4 jours",
    format: "Distanciel",
    niveau: "Avancé",
    description:
      "Audit énergétique, bilan carbone et plan d'action pour réduire la consommation et les coûts de votre entreprise.",
  },
];

export const domainColors: Record<string, string> = {
  "Fibre Optique": "bg-secondary/20 text-secondary border-secondary/40",
  Photovoltaïque: "bg-primary/10 text-primary border-primary/25",
  Électricité: "bg-primary/10 text-primary border-primary/25",
  Télécoms: "bg-secondary/20 text-secondary border-secondary/40",
  Énergie: "bg-primary/10 text-primary border-primary/25",
};

// Slideshow for the "Nos formations phares" section.
// Placeholder images from Unsplash — swap for real photos when available.
export const formationSlides = [
  {
    subtitle: "Fibre Optique",
    title: "Installation Fibre Optique FTTH",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80&auto=format&fit=crop",
    href: "/formations/1",
  },
  {
    subtitle: "Photovoltaïque",
    title: "Installation Photovoltaïque",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80&auto=format&fit=crop",
    href: "/catalogue",
  },
  {
    subtitle: "Électricité",
    title: "Habilitations Électriques BR/BC/B1",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80&auto=format&fit=crop",
    href: "/catalogue",
  },
  {
    subtitle: "Télécoms",
    title: "Réseaux Télécoms et Infrastructure",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
    href: "/catalogue",
  },
  {
    subtitle: "Énergie",
    title: "Efficacité Énergétique Entreprise",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80&auto=format&fit=crop",
    href: "/catalogue",
  },
];

// ─── About ───────────────────────────────────────────────────────────────────

export const values = [
  { titre: "Formateurs praticiens", description: "Tous nos formateurs exercent encore dans leur domaine. Pas de théorie déconnectée du terrain.", color: "border-primary" },
  { titre: "Certifications reconnues", description: "Nos programmes sont certifiants et reconnus par les organismes officiels du secteur télécoms et énergie.", color: "border-secondary" },
  { titre: "Éco-responsable", description: "Centre engagé dans la transition énergétique — fibre optique, photovoltaïque, efficacité énergétique.", color: "border-primary" },
  { titre: "Sur mesure entreprise", description: "Programmes intra adaptés à votre contexte, vos équipes et vos enjeux métier spécifiques.", color: "border-primary" },
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
  { label: "Catalogue", href: "/catalogue" },
  { label: "À propos", href: "/apropos" },
  { label: "Localisation", href: "#location" },
  { label: "Contact", href: "#contact" },
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

// Google Maps embed for the office location (Tunis)
export const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102115.39799550319!2d10.074691!3d36.806389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis!5e0!3m2!1sfr!2stn!4v1234567890";


// ─── Catalogue ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    id: "fibre",
    label: "Fibre Optique",
    description: "Installation, soudure, mesure et maintenance des réseaux fibre optique FTTH/FTTB.",
    locked: false,
    formations: [
      {
        id: 1,
        titre: "Installation Fibre Optique FTTH",
        duree: "5 jours",
        niveau: "Débutant",
        places: 12,
        format: "Présentiel",
        prix: "1200 TND",
        description: "Maîtrisez l'installation complète d'un réseau fibre optique FTTH, du tirage jusqu'au raccordement.",
        objectifs: [
          "Comprendre l'architecture des réseaux FTTH",
          "Maîtriser les techniques de tirage et de pose",
          "Effectuer les raccordements fibre optique",
          "Réaliser les mesures OTDR",
        ],
        programme: [
          { jour: "Jour 1", contenu: "Introduction aux réseaux fibre optique et architecture FTTH" },
          { jour: "Jour 2", contenu: "Techniques de tirage et pose des câbles" },
          { jour: "Jour 3", contenu: "Raccordement et soudure par fusion" },
          { jour: "Jour 4", contenu: "Mesures et tests OTDR" },
          { jour: "Jour 5", contenu: "Mise en situation réelle et évaluation" },
        ],
        prerequis: "Aucun prérequis technique nécessaire.",
        certification: "Attestation de formation certifiante NovaLead",
      },
      {
        id: 2,
        titre: "Soudure et Mesure Fibre",
        duree: "3 jours",
        niveau: "Intermédiaire",
        places: 8,
        format: "Présentiel",
        prix: "900 TND",
        description: "Techniques de soudure par fusion et réflectométrie OTDR pour les techniciens fibre.",
        objectifs: [
          "Maîtriser la soudure par fusion",
          "Utiliser un réflectomètre OTDR",
          "Analyser les courbes OTDR",
          "Diagnostiquer les défauts réseau",
        ],
        programme: [
          { jour: "Jour 1", contenu: "Principes de la soudure par fusion et préparation des fibres" },
          { jour: "Jour 2", contenu: "Pratique intensive de soudure et contrôle qualité" },
          { jour: "Jour 3", contenu: "Réflectométrie OTDR et analyse des résultats" },
        ],
        prerequis: "Avoir des notions de base en fibre optique.",
        certification: "Attestation de formation certifiante NovaLead",
      },
      {
        id: 3,
        titre: "Maintenance Réseau Fibre",
        duree: "4 jours",
        niveau: "Avancé",
        places: 6,
        format: "Présentiel",
        prix: "1100 TND",
        description: "Diagnostic, dépannage et maintenance préventive des infrastructures fibre déployées.",
        objectifs: [
          "Diagnostiquer les pannes réseau fibre",
          "Mettre en place un plan de maintenance préventive",
          "Gérer les interventions d'urgence",
          "Rédiger des rapports d'intervention",
        ],
        programme: [
          { jour: "Jour 1", contenu: "Méthodologie de diagnostic et outils de mesure" },
          { jour: "Jour 2", contenu: "Identification et résolution des pannes courantes" },
          { jour: "Jour 3", contenu: "Maintenance préventive et planification" },
          { jour: "Jour 4", contenu: "Gestion des incidents et documentation" },
        ],
        prerequis: "Expérience en installation fibre optique requise.",
        certification: "Attestation de formation certifiante NovaLead",
      },
    ],
  },
  {
    id: "telecom",
    label: "Télécoms",
    description: "Antennes, VoIP, câblage structuré et équipements de télécommunication.",
    locked: true,
    formations: [],
  },
  {
    id: "solaire",
    label: "Énergie Solaire",
    description: "Dimensionnement, installation et maintenance des systèmes photovoltaïques.",
    locked: true,
    formations: [],
  },
];