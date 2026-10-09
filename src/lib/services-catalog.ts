import { Service } from "@/models/Service";

export const PORTAL_SERVICE_ORDER = [
  "private-university",
  "campus-france",
  "visa",
  "tourist-visa",
  "installation",
] as const;

export type PortalServiceSlug = (typeof PORTAL_SERVICE_ORDER)[number];

export const PORTAL_SERVICE_META: Record<
  PortalServiceSlug,
  { eyebrow: string; homeBlurb: string; href: string }
> = {
  "private-university": {
    eyebrow: "Admissions",
    homeBlurb: "CV, diplômes, relevés, langue, motivation et pièces spécifiques.",
    href: "/mon-dossier/services/private-university",
  },
  "campus-france": {
    eyebrow: "Études en France",
    homeBlurb: "Checklist académique et justificatifs pour la procédure EEF.",
    href: "/mon-dossier/services/campus-france",
  },
  visa: {
    eyebrow: "Consulat",
    homeBlurb: "Pièces du dossier de visa long séjour étudiant.",
    href: "/mon-dossier/services/visa",
  },
  "tourist-visa": {
    eyebrow: "Court séjour",
    homeBlurb: "Checklist distincte pour une demande touristique.",
    href: "/mon-dossier/services/tourist-visa",
  },
  installation: {
    eyebrow: "Après le visa",
    homeBlurb: "Logement, CVEC, santé, banque, transport et arrivée.",
    href: "/mon-dossier/services/installation",
  },
};

/** Bump when default document lists change — existing services refresh once. */
export const CATALOG_VERSION = 3;

