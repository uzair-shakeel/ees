import type { IDocumentRequirement } from "@/models/Service";
import type { IDocumentSubmission } from "@/models/DocumentSubmission";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { ServiceApplication } from "@/models/ServiceApplication";

export function isApplicationReady(
  requirements: IDocumentRequirement[],
  submissions: Pick<IDocumentSubmission, "requirementKey" | "status">[],
) {
  const required = requirements.filter((r) => r.required !== false);
  if (required.length === 0) return false;

  return required.every((req) => {
    const sub = submissions.find((s) => s.requirementKey === req.key);
    return sub?.status === "approved";
  });
}

export async function refreshApplicationStatus(
  applicationId: string,
  requirements: IDocumentRequirement[],
) {
  const app = await ServiceApplication.findById(applicationId);
  const submissions = await DocumentSubmission.find({ applicationId }).lean();
  const ready = isApplicationReady(requirements, submissions);

  if (!ready) {
    await ServiceApplication.findByIdAndUpdate(applicationId, {
      status: "in_progress",
      proceededAt: null,
    });
    return "in_progress" as const;
  }

  // Keep "proceeded" once the student has continued
  if (app?.status === "proceeded") {
    return "proceeded" as const;
  }

  await ServiceApplication.findByIdAndUpdate(applicationId, { status: "ready" });
  return "ready" as const;
}

export function progressPercent(
  requirements: IDocumentRequirement[],
  submissions: Pick<IDocumentSubmission, "requirementKey" | "status">[],
) {
  const required = requirements.filter((r) => r.required !== false);
  if (required.length === 0) return 0;
  const approved = required.filter((req) => {
    const sub = submissions.find((s) => s.requirementKey === req.key);
    return sub?.status === "approved";
  }).length;
  return Math.round((approved / required.length) * 100);
}
