"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ADMIN_APP_PATH } from "@/lib/admin-path";
import { StatusBadge } from "@/components/StatusBadge";
import { FilePreview } from "@/components/FilePreview";

type Slot = {
  key: string;
  label: string;
  description: string;
  required: boolean;
  status: "missing" | "pending" | "approved" | "rejected";
  submissionId: string | null;
  cloudinaryUrl: string | null;
  originalFilename: string | null;
  adminComment: string | null;
};

type Props = {
  studentId: string;
  studentName: string;
  serviceTitle: string;
  progress: number;
  status: "in_progress" | "ready" | "proceeded";
  slots: Slot[];
};

export function AdminServiceDocs({
  studentId,
  studentName,
  serviceTitle,
  progress,
  status,
  slots,
}: Props) {
  return (
    <div className="space-y-8">
      <Link
        href={`${ADMIN_APP_PATH}/students/${studentId}`}
        className="text-sm text-eef-secondary hover:text-eef-navy"
      >
        ← {studentName}
      </Link>

      <header className="border-b border-eef-soft pb-8">
        <p className="eef-kicker">Documents</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight text-eef-navy">
              {serviceTitle}
            </h1>
            <p className="mt-2 text-eef-secondary">{studentName}</p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={status} />
            <p className="font-display text-3xl text-eef-navy">{progress}%</p>
          </div>
        </div>
        <div className="eef-progress mt-6">
          <span style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="eef-panel overflow-hidden">
        {slots.map((slot, i) => (
          <AdminDocRow key={slot.key} slot={slot} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

function AdminDocRow({ slot, index }: { slot: Slot; index: number }) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openReject, setOpenReject] = useState(false);

  async function review(decision: "approve" | "reject") {
    if (!slot.submissionId) return;
    if (decision === "reject" && !comment.trim()) {
      setError("Commentaire obligatoire pour un refus.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/submissions/${slot.submissionId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, comment }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Échec");
      setOpenReject(false);
      setComment("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="eef-row px-5 py-5 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-eef-secondary">
              {String(index).padStart(2, "0")}
            </span>
            <h3 className="text-[15px] font-medium text-eef-navy">{slot.label}</h3>
            <StatusBadge status={slot.status} />
          </div>
          <p className="mt-1.5 max-w-2xl text-sm text-eef-secondary">{slot.description}</p>
          {slot.cloudinaryUrl && (
            <div className="mt-3 max-w-md">
              <FilePreview
                url={slot.cloudinaryUrl}
                filename={slot.originalFilename}
                label={slot.label}
              />
            </div>
          )}
          {slot.adminComment && (
            <p className="mt-3 max-w-2xl border-l-2 border-eef-navy/30 pl-3 text-sm text-eef-ink">
              <span className="font-medium">Commentaire — </span>
              {slot.adminComment}
            </p>
          )}
          {error && <p className="mt-2 text-sm text-eef-ink">{error}</p>}
          {openReject && (
            <div className="mt-3 max-w-lg space-y-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder="Motif du refus…"
                className="w-full rounded-xl border border-eef-border bg-white px-3 py-2 text-sm outline-none focus:border-eef-blue"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => review("reject")}
                  className="eef-btn-navy px-4 py-2 text-sm disabled:opacity-50"
                >
                  Confirmer
                </button>
                <button
                  type="button"
                  onClick={() => setOpenReject(false)}
                  className="eef-btn-ghost px-4 py-2 text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {slot.submissionId && (
            <Link
              href={`${ADMIN_APP_PATH}/submissions/${slot.submissionId}`}
              className="eef-btn-ghost px-3 py-2 text-sm"
            >
              Aperçu
            </Link>
          )}
          {slot.status === "pending" && slot.submissionId && !openReject && (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={() => review("approve")}
                className="eef-btn-primary px-4 py-2 text-sm disabled:opacity-50"
              >
                Approuver
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => setOpenReject(true)}
                className="eef-btn-navy px-4 py-2 text-sm disabled:opacity-50"
              >
                Refuser
              </button>
            </>
          )}
          {slot.status === "missing" && (
            <span className="self-center text-sm text-eef-secondary">Pas envoyé</span>
          )}
        </div>
      </div>
    </article>
  );
}
