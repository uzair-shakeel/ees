"use client";

import { useRef, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { FilePreview } from "./FilePreview";

export type DocumentSlotData = {
  key: string;
  label: string;
  description: string;
  required: boolean;
  status: "missing" | "pending" | "approved" | "rejected";
  cloudinaryUrl: string | null;
  originalFilename: string | null;
  adminComment: string | null;
  submissionId: string | null;
};

type Props = {
  slot: DocumentSlotData;
  applicationId: string;
  onUpdated: () => void;
  stepNumber: number;
  totalSteps: number;
};

export function DocumentSlot({
  slot,
  applicationId,
  onUpdated,
  stepNumber,
  totalSteps,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canUpload = slot.status === "missing" || slot.status === "rejected";
  const hasFile = Boolean(slot.cloudinaryUrl);

  async function onFileChange(file: File | undefined) {
    if (!file || !canUpload) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("applicationId", applicationId);
      form.append("requirementKey", slot.key);
      const res = await fetch("/api/uploads", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec du téléversement");
      onUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <section className="eef-step-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-eef-soft pb-5">
        <div>
          <p className="eef-kicker">
            Document {String(stepNumber).padStart(2, "0")} /{" "}
            {String(totalSteps).padStart(2, "0")}
          </p>
          <h2 className="mt-2 font-display text-2xl text-eef-navy sm:text-3xl">
            {slot.label}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {!slot.required && (
            <span className="text-xs text-eef-secondary">Optionnel</span>
          )}
          <StatusBadge status={slot.status} />
        </div>
      </div>

      <p className="mt-5 max-w-xl text-base text-eef-secondary">{slot.description}</p>

      {slot.status === "rejected" && slot.adminComment && (
        <div className="mt-5 rounded-lg border border-eef-navy/20 bg-eef-mist px-4 py-3 text-sm text-eef-ink">
          <p className="font-medium text-eef-navy">À corriger</p>
          <p className="mt-1">{slot.adminComment}</p>
        </div>
      )}

      {slot.status === "approved" && (
        <div className="mt-8 space-y-4">
          <p className="font-display text-xl text-eef-navy">Validé</p>
          {hasFile && (
            <FilePreview
              url={slot.cloudinaryUrl}
              filename={slot.originalFilename}
              label={slot.label}
            />
          )}
        </div>
      )}

      {slot.status === "pending" && (
        <div className="mt-8 space-y-4">
          <div>
            <p className="font-display text-xl text-eef-navy">En cours de revue</p>
            <p className="mt-1 text-sm text-eef-secondary">
              Votre conseiller examine cette pièce. Vous pouvez passer au document
              suivant.
            </p>
          </div>
          {hasFile && (
            <FilePreview
              url={slot.cloudinaryUrl}
              filename={slot.originalFilename}
              label={slot.label}
            />
          )}
        </div>
      )}

      {canUpload && (
        <div className="mt-8 space-y-4">
          {hasFile && slot.status === "rejected" && (
            <FilePreview
              url={slot.cloudinaryUrl}
              filename={slot.originalFilename}
              label={`${slot.label} (précédent)`}
            />
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf,application/pdf"
            className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0])}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              onFileChange(e.dataTransfer.files?.[0]);
            }}
            className={`eef-dropzone w-full disabled:opacity-60 ${
              dragging ? "eef-dropzone-active" : ""
            }`}
          >
            <span className="font-display text-lg text-eef-navy">
              {uploading
                ? "Envoi en cours…"
                : slot.status === "rejected"
                  ? "Renvoyer un fichier"
                  : "Déposez votre fichier ici"}
            </span>
            <span className="mt-2 block text-sm text-eef-secondary">
              PDF ou image · ou cliquez pour parcourir
            </span>
          </button>
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        </div>
      )}
    </section>
  );
}
