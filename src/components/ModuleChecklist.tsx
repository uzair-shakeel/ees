"use client";

import { useCallback, useEffect, useState } from "react";

type Step = {
  key: string;
  title: string;
  description: string;
  badge?: string;
  phase?: string;
  status: "todo" | "doing" | "done";
};

type Props = {
  module: "visa" | "installation";
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
};

const LABELS = {
  todo: "À faire",
  doing: "En cours",
  done: "Fait",
} as const;

export function ModuleChecklist({ module, title, subtitle, footer }: Props) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/checklist/${module}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur");
      setSteps(json.steps);
      setProgress(json.progress);
      setDone(json.done);
      setTotal(json.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }, [module]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(stepKey: string, status: Step["status"]) {
    setBusyKey(stepKey);
    setSteps((prev) => prev.map((s) => (s.key === stepKey ? { ...s, status } : s)));
    try {
      const res = await fetch(`/api/checklist/${module}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepKey, status }),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Erreur");
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      await load();
    } finally {
      setBusyKey(null);
    }
  }

  const phases = Array.from(
    new Set(steps.map((s) => s.phase).filter(Boolean) as string[]),
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eef-kicker">
            {module === "visa" ? "Centre de commandement" : "Timeline"}
          </p>
          <h1 className="mt-2 font-display text-3xl text-eef-navy">{title}</h1>
          <p className="mt-1.5 max-w-xl text-eef-secondary">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl text-eef-navy">{progress}%</p>
          <p className="text-xs text-eef-secondary">
            {done} / {total} étapes
          </p>
        </div>
      </div>

      <div className="eef-progress mb-6">
        <span style={{ width: `${progress}%` }} />
      </div>

      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
      {loading && !steps.length && (
        <p className="text-eef-secondary">Chargement…</p>
      )}

      {phases.length > 0 ? (
        phases.map((phase) => (
          <section key={phase} className="mb-8">
            <p className="eef-kicker mb-3">{phase}</p>
            <div className="eef-panel overflow-hidden">
              {steps
                .filter((s) => s.phase === phase)
                .map((step) => (
                  <StepRow
                    key={step.key}
                    step={step}
                    busy={busyKey === step.key}
                    onStatus={setStatus}
                  />
                ))}
            </div>
          </section>
        ))
      ) : (
        <div className="eef-panel overflow-hidden">
          {steps.map((step) => (
            <StepRow
              key={step.key}
              step={step}
              busy={busyKey === step.key}
              onStatus={setStatus}
            />
          ))}
        </div>
      )}

      {footer && <div className="mt-8">{footer}</div>}
    </div>
  );
}

function StepRow({
  step,
  busy,
  onStatus,
}: {
  step: Step;
  busy: boolean;
  onStatus: (key: string, status: Step["status"]) => void;
}) {
  return (
    <article className="eef-row px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-eef-navy">{step.title}</h3>
            {step.badge && (
              <span className="rounded-full bg-eef-soft px-2 py-0.5 text-[11px] text-eef-deep">
                {step.badge}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-eef-secondary">{step.description}</p>
        </div>
        <div className="flex shrink-0 gap-1 rounded-lg border border-eef-soft bg-eef-mist p-1">
          {(["todo", "doing", "done"] as const).map((status) => (
            <button
              key={status}
              type="button"
              disabled={busy}
              onClick={() => onStatus(step.key, status)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                step.status === status
                  ? "bg-eef-navy text-white"
                  : "text-eef-secondary hover:text-eef-navy"
              }`}
            >
              {LABELS[status]}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
