"use client";

import { useRef, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import type { VaultDoc } from "@/lib/document-vault";

type Props = {
  initialDocs: VaultDoc[];
};

export function DocumentsVault({ initialDocs }: Props) {
  const [docs, setDocs] = useState(initialDocs);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const required = docs.filter((d) => d.required);
  const done = required.filter((d) => d.status !== "missing").length;
  const progress = required.length ? Math.round((done / required.length) * 100) : 0;

  async function onFile(key: string, applicationId: string | null, file: File | undefined) {
    if (!file) return;
    setUploadingKey(key);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("requirementKey", key);
      if (applicationId) form.append("applicationId", applicationId);
      const res = await fetch("/api/uploads", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec du téléversement");

      setDocs((prev) =>
        prev.map((d) =>
          d.key === key
            ? {
                ...d,
                status: "pending",
                cloudinaryUrl: data.submission?.cloudinaryUrl ?? d.cloudinaryUrl,
                originalFilename: data.submission?.originalFilename ?? file.name,
                adminComment: null,
                submissionId: data.submission?.id ?? d.submissionId,
              }
            : d,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setUploadingKey(null);
      const input = inputRefs.current[key];
      if (input) input.value = "";
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-6 border-b border-eef-soft pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eef-kicker">Coffre-fort documentaire</p>
          <h1 className="mt-2 font-display text-3xl text-eef-navy">Mes documents</h1>
          <p className="mt-1.5 max-w-xl text-eef-secondary">
            Ajoutez une pièce une seule fois : son statut est réutilisé sur toutes les
            sections concernées.
          </p>
        </div>
        <div className="min-w-[160px]">
          <p className="eef-kicker">Progression</p>
          <p className="font-display text-3xl text-eef-navy">{progress}%</p>
          <div className="eef-progress mt-2">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-eef-secondary">
            {done}/{required.length} documents requis ajoutés
          </p>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}

      <div className="eef-panel overflow-hidden">
        {docs.map((doc) => {
          const canUpload = doc.status === "missing" || doc.status === "rejected";
          const busy = uploadingKey === doc.key;
          return (
            <div
              key={doc.key}
              className="eef-row flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-medium text-eef-navy">{doc.label}</h2>
                  <StatusBadge status={doc.status} />
                  {!doc.required && (
                    <span className="text-[11px] text-eef-secondary">Optionnel</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-eef-secondary">
                  {doc.originalFilename
                    ? `${doc.originalFilename} · ${doc.usedIn.join(", ")}`
                    : doc.usedIn.join(", ")}
                </p>
                {doc.adminComment && (
                  <p className="mt-1 text-xs text-red-700">{doc.adminComment}</p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {canUpload ? (
                  <>
                    <input
                      ref={(el) => {
                        inputRefs.current[doc.key] = el;
                      }}
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      onChange={(e) =>
                        onFile(doc.key, doc.applicationId, e.target.files?.[0])
                      }
                    />
                    <button
                      type="button"
                      disabled={busy || !doc.applicationId}
                      onClick={() => inputRefs.current[doc.key]?.click()}
                      className="eef-btn-ghost h-9 px-3 text-xs disabled:opacity-50"
                    >
                      {busy ? "Envoi…" : doc.status === "rejected" ? "Remplacer" : "Ajouter"}
                    </button>
                  </>
                ) : doc.cloudinaryUrl ? (
                  <a
                    href={doc.cloudinaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-eef-deep hover:underline"
                  >
                    Voir
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
        {docs.length === 0 && (
          <p className="px-5 py-10 text-center text-eef-secondary">
            Aucun document catalogue. Reconnectez-vous pour initialiser vos sections.
          </p>
        )}
      </div>
    </div>
  );
}
