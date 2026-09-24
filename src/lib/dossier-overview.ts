import { connectDB } from "@/lib/mongodb";
import {
  INSTALLATION_STEPS,
  VISA_STEPS,
  type ChecklistStatus,
} from "@/lib/module-catalog";
import { getClientJourney } from "@/lib/journey";
import { Candidature } from "@/models/Candidature";
import { ModuleChecklist } from "@/models/ModuleChecklist";
import { SavedItem } from "@/models/SavedItem";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { ServiceApplication } from "@/models/ServiceApplication";

export async function getChecklistMap(userId: string, module: "visa" | "installation") {
  await connectDB();
  const rows = await ModuleChecklist.find({ userId, module }).lean();
  const map = new Map<string, ChecklistStatus>();
  for (const row of rows) {
    map.set(row.stepKey, row.status as ChecklistStatus);
  }
  return map;
}

export async function getModuleOverview(userId: string) {
  await connectDB();

  const [journey, candidatures, saved, visaMap, installMap, apps] = await Promise.all([
    getClientJourney(userId),
    Candidature.find({ userId }).lean(),
    SavedItem.countDocuments({ userId }),
    getChecklistMap(userId, "visa"),
    getChecklistMap(userId, "installation"),
    ServiceApplication.find({ userId }).lean(),
  ]);

  const appIds = apps.map((a) => a._id);
  const submissions = appIds.length
    ? await DocumentSubmission.find({ applicationId: { $in: appIds } }).lean()
    : [];

  const docsApproved = submissions.filter((s) => s.status === "approved").length;
  const docsPending = submissions.filter((s) => s.status === "pending").length;
  const docsRejected = submissions.filter((s) => s.status === "rejected").length;
  const docsTotal = submissions.length;

  const visaDone = VISA_STEPS.filter((s) => visaMap.get(s.key) === "done").length;
  const installDone = INSTALLATION_STEPS.filter((s) => installMap.get(s.key) === "done").length;

  const journeyProgress =
    journey.length === 0
      ? 0
      : Math.round(journey.reduce((s, c) => s + c.progress, 0) / journey.length);

  const visaProgress = Math.round((visaDone / VISA_STEPS.length) * 100);
  const installProgress = Math.round((installDone / INSTALLATION_STEPS.length) * 100);
  const candidatureScore = Math.min(100, candidatures.length * 20);

  const overall = Math.round(
    journeyProgress * 0.35 +
      visaProgress * 0.25 +
      installProgress * 0.15 +
      candidatureScore * 0.15 +
      Math.min(100, docsApproved * 8) * 0.1,
  );

  type NextTask = {
    title: string;
    description: string;
    href: string;
    cta: string;
  };

  let nextTask: NextTask | null = null;

  const rejectedDoc = journey.find((j) => j.status === "in_progress" && j.progress < 100);
  if (docsRejected > 0) {
    nextTask = {
      title: "Corriger un document refusé",
      description: "Un conseiller a demandé une correction sur une pièce.",
      href: "/mon-dossier/documents",
      cta: "Ouvrir les documents",
    };
  } else if (docsPending === 0 && journey.some((j) => j.status === "ready")) {
    const ready = journey.find((j) => j.status === "ready")!;
    nextTask = {
      title: `Continuer — ${ready.title}`,
      description: "Tous les documents sont approuvés. Poursuivez la procédure.",
      href: `/mon-dossier/services/${ready.slug}`,
      cta: "Continuer",
    };
  } else if (rejectedDoc && rejectedDoc.progress < 100) {
    nextTask = {
      title: `Compléter — ${rejectedDoc.title}`,
      description: "Déposez ou finalisez les pièces manquantes.",
      href: `/mon-dossier/services/${rejectedDoc.slug}`,
      cta: "Compléter",
    };
  } else if (candidatures.length === 0) {
    nextTask = {
      title: "Ajouter une candidature",
      description: "Créez votre première candidature universitaire.",
      href: "/mon-dossier/candidatures",
      cta: "Pipeline",
    };
  } else if (visaDone < VISA_STEPS.length) {
    nextTask = {
      title: "Avancer le parcours visa",
      description: `${visaDone}/${VISA_STEPS.length} étapes terminées.`,
      href: "/mon-dossier/visa",
      cta: "Centre visa",
    };
  } else if (installDone < INSTALLATION_STEPS.length) {
    nextTask = {
      title: "Préparer l’installation",
      description: `${installDone}/${INSTALLATION_STEPS.length} tâches faites.`,
      href: "/mon-dossier/installation",
      cta: "Installation",
    };
  }

  return {
    overall,
    stats: {
      candidatures: candidatures.length,
      documents: docsTotal,
      docsApproved,
      docsPending,
      docsRejected,
      visaProgress,
      visaDone,
      visaTotal: VISA_STEPS.length,
      installDone,
      installTotal: INSTALLATION_STEPS.length,
      saved,
    },
    journey,
    nextTask,
  };
}
