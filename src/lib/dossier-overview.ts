import { connectDB } from "@/lib/mongodb";
import { getClientJourney } from "@/lib/journey";
import { PORTAL_SERVICE_META, PORTAL_SERVICE_ORDER } from "@/lib/services-catalog";
import { Candidature } from "@/models/Candidature";
import { SavedItem } from "@/models/SavedItem";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { ServiceApplication } from "@/models/ServiceApplication";

export async function getModuleOverview(userId: string) {
  await connectDB();

  const [journey, candidatures, saved, apps] = await Promise.all([
    getClientJourney(userId),
    Candidature.find({ userId }).lean(),
    SavedItem.countDocuments({ userId }),
    ServiceApplication.find({ userId }).lean(),
  ]);

  const appIds = apps.map((a) => a._id);
  const submissions = appIds.length
    ? await DocumentSubmission.find({ applicationId: { $in: appIds } }).lean()
    : [];

  const docsApproved = submissions.filter((s) => s.status === "approved").length;
  const docsPending = submissions.filter((s) => s.status === "pending").length;
  const docsRejected = submissions.filter((s) => s.status === "rejected").length;
  const docsUploaded = submissions.filter((s) => s.status !== "missing").length;
  const docsTotal = submissions.length;

  const journeyProgress =
    journey.length === 0
      ? 0
      : Math.round(journey.reduce((s, c) => s + c.progress, 0) / journey.length);

  const visaStep = journey.find((j) => j.slug === "visa");
  const installStep = journey.find((j) => j.slug === "installation");
  const visaProgress = visaStep?.progress ?? 0;
  const installProgress = installStep?.progress ?? 0;
  const candidatureScore = Math.min(100, candidatures.length * 20);

  const overall = Math.round(
    journeyProgress * 0.55 +
      candidatureScore * 0.2 +
      Math.min(100, docsApproved * 5) * 0.25,
  );

  type NextTask = {
    title: string;
    description: string;
    href: string;
    cta: string;
  };

  let nextTask: NextTask | null = null;

  const incomplete = journey.find((j) => j.status === "in_progress" && j.progress < 100);

  if (docsRejected > 0) {
    nextTask = {
      title: "Corriger un document refusé",
      description: "Un conseiller a demandé une correction sur une pièce.",
      href: "/mon-dossier/documents",
      cta: "Ouvrir Mes documents",
    };
  } else if (docsPending === 0 && journey.some((j) => j.status === "ready")) {
    const ready = journey.find((j) => j.status === "ready")!;
    nextTask = {
      title: `Continuer — ${ready.title}`,
      description: "Tous les documents sont approuvés. Poursuivez la procédure.",
      href: `/mon-dossier/services/${ready.slug}`,
      cta: "Continuer",
    };
  } else if (incomplete) {
    nextTask = {
      title: `Compléter — ${incomplete.title}`,
      description: "Déposez ou finalisez les pièces manquantes.",
      href: `/mon-dossier/services/${incomplete.slug}`,
      cta: "Compléter",
    };
  } else if (candidatures.length === 0) {
    nextTask = {
      title: "Ajouter une candidature",
      description: "Créez votre première candidature universitaire.",
      href: "/mon-dossier/candidatures",
      cta: "Pipeline",
    };
  }

  const homeCards = [
    ...PORTAL_SERVICE_ORDER.map((slug) => {
      const step = journey.find((j) => j.slug === slug);
      const meta = PORTAL_SERVICE_META[slug];
      return {
        slug,
        eyebrow: meta.eyebrow,
        title: step?.title ?? slug,
        blurb: meta.homeBlurb,
        href: meta.href,
        progress: step?.progress ?? 0,
      };
    }),
    {
      slug: "documents",
      eyebrow: "Coffre-fort",
      title: "Mes documents",
      blurb: "Centralisez les pièces communes à toutes vos démarches.",
      href: "/mon-dossier/documents",
      progress:
        docsTotal === 0 ? 0 : Math.round((docsUploaded / docsTotal) * 100),
    },
  ];

  return {
    overall,
    stats: {
      candidatures: candidatures.length,
      documents: docsUploaded,
      docsApproved,
      docsPending,
      docsRejected,
      visaProgress,
      installProgress,
      saved,
    },
    journey,
    homeCards,
    nextTask,
  };
}
