import { Service } from "@/models/Service";

const DEFAULT_SERVICES = [
  {
    slug: "visa",
    title: "Visa étudiant",
    description:
      "Documents requis pour votre dossier de visa — preuve de ressources, passeport, hébergement, etc.",
    requirements: [
      {
        key: "proof_of_income",
        label: "Justificatifs de ressources",
        description:
          "Attestations bancaires, prise en charge ou bourse couvrant la durée du séjour.",
        required: true,
      },
      {
        key: "passport",
        label: "Passeport",
        description: "Scan ou photo lisible de votre passeport en cours de validité.",
        required: true,
      },
      {
        key: "passport_photo",
        label: "Photo d'identité",
        description: "Photo format visa / passeport récente sur fond clair.",
        required: true,
      },
      {
        key: "housing_proof",
        label: "Justificatif d'hébergement",
        description:
          "Attestation de logement, réservation de résidence ou attestation d'hébergeant.",
        required: true,
      },
      {
        key: "admission_letter",
        label: "Lettre d'admission",
        description: "Acceptation officielle d'un établissement français.",
        required: true,
      },
      {
        key: "insurance",
        label: "Assurance voyage / santé",
        description: "Attestation d'assurance couvrant le début du séjour.",
        required: true,
      },
    ],
  },
  {
    slug: "university",
    title: "Candidature universitaire",
    description:
      "Pièces pour postuler à une formation : diplômes, notes, lettre de motivation.",
    requirements: [
      {
        key: "school_certificate",
        label: "Certificat de scolarité / diplôme",
        description: "Dernier diplôme ou attestation de scolarité.",
        required: true,
      },
      {
        key: "grades_certificate",
        label: "Relevé de notes",
        description: "Bulletins ou relevés officiels des dernières années.",
        required: true,
      },
      {
        key: "motivation_letter",
        label: "Lettre de motivation",
        description: "Lettre expliquant votre projet d'études en France.",
        required: true,
      },
      {
        key: "cv",
        label: "CV",
        description: "Curriculum vitae à jour.",
        required: true,
      },
      {
        key: "id_document",
        label: "Pièce d'identité",
        description: "Passeport ou carte d'identité.",
        required: true,
      },
      {
        key: "language_proof",
        label: "Attestation de langue",
        description: "DELF/DALF, TCF ou équivalent si exigé par la formation.",
        required: false,
      },
    ],
  },
];

/** Ensure catalog services exist without wiping user data. */
export async function ensureServicesCatalog() {
  for (const service of DEFAULT_SERVICES) {
    await Service.updateOne(
      { slug: service.slug },
      {
        $set: {
          title: service.title,
          description: service.description,
          requirements: service.requirements,
        },
        $setOnInsert: { slug: service.slug },
      },
      { upsert: true },
    );
  }
}
