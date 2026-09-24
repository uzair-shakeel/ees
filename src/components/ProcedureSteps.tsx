"use client";

import Link from "next/link";

export type JourneyStep = {
  slug: string;
  title: string;
  short: string;
  status: "in_progress" | "ready" | "proceeded" | "locked";
  progress: number;
};

type Props = {
  steps: JourneyStep[];
  activeSlug?: string;
  compact?: boolean;
};

function stepState(status: JourneyStep["status"]) {
  if (status === "proceeded") return "done";
  if (status === "ready") return "ready";
  if (status === "locked") return "locked";
  return "active";
}

export function ProcedureSteps({ steps, activeSlug, compact }: Props) {
  return (
    <ol
      className={`flex ${compact ? "flex-row gap-2 overflow-x-auto pb-1" : "flex-col gap-1"}`}
      aria-label="Étapes de la procédure"
    >
      {steps.map((step, i) => {
        const state = stepState(step.status);
        const active = activeSlug === step.slug;
        const href =
          step.status === "locked" ? undefined : `/mon-dossier/services/${step.slug}`;

        const inner = (
          <>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                state === "done"
                  ? "bg-eef-navy text-white"
                  : state === "ready"
                    ? "bg-eef-blue text-white"
                    : active
                      ? "bg-eef-blue/15 text-eef-navy ring-2 ring-eef-blue"
                      : state === "locked"
                        ? "bg-eef-soft text-eef-secondary"
                        : "bg-white text-eef-navy ring-1 ring-eef-border"
              }`}
            >
              {state === "done" ? "✓" : String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span
                className={`block text-sm font-medium ${
                  active ? "text-eef-navy" : "text-eef-secondary"
                }`}
              >
                {step.short}
              </span>
              {!compact && (
                <span className="mt-0.5 block text-xs text-eef-secondary">
                  {state === "done"
                    ? "Terminé"
                    : state === "ready"
                      ? "Prêt à continuer"
                      : state === "locked"
                        ? "À venir"
                        : `${step.progress}%`}
                </span>
              )}
            </span>
          </>
        );

        const className = `flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors ${
          active ? "bg-eef-soft/80" : "hover:bg-white/60"
        } ${compact ? "min-w-[9.5rem]" : ""} ${
          step.status === "locked" ? "cursor-not-allowed opacity-60" : ""
        }`;

        return (
          <li key={step.slug} className="relative">
            {!compact && i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[1.4rem] top-11 h-[calc(100%-0.5rem)] w-px bg-eef-soft"
              />
            )}
            {href ? (
              <Link href={href} className={className}>
                {inner}
              </Link>
            ) : (
              <div className={className}>{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