const DEFAULT_SERVICES = [
  {
    slug: "private-university",
    title: "Universités privées",
    description:
      "Un dossier réutilisable pour vos candidatures auprès d’établissements privés.",
    requirements: [
      { key: "passport", label: "Passeport / pièce d'identité", description: "Scan lisible de votre passeport ou carte d'identité.", required: true },
      { key: "photo", label: "Photo d'identité", description: "Photo récente format identité / candidature.", required: true },
      { key: "cv", label: "CV", description: "Curriculum vitae à jour.", required: true },
      { key: "bac", label: "Baccalauréat", description: "Diplôme du bac ou équivalent, avec traduction si besoin.", required: true },
      { key: "latest_diploma", label: "Dernier diplôme obtenu", description: "Dernier diplôme ou attestation de réussite.", required: true },
      { key: "transcripts", label: "Relevés de notes", description: "Bulletins ou relevés officiels des dernières années.", required: true },
      { key: "current_enrolment", label: "Certificat de scolarité", description: "Attestation d'inscription ou de scolarité actuelle.", required: false },
      { key: "language", label: "Test de langue", description: "DELF, DALF, TCF ou autre justificatif.", required: true },
      { key: "motivation", label: "Lettre de motivation", description: "Lettre expliquant votre projet d'études.", required: true },
      { key: "recommendation", label: "Lettre de recommandation", description: "Recommandation d'un enseignant ou employeur.", required: false },
      { key: "application_form", label: "Formulaire de candidature", description: "Formulaire rempli de l'établissement.", required: false },
      { key: "portfolio", label: "Portfolio / travaux", description: "Travaux, book ou pièces créatives si demandés.", required: false },
    ],
  },
  {
    slug: "campus-france",
    title: "Campus France",
    description: "Checklist de préparation de la procédure EEF / Études en France.",
    requirements: [
      { key: "language", label: "Test de langue", description: "DELF, DALF, TCF ou autre justificatif.", required: true },
      { key: "passport", label: "Justificatif d'identité", description: "Passeport / pièce d'identité.", required: true },
      { key: "bac", label: "Bac officiel", description: "Avec traduction si nécessaire.", required: true },
      { key: "school_grades", label: "Notes scolaires — Bac+1", description: "Si ce niveau correspond à votre parcours.", required: false },
      { key: "transcripts", label: "Notes universitaires — Bac+2 et plus", description: "Si applicable.", required: false },
      { key: "current_enrolment", label: "Inscription à l'année actuelle", description: "Attestation d'inscription en cours.", required: false },
      { key: "cv", label: "CV", description: "Curriculum vitae à jour.", required: true },
      { key: "recommendation", label: "Lettre de recommandation", description: "Recommandation académique ou professionnelle.", required: false },
      { key: "motivation", label: "Lettre de motivation", description: "Projet d'études cohérent avec vos choix.", required: true },
    ],
  },
  {
    slug: "visa",
    title: "Visa étudiant",
    description: "Centralisez les pièces de votre demande de visa long séjour étudiant.",
    requirements: [
      { key: "passport", label: "Passeport", description: "Passeport en cours de validité, pages d'identité lisibles.", required: true },
      { key: "photo", label: "2 photos d'identité", description: "Photos format visa / passeport récentes.", required: true },
      { key: "family_record", label: "Extrait d'état civil / registre familial traduit", description: "Document d'état civil traduit si exigé.", required: true },
      { key: "admission", label: "Admission / accord préalable", description: "Acceptation officielle d'un établissement français.", required: true },
      { key: "preconsular", label: "Attestation préconsulaire", description: "Si votre pays applique la procédure Études en France.", required: false },
      { key: "bac", label: "Bac officiel + traduction", description: "Diplôme du bac avec traduction si nécessaire.", required: true },
      { key: "latest_diploma", label: "Dernier diplôme obtenu", description: "Dernier diplôme ou attestation de réussite.", required: true },
      { key: "language", label: "DELF / DALF / TCF", description: "Justificatif de niveau de français.", required: true },
      { key: "resources", label: "Justificatif de ressources / garant", description: "Preuves de ressources ou prise en charge.", required: true },
      { key: "residence", label: "Preuve de résidence", description: "Justificatif d'hébergement pour le séjour.", required: true },
    ],
  },
  {
    slug: "tourist-visa",
    title: "Visa touristique",
    description: "Checklist distincte pour une demande de visa court séjour.",
    requirements: [
      { key: "passport", label: "Passeport", description: "Passeport valide pour la durée du séjour.", required: true },
      { key: "photo", label: "2 photos d'identité", description: "Photos récentes aux normes consulat.", required: true },
      { key: "family_record", label: "Extrait d'état civil / registre familial traduit", description: "Si demandé par le consulat.", required: false },
      { key: "flight", label: "Billet / réservation d'avion", description: "Réservation aller-retour ou preuve de voyage.", required: true },
      { key: "travel_insurance", label: "Assurance voyage", description: "Couverture pour la durée du séjour.", required: true },
      { key: "resources", label: "Justificatif de ressources / garant", description: "Preuve de moyens pour le séjour.", required: true },
      { key: "accommodation", label: "Preuve d'hébergement", description: "Hôtel, invitation ou attestation d'hébergement.", required: true },
      { key: "current_status", label: "Justificatif de situation actuelle", description: "Études, emploi ou autre situation.", required: true },
      { key: "trip_purpose", label: "Justificatifs du motif du séjour", description: "Programme, invitation, motif du voyage.", required: true },
    ],
  },
  {
    slug: "installation",
    title: "Installation",
    description: "Checklist d'arrivée séparée du dossier académique et consulaire.",
    requirements: [
      { key: "housing", label: "Logement", description: "Bail, réservation ou attestation d'hébergement.", required: true },
      { key: "cvec", label: "CVEC", description: "Attestation de paiement de la CVEC.", required: true },
      { key: "school_registration", label: "Inscription administrative", description: "Preuve d'inscription dans l'établissement.", required: true },
      { key: "health", label: "Sécurité sociale / assurance santé", description: "Affiliation ou attestation d'assurance.", required: true },
      { key: "bank", label: "Compte bancaire", description: "RIB ou ouverture de compte en cours.", required: false },
      { key: "transport", label: "Transport", description: "Abonnement ou justificatif de transport local.", required: false },
      { key: "sim", label: "Téléphone / SIM", description: "Forfait ou eSIM pour rester joignable.", required: false },
      { key: "visale", label: "Garant / Visale", description: "Caution locative ou garant solidaire.", required: false },
      { key: "caf", label: "CAF", description: "Dossier d'aide au logement si applicable.", required: false },
      { key: "vls_validation", label: "Validation VLS-TS", description: "Validation du titre de séjour à l'arrivée.", required: true },
    ],
  },
];

export function getDefaultServices() {
  return DEFAULT_SERVICES;
}

/** Ensure catalog services exist and refresh lists when the catalog version changes. */
export async function ensureServicesCatalog() {
  const university = await Service.findOne({ slug: "university" });
  if (university) {
    university.slug = "private-university";
    university.title = "Universités privées";
    university.description =
      "Un dossier réutilisable pour vos candidatures auprès d’établissements privés.";
    await university.save();
  }

  for (const service of DEFAULT_SERVICES) {
    const existing = await Service.findOne({ slug: service.slug });
    if (!existing) {
      await Service.create({
        ...service,
        catalogVersion: CATALOG_VERSION,
      });
      continue;
    }

    const version = Number(existing.get("catalogVersion") ?? 0);
    if (version < CATALOG_VERSION) {
      existing.title = service.title;
      existing.description = service.description;
      existing.requirements = service.requirements;
      existing.set("catalogVersion", CATALOG_VERSION);
      existing.markModified("requirements");
      await existing.save();
    } else {
      await Service.updateOne(
        { slug: service.slug },
        {
          $set: {
            title: service.title,
            description: service.description,
          },
        },
      );
    }
  }
}
