export const VISA_STEPS = [
  {
    key: "admission",
    title: "Obtenir une admission",
    description:
      "Acceptation officielle d’un établissement français — point de départ du visa étudiant.",
  },
  {
    key: "eef_preconsulaire",
    title: "Procédure EEF / pré-consulaire",
    description:
      "Si votre pays applique « Études en France », complétez le dossier pré-consulaire avant France-Visas.",
    badge: "Selon votre pays",
  },
  {
    key: "passport",
    title: "Passeport valide",
    description: "Vérifiez la validité du passeport pour toute la durée du séjour prévu.",
  },
  {
    key: "finances",
    title: "Preuve de ressources",
    description: "Justificatifs bancaires, prise en charge ou bourse couvrant le séjour.",
  },
  {
    key: "housing",
    title: "Hébergement",
    description: "Attestation de logement, résidence étudiante ou hébergement chez un tiers.",
  },
  {
    key: "france_visas",
    title: "Dossier France-Visas",
    description: "Créez et soumettez votre demande sur la plateforme France-Visas.",
  },
  {
    key: "consular_appointment",
    title: "Rendez-vous consulaire",
    description: "Prenez RDV au consulat / centre TLScontact et préparez les originaux.",
  },
  {
    key: "review",
    title: "Revue du dossier",
    description: "Relisez chaque pièce avec votre conseiller avant le dépôt final.",
  },
  {
    key: "departure",
    title: "Préparation au départ",
    description: "Billet, assurances, copies numériques et checklist de voyage.",
  },
  {
    key: "arrival_validation",
    title: "Validation à l’arrivée",
    description: "Validez le VLS-TS / titre de séjour dès l’arrivée en France.",
  },
] as const;

export type VisaStepKey = (typeof VISA_STEPS)[number]["key"];

export const INSTALLATION_STEPS = [
  {
    key: "garant",
    phase: "J-30",
    title: "Garant / caution",
    description: "Organisez une caution locative ou un garant solidaire.",
  },
  {
    key: "assurance",
    phase: "J-30",
    title: "Assurance habitation",
    description: "Souscrivez une assurance logement avant l’entrée dans les lieux.",
  },
  {
    key: "banque",
    phase: "J-30",
    title: "Compte bancaire",
    description: "Ouvrez un compte français ou préparez les documents pour le faire sur place.",
  },
  {
    key: "sim",
    phase: "J-7",
    title: "Carte SIM",
    description: "Prévoyez une eSIM ou une carte locale pour rester joignable.",
  },
  {
    key: "cvec",
    phase: "J-7",
    title: "CVEC",
    description: "Payez la Contribution Vie Étudiante et de Campus.",
  },
  {
    key: "energie",
    phase: "J-7",
    title: "Énergie",
    description: "Contrats électricité / gaz si le logement l’exige.",
  },
  {
    key: "internet",
    phase: "J+7",
    title: "Internet",
    description: "Activez une box ou un forfait mobile data adapté.",
  },
  {
    key: "etat_des_lieux",
    phase: "J+7",
    title: "État des lieux",
    description: "Faites l’état des lieux d’entrée et conservez les photos.",
  },
  {
    key: "transport",
    phase: "J+7",
    title: "Transport",
    description: "Carte Navigo / abonnement local selon votre ville.",
  },
  {
    key: "securite_sociale",
    phase: "J+30",
    title: "Sécurité sociale",
    description: "Affiliation Ameli / CPAM pour les étudiants.",
  },
  {
    key: "titre_sejour",
    phase: "J+30",
    title: "Titre de séjour",
    description: "Suivi de la validation VLS-TS et éventuel renouvellement.",
  },
  {
    key: "equipement",
    phase: "J+30",
    title: "Équipement de base",
    description: "Linge, vaisselle, fournitures pour démarrer sereinement.",
  },
] as const;

export type InstallationStepKey = (typeof INSTALLATION_STEPS)[number]["key"];

export const CANDIDATURE_STATUSES = [
  { value: "interesse", label: "Intéressé(e)" },
  { value: "en_preparation", label: "En préparation" },
  { value: "deposee", label: "Déposée" },
  { value: "en_attente", label: "En attente" },
  { value: "acceptee", label: "Acceptée" },
  { value: "refusee", label: "Refusée" },
  { value: "inscrit", label: "Inscrit(e)" },
] as const;

export type CandidatureStatus = (typeof CANDIDATURE_STATUSES)[number]["value"];

export const SAVED_TYPES = [
  { value: "formation", label: "Formation" },
  { value: "bourse", label: "Bourse" },
  { value: "logement", label: "Logement" },
] as const;

export type SavedItemType = (typeof SAVED_TYPES)[number]["value"];

export type ChecklistStatus = "todo" | "doing" | "done";
