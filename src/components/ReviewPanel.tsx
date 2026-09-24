"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { FilePreview } from "./FilePreview";
import { ADMIN_APP_PATH } from "@/lib/admin-path";

type SubmissionDetail = {
  submission: {
    id: string;
    label: string;
    description: string;
    status: string;
    cloudinaryUrl: string | null;
    originalFilename: string | null;
    adminComment: string | null;
  };
  client: { name: string; email: string } | null;
  service: { title: string; slug: string } | null;
};

export function ReviewPanel({ id }: { id: string }) {
  const router = useRouter();
  const [data, setData] = useState<SubmissionDetail | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/submissions/${id}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Erreur");
        setData(json);
        setComment(json.submission.adminComment || "");
      })
      .catch((err) => setError(err.message));
  }, [id]);

  async function review(decision: "approve" | "reject") {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/submissions/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, comment }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Échec");
      router.push(`${ADMIN_APP_PATH}/file-attente`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  if (!data && !error) {
    return <p className="text-eef-secondary">Chargement…</p>;
  }

  if (!data) {
    return <p className="text-eef-ink">{error}</p>;
  }

  const { submission, client, service } = data;

  return (
    <div className="space-y-6">
      <Link
        href={`${ADMIN_APP_PATH}/file-attente`}
        className="text-sm text-eef-secondary hover:text-eef-navy hover:underline"
      >
        ← File d&apos;attente
      </Link>

      <div>
        <p className="text-sm text-eef-secondary">
          {service?.title} · {client?.name} ({client?.email})
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl text-eef-navy">{submission.label}</h1>
          <StatusBadge
            status={
              submission.status as "missing" | "pending" | "approved" | "rejected"
            }
          />
        </div>
        <p className="mt-2 text-eef-secondary">{submission.description}</p>
      </div>

      <div className="eef-card overflow-hidden p-4 sm:p-5">
        {submission.cloudinaryUrl ? (
          <FilePreview
            url={submission.cloudinaryUrl}
            filename={submission.originalFilename}
            label={submission.label}
          />
        ) : (
          <p className="p-6 text-center text-eef-secondary">Aucun fichier</p>
        )}
      </div>

      <div className="eef-card p-5">
        <label className="block text-sm font-medium text-eef-navy">
          Commentaire (obligatoire si refus)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-[14px] border border-eef-border bg-white px-3 py-2 text-sm text-eef-navy outline-none focus:border-eef-blue"
          placeholder="Expliquez au client ce qu'il doit corriger…"
        />
        {error && <p className="mt-2 text-sm text-eef-ink">{error}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => review("approve")}
            className="eef-btn-primary px-5 py-2.5 text-sm disabled:opacity-50"
          >
            Approuver
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => review("reject")}
            className="eef-btn-navy px-5 py-2.5 text-sm disabled:opacity-50"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}
