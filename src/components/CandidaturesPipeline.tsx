"use client";

import { useCallback, useEffect, useState } from "react";
import { CANDIDATURE_STATUSES } from "@/lib/module-catalog";

type Item = {
  id: string;
  etablissement: string;
  programme: string;
  ville: string;
  niveau: string;
  voie: string;
  dateLimite: string;
  status: string;
  notes: string;
};

const emptyForm = {
  etablissement: "",
  programme: "",
  ville: "",
  niveau: "",
  voie: "",
  dateLimite: "",
};

export function CandidaturesPipeline() {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/candidatures");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur");
      setItems(json.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/candidatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur");
      setForm(emptyForm);
      setOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    const res = await fetch(`/api/candidatures/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const json = await res.json();
      setError(json.error || "Erreur");
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cette candidature ?")) return;
    await fetch(`/api/candidatures/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eef-kicker">Pipeline</p>
          <h1 className="mt-2 font-display text-3xl text-eef-navy">
            Pipeline de candidatures
          </h1>
          <p className="mt-1.5 max-w-xl text-eef-secondary">
            Suivez chaque établissement — de l’intérêt à l’inscription.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="eef-btn-navy inline-flex h-11 items-center px-5"
        >
          {open ? "Fermer" : "+ Ajouter une candidature"}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}

      {open && (
        <form onSubmit={create} className="eef-step-panel mb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                ["etablissement", "Établissement *", true],
                ["programme", "Programme *", true],
                ["ville", "Ville", false],
                ["niveau", "Niveau", false],
                ["voie", "Voie (EEF, Directe…)", false],
                ["dateLimite", "Date limite", false],
              ] as const
            ).map(([key, label, required]) => (
              <label key={key} className="block text-sm">
                <span className="font-medium text-eef-navy">{label}</span>
                <input
                  required={required}
                  type={key === "dateLimite" ? "date" : "text"}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="eef-input mt-1.5"
                />
              </label>
            ))}
          </div>
          <button
            type="submit"
            disabled={saving}
            className="eef-btn-primary mt-5 h-11 px-6 disabled:opacity-60"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </form>
      )}

      {loading && !items.length && (
        <p className="text-eef-secondary">Chargement…</p>
      )}

      {!loading && items.length === 0 && (
        <div className="eef-panel px-6 py-12 text-center">
          <p className="font-display text-xl text-eef-navy">Aucune candidature</p>
          <p className="mt-2 text-sm text-eef-secondary">
            Ajoutez un établissement pour démarrer votre pipeline.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="eef-panel px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="font-display text-xl text-eef-navy">
                  {item.etablissement}
                </h3>
                <p className="mt-0.5 text-sm text-eef-secondary">{item.programme}</p>
                <p className="mt-2 text-xs text-eef-secondary">
                  {[item.ville, item.niveau, item.voie].filter(Boolean).join(" · ") ||
                    "Détails à compléter"}
                  {item.dateLimite ? ` · Limite ${item.dateLimite}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  className="eef-input w-auto py-2 text-sm"
                >
                  {CANDIDATURE_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="eef-btn-ghost h-10 px-3 text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
