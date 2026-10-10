import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getDefaultServices } from "@/lib/services-catalog";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { ServiceApplication } from "@/models/ServiceApplication";
import { StatusBadge } from "@/components/StatusBadge";

type Props = { params: Promise<{ id: string }> };

function fileKind(url: string | null, filename: string | null) {
  const src = (filename || url || "").split("?")[0].toLowerCase();
  if (/\.pdf$/.test(src) || url?.toLowerCase().includes(".pdf")) return "pdf" as const;
  if (/\.(png|jpe?g|gif|webp|bmp|avif)$/.test(src) || url?.includes("/image/upload/")) {
    return "image" as const;
  }
  return "other" as const;
}

function labelForKey(key: string) {
  for (const service of getDefaultServices()) {
    const req = service.requirements.find((r) => r.key === key);
    if (req) return req.label;
  }
  return key;
}

export default async function DocumentPreviewPage({ params }: Props) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) notFound();

  await connectDB();

  const submission = await DocumentSubmission.findById(id).lean();
  if (!submission?.cloudinaryUrl) notFound();

  const application = await ServiceApplication.findById(submission.applicationId)
    .select("userId")
    .lean();
  if (!application || String(application.userId) !== session.userId) notFound();

  const label = labelForKey(submission.requirementKey);
  const kind = fileKind(
    submission.cloudinaryUrl,
    submission.originalFilename ?? null,
  );
  const status = submission.status as "missing" | "pending" | "approved" | "rejected";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/mon-dossier/documents"
            className="text-sm text-eef-deep hover:underline"
          >
            ← Mes documents
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl text-eef-navy">{label}</h1>
            <StatusBadge status={status} />
          </div>
          {submission.originalFilename && (
            <p className="mt-1.5 text-sm text-eef-secondary">
              {submission.originalFilename}
            </p>
          )}
        </div>
        <a
          href={submission.cloudinaryUrl}
          target="_blank"
          rel="noreferrer"
          className="eef-btn-ghost h-10 px-4 text-sm"
        >
          Ouvrir dans un onglet
        </a>
      </div>

      {submission.adminComment && status === "rejected" && (
        <div className="mb-5 rounded-lg border border-eef-navy/20 bg-white px-4 py-3 text-sm text-eef-ink">
          <p className="font-medium text-eef-navy">Commentaire du conseiller</p>
          <p className="mt-1">{submission.adminComment}</p>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-eef-soft bg-white">
        {kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={submission.cloudinaryUrl}
            alt={label}
            className="mx-auto max-h-[min(78vh,920px)] w-full object-contain"
          />
        ) : kind === "pdf" ? (
          <iframe
            title={label}
            src={submission.cloudinaryUrl}
            className="h-[min(78vh,920px)] w-full bg-eef-mist"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <p className="text-eef-secondary">
              Aperçu non disponible pour ce type de fichier.
            </p>
            <a
              href={submission.cloudinaryUrl}
              target="_blank"
              rel="noreferrer"
              className="eef-btn-primary px-5 py-2.5 text-sm"
            >
              Télécharger / ouvrir
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
