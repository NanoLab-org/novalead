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
  "Fibre Optique": "bg-blue/20 text-sky border-blue/40",
  Photovoltaïque: "bg-green/10 text-green border-green/25",
  Électricité: "bg-orange/10 text-orange border-orange/25",
  Télécoms: "bg-blue/20 text-sky border-blue/40",
  Énergie: "bg-green/10 text-green border-green/25",
};

// ─── About ───────────────────────────────────────────────────────────────────

export const values = [
  { titre: "Formateurs praticiens", description: "Tous nos formateurs exercent encore dans leur domaine. Pas de théorie déconnectée du terrain.", color: "border-green" },
  { titre: "Certifications reconnues", description: "Nos programmes sont certifiants et reconnus par les organismes officiels du secteur télécoms et énergie.", color: "border-blue" },
  { titre: "Éco-responsable", description: "Centre engagé dans la transition énergétique — fibre optique, photovoltaïque, efficacité énergétique.", color: "border-orange" },
  { titre: "Sur mesure entreprise", description: "Programmes intra adaptés à votre contexte, vos équipes et vos enjeux métier spécifiques.", color: "border-green" },
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
  { label: "À propos", href: "#about" },
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