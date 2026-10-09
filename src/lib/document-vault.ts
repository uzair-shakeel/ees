import mongoose from "mongoose";
import { refreshApplicationStatus } from "@/lib/application-status";
import { getDefaultServices, PORTAL_SERVICE_ORDER } from "@/lib/services-catalog";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";

export type VaultDocStatus = "missing" | "pending" | "approved" | "rejected";

export type VaultDoc = {
  key: string;
  label: string;
  description: string;
  required: boolean;
  usedIn: string[];
  status: VaultDocStatus;
  cloudinaryUrl: string | null;
  originalFilename: string | null;
  adminComment: string | null;
  submissionId: string | null;
  /** Any application that owns this key — used for upload target. */
  applicationId: string | null;
};

type SyncPayload = {
  status: VaultDocStatus;
  cloudinaryUrl?: string | null;
  cloudinaryPublicId?: string | null;
  originalFilename?: string | null;
  adminComment?: string | null;
  reviewedAt?: Date | null;
  reviewedBy?: mongoose.Types.ObjectId | null;
};

/** Copy a document state to every application that lists the same requirement key. */
export async function syncRequirementAcrossUser(
  userId: string | mongoose.Types.ObjectId,
  requirementKey: string,
  payload: SyncPayload,
) {
  const apps = await ServiceApplication.find({ userId }).lean();
  if (apps.length === 0) return;

  const services = await Service.find({
    _id: { $in: apps.map((a) => a.serviceId) },
  }).lean();
  const byId = new Map(services.map((s) => [String(s._id), s]));

  for (const app of apps) {
    const service = byId.get(String(app.serviceId));
    if (!service?.requirements.some((r) => r.key === requirementKey)) continue;

    await DocumentSubmission.updateOne(
      { applicationId: app._id, requirementKey },
      {
        $set: {
          status: payload.status,
          ...(payload.cloudinaryUrl !== undefined
            ? { cloudinaryUrl: payload.cloudinaryUrl }
            : {}),
          ...(payload.cloudinaryPublicId !== undefined
            ? { cloudinaryPublicId: payload.cloudinaryPublicId }
            : {}),
          ...(payload.originalFilename !== undefined
            ? { originalFilename: payload.originalFilename }
            : {}),
          ...(payload.adminComment !== undefined
            ? { adminComment: payload.adminComment }
            : {}),
          ...(payload.reviewedAt !== undefined ? { reviewedAt: payload.reviewedAt } : {}),
          ...(payload.reviewedBy !== undefined ? { reviewedBy: payload.reviewedBy } : {}),
        },
        $setOnInsert: {
          applicationId: app._id,
          requirementKey,
        },
      },
      { upsert: true },
    );

    await refreshApplicationStatus(String(app._id), service.requirements);
  }
}

/** If a slot is empty, fill it from another of the user's submissions with the same key. */
export async function hydrateMissingFromVault(
  userId: string | mongoose.Types.ObjectId,
  applicationId: string | mongoose.Types.ObjectId,
  requirementKey: string,
) {
  const existing = await DocumentSubmission.findOne({
    applicationId,
    requirementKey,
  }).lean();
  if (
    existing &&
    existing.status !== "missing" &&
    (existing.cloudinaryUrl || existing.status === "approved")
  ) {
    return existing;
  }

  const apps = await ServiceApplication.find({ userId }).lean();
  const otherIds = apps
    .map((a) => a._id)
    .filter((id) => String(id) !== String(applicationId));
  if (otherIds.length === 0) return existing;

  const donor = await DocumentSubmission.findOne({
    applicationId: { $in: otherIds },
    requirementKey,
    status: { $ne: "missing" },
    cloudinaryUrl: { $ne: null },
  })
    .sort({ updatedAt: -1 })
    .lean();

  if (!donor) return existing;

  const synced = await DocumentSubmission.findOneAndUpdate(
    { applicationId, requirementKey },
    {
      $set: {
        status: donor.status,
        cloudinaryUrl: donor.cloudinaryUrl,
        cloudinaryPublicId: donor.cloudinaryPublicId,
        originalFilename: donor.originalFilename,
        adminComment: donor.adminComment,
        reviewedAt: donor.reviewedAt,
        reviewedBy: donor.reviewedBy,
      },
      $setOnInsert: {
        applicationId,
        requirementKey,
      },
    },
    { upsert: true, new: true },
  );

  return synced;
}

/** Unique shared documents across catalog services, with live status for this user. */
export async function getVaultDocuments(userId: string): Promise<VaultDoc[]> {
  const catalog = getDefaultServices();
  const byKey = new Map<
    string,
    { label: string; description: string; required: boolean; usedIn: string[] }
  >();

  for (const slug of PORTAL_SERVICE_ORDER) {
    const service = catalog.find((s) => s.slug === slug);
    if (!service) continue;
    for (const req of service.requirements) {
      const row = byKey.get(req.key);
      if (!row) {
        byKey.set(req.key, {
          label: req.label,
          description: req.description,
          required: req.required !== false,
          usedIn: [service.title],
        });
      } else {
        if (!row.usedIn.includes(service.title)) row.usedIn.push(service.title);
        if (req.required !== false) row.required = true;
      }
    }
  }

  const apps = await ServiceApplication.find({ userId }).lean();
  const services = await Service.find({
    _id: { $in: apps.map((a) => a.serviceId) },
  }).lean();
  const serviceById = new Map(services.map((s) => [String(s._id), s]));

  const appIds = apps.map((a) => a._id);
  const submissions = appIds.length
    ? await DocumentSubmission.find({ applicationId: { $in: appIds } }).lean()
    : [];

  const rank: Record<VaultDocStatus, number> = {
    approved: 4,
    pending: 3,
    rejected: 2,
    missing: 1,
  };

  const docs: VaultDoc[] = [];
  for (const [key, meta] of byKey) {
    let best: (typeof submissions)[number] | null = null;
    let applicationId: string | null = null;

    for (const app of apps) {
      const service = serviceById.get(String(app.serviceId));
      if (!service?.requirements.some((r) => r.key === key)) continue;
      if (!applicationId) applicationId = String(app._id);

      const sub = submissions.find(
        (s) => String(s.applicationId) === String(app._id) && s.requirementKey === key,
      );
      if (!sub) continue;
      if (
        !best ||
        rank[sub.status as VaultDocStatus] > rank[best.status as VaultDocStatus]
      ) {
        best = sub;
      }
    }

    docs.push({
      key,
      label: meta.label,
      description: meta.description,
      required: meta.required,
      usedIn: meta.usedIn,
      status: (best?.status as VaultDocStatus) ?? "missing",
      cloudinaryUrl: best?.cloudinaryUrl ?? null,
      originalFilename: best?.originalFilename ?? null,
      adminComment: best?.adminComment ?? null,
      submissionId: best?._id ? String(best._id) : null,
      applicationId,
    });
  }

  return docs;
}
