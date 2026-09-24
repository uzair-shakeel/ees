"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentSlot, type DocumentSlotData } from "./DocumentSlot";
import { StatusBadge } from "./StatusBadge";

type ChecklistResponse = {
  service: { slug: string; title: string; description: string };
  application: {
    id: string;
    status: "in_progress" | "ready" | "proceeded";
    progress: number;
  };
  slots: DocumentSlotData[];
};

function pickInitialStep(slots: DocumentSlotData[]) {
  const rejected = slots.findIndex((s) => s.status === "rejected");
  if (rejected >= 0) return rejected;
  const missing = slots.findIndex((s) => s.status === "missing");
  if (missing >= 0) return missing;
  const pending = slots.findIndex((s) => s.status === "pending");
  if (pending >= 0) return pending;
  return 0;
}

export function ServiceChecklist({ slug }: { slug: string }) {
  const router = useRouter();
  const [data, setData] = useState<ChecklistResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [proceeding, setProceeding] = useState(false);
  const [proceedError, setProceedError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [reviewing, setReviewing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/applications/${slug}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Impossible de charger le dossier");
      setData(json);
      setStepIndex((prev) => {
        if (!json.slots?.length) return 0;
        if (prev > 0 && prev < json.slots.length) return prev;
        return pickInitialStep(json.slots);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setReviewing(false);
    setStepIndex(0);
  }, [slug]);

  const ready =
    data?.application.status === "ready" || data?.application.status === "proceeded";
  const alreadyProceeded = data?.application.status === "proceeded";

  const approvedCount = useMemo(
    () => data?.slots.filter((s) => s.status === "approved").length ?? 0,
    [data],
  );

  async function handleProceed() {
    if (!data || data.application.status === "in_progress") return;
    setProceeding(true);
    setProceedError(null);
    try {
      const res = await fetch(`/api/applications/${slug}/proceed`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Impossible de continuer");

      if (json.nextSlug) {
        router.push(`/mon-dossier/services/${json.nextSlug}`);
      } else {
        router.push("/mon-dossier?proceeded=1");
      }
      router.refresh();
    } catch (err) {
      setProceedError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setProceeding(false);
    }
  }

  if (loading && !data) {
    return <p className="text-eef-secondary">Chargement du dossier…</p>;
  }

  if (error && !data) {
    return <p className="text-eef-ink">{error}</p>;
  }

  if (!data) return null;

  const slot = data.slots[stepIndex];
  const total = data.slots.length;

  if (ready && !reviewing) {
    return (
      <div className="eef-ready-stage">
        <p className="eef-kicker">Étape terminée</p>
        <h1 className="mt-3 font-display text-3xl text-eef-navy sm:text-4xl">
          {alreadyProceeded ? "Procédure poursuivie" : "Dossier prêt"}
        </h1>
        <p className="mt-3 max-w-lg text-eef-secondary">
          {alreadyProceeded
            ? "Cette étape est enregistrée. Passez à la suite de votre parcours."
            : `Les ${approvedCount} documents de « ${data.service.title} » sont approuvés. Continuez pour enchaîner.`}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <StatusBadge status={data.application.status} />
          <span className="text-sm text-eef-secondary">{data.application.progress}%</span>
        </div>

        {proceedError && <p className="mt-4 text-sm text-red-700">{proceedError}</p>}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            disabled={proceeding}
            onClick={handleProceed}
            className="eef-btn-primary inline-flex h-12 items-center justify-center px-8 text-base disabled:opacity-60"
          >
            {proceeding
              ? "Suite…"
              : alreadyProceeded
                ? "Aller à la suite"
                : "Continuer la procédure"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex(0);
              setReviewing(true);
            }}
            className="eef-btn-ghost inline-flex h-12 items-center justify-center px-5"
          >
            Revoir les documents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="lg:pt-1">
        <div className="mb-4">
          <p className="eef-kicker">Dossier</p>
          <h1 className="mt-1 font-display text-xl text-eef-navy">{data.service.title}</h1>
          <p className="mt-2 text-sm text-eef-secondary">
            {approvedCount}/{data.slots.filter((s) => s.required).length} validés
          </p>
          <div className="eef-progress mt-3">
            <span style={{ width: `${data.application.progress}%` }} />
          </div>
        </div>

        <ol className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
          {data.slots.map((s, i) => {
            const active = i === stepIndex;
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => setStepIndex(i)}
                  className={`flex w-full min-w-[10rem] items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors lg:min-w-0 ${
                    active
                      ? "bg-eef-soft text-eef-navy"
                      : "text-eef-secondary hover:bg-white/70 hover:text-eef-navy"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      s.status === "approved"
                        ? "bg-eef-navy text-white"
                        : s.status === "rejected"
                          ? "bg-eef-ink text-white"
                          : s.status === "pending"
                            ? "bg-eef-blue text-white"
                            : active
                              ? "bg-white text-eef-navy ring-1 ring-eef-blue"
                              : "bg-white text-eef-secondary ring-1 ring-eef-border"
                    }`}
                  >
                    {s.status === "approved" ? "✓" : String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{s.label}</span>
                    <span className="mt-0.5 block text-[11px] capitalize opacity-80">
                      {s.status === "missing"
                        ? "À déposer"
                        : s.status === "pending"
                          ? "En revue"
                          : s.status === "approved"
                            ? "Validé"
                            : "À corriger"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      <div>
        {slot && (
          <DocumentSlot
            key={slot.key}
            slot={slot}
            applicationId={data.application.id}
            onUpdated={load}
            stepNumber={stepIndex + 1}
            totalSteps={total}
          />
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            className="eef-btn-ghost h-11 px-5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Précédent
          </button>
          <div className="flex items-center gap-3">
            {ready && (
              <button
                type="button"
                onClick={() => setReviewing(false)}
                className="eef-btn-primary hidden h-11 px-5 sm:inline-flex sm:items-center"
              >
                Retour — Continuer
              </button>
            )}
            <p className="hidden text-xs text-eef-secondary sm:block">
              {stepIndex + 1} / {total}
            </p>
          </div>
          <button
            type="button"
            disabled={stepIndex >= total - 1}
            onClick={() => setStepIndex((i) => Math.min(total - 1, i + 1))}
            className="eef-btn-navy h-11 px-5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
