"use client";

import { useState } from "react";

type Requirement = {
  key: string;
  label: string;
  description: string;
  required: boolean;
};

type Section = {
  slug: string;
  title: string;
  description: string;
  requirements: Requirement[];
};

function blankRequirement(): Requirement {
  return {
    key: `new_${crypto.randomUUID().slice(0, 8)}`,
    label: "",
    description: "",
    required: true,
  };
}

export function AdminSectionsEditor({ sections }: { sections: Section[] }) {
  const [items, setItems] = useState(sections);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  function updateSection(slug: string, requirements: Requirement[]) {
    setSaved(null);
    setItems((current) =>
      current.map((section) => (section.slug === slug ? { ...section, requirements } : section)),
    );
  }

  async function save(section: Section) {
    if (section.requirements.some((req) => !req.label.trim() || !req.description.trim())) {
      setError("Chaque pièce a besoin d'un nom et d'une description.");
      setSaved(null);
      return;
    }
    setSaving(section.slug);
    setError(null);
    setSaved(null);
    try {
      const res = await fetch(`/api/admin/services/${section.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirements: section.requirements }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Enregistrement impossible");
      updateSection(section.slug, json.requirements);
      setSaved(section.slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-8">
      <header className="border-b border-eef-soft pb-8">
        <p className="eef-kicker">Documents</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none text-eef-navy">
          Sections
        </h1>
        <p className="mt-3 max-w-2xl text-eef-secondary">
          Ajoutez, modifiez ou retirez les pièces demandées dans chaque dossier. Le changement
          s&apos;applique à tous les étudiants de la section.
        </p>
      </header>

      {error && <p className="text-sm text-red-700">{error}</p>}

      {items.map((section) => (
        <section key={section.slug} className="eef-panel overflow-hidden">
          <div className="border-b border-eef-soft px-5 py-5 sm:px-6">
            <h2 className="font-display text-2xl text-eef-navy">{section.title}</h2>
            <p className="mt-1 text-sm text-eef-secondary">{section.description}</p>
          </div>

          <div>
            {section.requirements.length === 0 && (
              <p className="px-5 py-6 text-sm text-eef-secondary sm:px-6">
                Aucune pièce pour le moment.
              </p>
            )}
            {section.requirements.map((req, index) => (
              <div key={req.key} className="eef-row grid gap-3 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-eef-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateSection(
                        section.slug,
                        section.requirements.filter((item) => item.key !== req.key),
                      )
                    }
                    className="text-sm text-eef-secondary hover:text-eef-navy"
                  >
                    Retirer
                  </button>
                </div>
                <input
                  value={req.label}
                  onChange={(event) =>
                    updateSection(
                      section.slug,
                      section.requirements.map((item) =>
                        item.key === req.key ? { ...item, label: event.target.value } : item,
                      ),
                    )
                  }
                  placeholder="Nom de la pièce"
                  className="h-11 rounded-xl border border-eef-border bg-white px-3 text-sm text-eef-navy outline-none focus:border-eef-blue"
                />
                <textarea
                  value={req.description}
                  onChange={(event) =>
                    updateSection(
                      section.slug,
                      section.requirements.map((item) =>
                        item.key === req.key ? { ...item, description: event.target.value } : item,
                      ),
                    )
                  }
                  rows={2}
                  placeholder="Ce que l'étudiant doit fournir"
                  className="rounded-xl border border-eef-border bg-white px-3 py-2 text-sm text-eef-navy outline-none focus:border-eef-blue"
                />
                <label className="flex items-center gap-2 text-sm text-eef-secondary">
                  <input
                    type="checkbox"
                    checked={req.required}
                    onChange={(event) =>
                      updateSection(
                        section.slug,
                        section.requirements.map((item) =>
                          item.key === req.key ? { ...item, required: event.target.checked } : item,
                        ),
                      )
                    }
                    className="size-4 accent-[#173b5d]"
                  />
                  Obligatoire
                </label>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-eef-soft px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={() =>
                updateSection(section.slug, [...section.requirements, blankRequirement()])
              }
              className="eef-btn-ghost px-4 py-2 text-sm"
            >
              Ajouter une pièce
            </button>
            <button
              type="button"
              disabled={saving === section.slug}
              onClick={() => save(section)}
              className="eef-btn-primary px-4 py-2 text-sm disabled:opacity-50"
            >
              {saving === section.slug ? "Enregistrement…" : "Enregistrer"}
            </button>
            {saved === section.slug && (
              <span className="text-sm text-eef-navy">Section enregistrée.</span>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
