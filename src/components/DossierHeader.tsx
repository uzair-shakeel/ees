"use client";

import { useRouter } from "next/navigation";

type Props = {
  name: string;
  progress: number;
  modeLabel?: string;
  subtitle?: string;
};

export function DossierHeader({
  name,
  progress,
  modeLabel = "MA PROCÉDURE",
  subtitle = "Suivez chaque étape jusqu’à la validation",
}: Props) {
  const router = useRouter();
  const first = name.split(" ")[0];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eef-kicker">{modeLabel}</p>
          <h1 className="mt-2 font-display text-3xl text-eef-navy sm:text-4xl">
            Bonjour {first}
          </h1>
          <p className="mt-1.5 text-eef-secondary">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-eef-secondary">
              Progression
            </p>
            <p className="mt-0.5 font-display text-2xl text-eef-navy">{progress}%</p>
          </div>
          <button type="button" onClick={logout} className="eef-btn-ghost px-3.5 py-2">
            Déconnexion
          </button>
        </div>
      </div>
      <div className="eef-progress mt-5">
        <span style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
      </div>
    </header>
  );
}
