"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SAVED_TYPES } from "@/lib/module-catalog";

type Item = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  url: string;
  notes: string;
};

const emptyForm = { type: "formation", title: "", subtitle: "", url: "", notes: "" };

export function SavedItemsPanel() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/saved-items");
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
    setError(null);
    const res = await fetch("/api/saved-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Erreur");
      return;
    }
    setForm(emptyForm);
    setOpen(false);
    await load();
  }

  async function remove(id: string) {
    await fetch(`/api/saved-items/${id}`, { method: "DELETE" });
    await load();
  }

  async function convert(id: string) {
    const res = await fetch(`/api/saved-items/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "convert" }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Erreur");
      return;
    }
    router.push("/mon-dossier/candidatures");
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eef-kicker">Wishlist</p>
          <h1 className="mt-2 font-display text-3xl text-eef-navy">Sauvegardés</h1>
          <p className="mt-1.5 max-w-xl text-eef-secondary">
            Formations, bourses et logements à comparer — convertissez une formation en
            candidature.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="eef-btn-navy h-11 px-5"
        >
          {open ? "Fermer" : "+ Sauvegarder"}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}

      {open && (
        <form onSubmit={create} className="eef-step-panel mb-8 space-y-4">
          <label className="block text-sm">
            <span className="font-medium text-eef-navy">Type</span>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="eef-input mt-1.5"
            >
              {SAVED_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-eef-navy">Titre *</span>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="eef-input mt-1.5"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-eef-navy">Sous-titre / établissement</span>
            <input
              value={form.subtitle}
              onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              className="eef-input mt-1.5"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-eef-navy">Lien</span>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              className="eef-input mt-1.5"
              placeholder="https://"
            />
          </label>
          <button type="submit" className="eef-btn-primary h-11 px-6">
            Enregistrer
          </button>
        </form>
      )}

      {loading && !items.length && <p className="text-eef-secondary">Chargement…</p>}

      {!loading && items.length === 0 && (
        <div className="eef-panel px-6 py-12 text-center">
          <p className="font-display text-xl text-eef-navy">Rien de sauvegardé</p>
          <p className="mt-2 text-sm text-eef-secondary">
            Gardez ici les formations et logements qui vous intéressent.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="eef-panel px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-eef-secondary">
                  {SAVED_TYPES.find((t) => t.value === item.type)?.label ?? item.type}
                </p>
                <h3 className="mt-1 font-display text-xl text-eef-navy">{item.title}</h3>
                {item.subtitle && (
                  <p className="mt-0.5 text-sm text-eef-secondary">{item.subtitle}</p>
                )}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm text-eef-deep hover:underline"
                  >
                    Ouvrir le lien
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {item.type === "formation" && (
                  <button
                    type="button"
                    onClick={() => convert(item.id)}
                    className="eef-btn-primary h-10 px-4 text-sm"
                  >
                    → Candidature
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="eef-btn-ghost h-10 px-3 text-sm"
                >
                  Retirer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
