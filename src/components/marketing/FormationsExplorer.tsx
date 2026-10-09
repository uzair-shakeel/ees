"use client";

import { useDeferredValue, useMemo, useState } from "react";
import catalog from "@/content/formations-catalog.json";

type Formation = (typeof catalog)[number];
type FilterKey = keyof Pick<
  Formation,
  | "niveau"
  | "domaine"
  | "institution_type"
  | "ville"
  | "langue"
  | "alternance"
  | "admission"
  | "public_prive"
  | "reconnaissance"
>;
type SortKey = "relevance" | "formation" | "institution" | "ville";

const FORMATIONS = catalog as Formation[];
const PAGE_SIZE = 12;

const GROUPS: { key: FilterKey; label: string }[] = [
  { key: "niveau", label: "Niveau" },
  { key: "domaine", label: "Domaine" },
  { key: "institution_type", label: "Type d'établissement" },
  { key: "ville", label: "Ville" },
  { key: "langue", label: "Langue" },
  { key: "alternance", label: "Alternance" },
  { key: "admission", label: "Admission" },
  { key: "public_prive", label: "Statut" },
  { key: "reconnaissance", label: "Reconnaissance" },
];

const PREFERRED: Partial<Record<FilterKey, string[]>> = {
  niveau: ["Licence", "Bachelor", "Master", "MBA", "Post-master"],
};

function norm(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function haystack(item: Formation) {
  return norm(
    [
      item.formation,
      item.institution,
      item.institution_type,
      item.public_prive,
      item.campus,
      item.ville,
      item.region,
      item.niveau,
      item.domaine,
      item.specialite,
      item.langue,
      item.modalite,
      item.alternance,
      item.admission,
      item.duree,
      item.frais,
      item.reconnaissance,
      item.selectivite,
      item.international,
    ].join(" "),
  );
}

function score(item: Formation, tokens: string[]) {
  if (!tokens.length) return 0;
  const formation = norm(item.formation);
  const institution = norm(item.institution);
  const specialite = norm(item.specialite);
  const all = haystack(item);
  return tokens.reduce((total, token) => {
    let next = total;
    if (formation.includes(token)) next += 6;
    if (specialite.includes(token)) next += 4;
    if (institution.includes(token)) next += 3;
    if (all.includes(token)) next += 1;
    return next;
  }, 0);
}

function matches(item: Formation, tokens: string[], selected: Partial<Record<FilterKey, string[]>>, skip?: FilterKey) {
  if (tokens.length && !tokens.every((token) => haystack(item).includes(token))) return false;
  return GROUPS.every(({ key }) => {
    if (key === skip) return true;
    const values = selected[key];
    return !values?.length || values.includes(String(item[key]));
  });
}

function Chip({
  label,
  count,
  pressed,
  onClick,
}: {
  label: string;
  count: number;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap transition ${ pressed ? "border-[#102b43] bg-[#102b43] text-white" : "border-[#c6d9e7] bg-white text-[#5e7282] hover:border-[#63a8d8] hover:text-[#63a8d8]" }`}
    >
      {label} <span className={pressed ? "font-medium text-white/70" : "font-medium text-[#8a96a6]"}>{count}</span>
    </button>
  );
}

export function FormationsExplorer() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Partial<Record<FilterKey, string[]>>>({});
  const [sort, setSort] = useState<SortKey>("relevance");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const tokens = useMemo(() => norm(deferredQuery).split(/\s+/).filter(Boolean), [deferredQuery]);

  const options = useMemo(() => {
    const next = {} as Record<FilterKey, { value: string; count: number }[]>;
    for (const { key } of GROUPS) {
      const counts = new Map<string, number>();
      for (const item of FORMATIONS) {
        if (!matches(item, tokens, selected, key)) continue;
        const value = String(item[key]);
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }
      const preferred = PREFERRED[key] ?? [];
      next[key] = [...counts.entries()]
        .sort((a, b) => {
          const ai = preferred.indexOf(a[0]);
          const bi = preferred.indexOf(b[0]);
          if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
          return a[0].localeCompare(b[0], "fr");
        })
        .map(([value, count]) => ({ value, count }));
    }
    return next;
  }, [tokens, selected]);

  const results = useMemo(() => {
    const list = FORMATIONS.filter((item) => matches(item, tokens, selected));
    list.sort((a, b) => {
      if (sort === "formation") return a.formation.localeCompare(b.formation, "fr");
      if (sort === "institution") return a.institution.localeCompare(b.institution, "fr");
      if (sort === "ville") return a.ville.localeCompare(b.ville, "fr") || a.formation.localeCompare(b.formation, "fr");
      return score(b, tokens) - score(a, tokens) || a.institution.localeCompare(b.institution, "fr");
    });
    return list;
  }, [tokens, selected, sort]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function toggle(key: FilterKey, value: string) {
    setPage(1);
    setSelected((current) => {
      const values = current[key] ?? [];
      const nextValues = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
      return { ...current, [key]: nextValues };
    });
  }

  const filterList = GROUPS.map(({ key, label }) => (
    <div key={key}>
      <p className="m-0 mb-2 text-[11.5px] font-bold tracking-[0.08em] text-[#5e7282]">{label}</p>
      <div className="flex min-w-0 flex-wrap gap-1.5">
        {options[key].map((option) => (
          <Chip
            key={option.value}
            label={option.value}
            count={option.count}
            pressed={selected[key]?.includes(option.value) ?? false}
            onClick={() => toggle(key, option.value)}
          />
        ))}
      </div>
    </div>
  ));

  return (
    <div>
      <form
        className="flex h-[58px] items-center gap-2 rounded-full border border-[#c6d9e7] bg-white py-2 pr-2 pl-5 shadow-[rgba(37,39,37,0.08)_0px_10px_30px_-12px] max-md:h-auto max-md:flex-wrap max-md:rounded-[18px] max-md:p-2"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 max-md:basis-full max-md:px-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#5e7282]" aria-hidden>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.34-4.34" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Rechercher une université, une école ou une formation"
            className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-[#102B43] outline-none placeholder:text-[#9aabba]"
            aria-label="Rechercher une université, une école ou une formation"
          />
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="hidden h-10 shrink-0 items-center justify-center rounded-full border border-[#102b43] px-4 text-[13px] font-medium text-[#102b43] max-md:inline-flex"
        >
          Filtres
        </button>
        <button type="submit" className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-eef-navy px-4.5 text-[13.5px] font-medium text-white transition hover:bg-eef-ink">
          Rechercher
        </button>
      </form>

      <div className="mt-8 grid items-start gap-10 md:grid-cols-[minmax(0,240px)_1fr] md:gap-12">
        <div className="hidden min-w-0 md:grid md:gap-5 md:sticky md:top-24 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto md:pr-1">
          {filterList}
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 text-[14px] text-[#5e7282]">
              <strong className="font-semibold text-[#15263d]">{results.length}</strong>{" "}
              {results.length === 1 ? "formation" : "formations"}
            </p>
            <label className="inline-flex items-center gap-2 text-[13px] text-[#33445c]">
              Trier par
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value as SortKey);
                  setPage(1);
                }}
                className="cursor-pointer rounded-full border border-[#d8e0ea] bg-white px-3 py-1.5 text-[13px] text-[#15263d]"
              >
                <option value="relevance">Pertinence</option>
                <option value="formation">Formation A–Z</option>
                <option value="institution">Établissement A–Z</option>
                <option value="ville">Ville A–Z</option>
              </select>
            </label>
          </div>

          {visible.length ? (
            <div className="grid gap-3">
              {visible.map((item) => (
                <article key={item.id} className="rounded-2xl border border-[#e6ecf3] bg-white px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="m-0 text-[17px] leading-[1.35] font-semibold tracking-[-0.01em] text-[#15263d]">{item.formation}</h3>
                      <p className="m-0 mt-1 text-[13.5px] text-[#5d6b7e]">
                        {item.institution} · {item.campus === item.ville ? item.ville : `${item.campus}, ${item.ville}`}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] tracking-[0.04em] text-[#8a96a6]">Synthétique</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[item.niveau, item.domaine, item.institution_type, item.langue, item.alternance === "Oui" ? "Alternance" : null]
                      .filter(Boolean)
                      .map((pill) => (
                        <span key={pill} className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11.5px] font-medium text-[#33445c]">
                          {pill}
                        </span>
                      ))}
                  </div>
                  <dl className="mt-3 grid gap-x-6 gap-y-1 text-[13px] text-[#33445c] sm:grid-cols-2">
                    <div><dt className="inline font-semibold text-[#15263d]">Spécialité : </dt><dd className="inline">{item.specialite}</dd></div>
                    <div><dt className="inline font-semibold text-[#15263d]">Admission : </dt><dd className="inline">{item.admission}</dd></div>
                    <div><dt className="inline font-semibold text-[#15263d]">Frais : </dt><dd className="inline">{item.frais}</dd></div>
                    <div><dt className="inline font-semibold text-[#15263d]">Durée : </dt><dd className="inline">{item.duree}</dd></div>
                    <div><dt className="inline font-semibold text-[#15263d]">Reconnaissance : </dt><dd className="inline">{item.reconnaissance}</dd></div>
                    <div><dt className="inline font-semibold text-[#15263d]">Sélectivité : </dt><dd className="inline">{item.selectivite}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-[#c6d9e7] bg-white/70 px-6 py-16 text-center">
              <h3 className="m-0 text-[22px] font-medium text-[#102B43]">Aucun résultat</h3>
              <p className="m-0 mt-2 text-[14px] text-[#5e7282]">Retirez un filtre ou élargissez la recherche.</p>
            </div>
          )}

          {results.length > PAGE_SIZE && (
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="h-10 cursor-pointer rounded-full border border-[#c6d9e7] bg-white px-4 text-[13px] font-medium text-[#173b5d] disabled:cursor-default disabled:opacity-40"
              >
                Précédent
              </button>
              <p className="m-0 text-[13px] text-[#5e7282]">
                Page {safePage} / {pageCount}
              </p>
              <button
                type="button"
                disabled={safePage >= pageCount}
                onClick={() => setPage((current) => current + 1)}
                className="h-10 cursor-pointer rounded-full border border-[#c6d9e7] bg-white px-4 text-[13px] font-medium text-[#173b5d] disabled:cursor-default disabled:opacity-40"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Filtres de recherche">
          <button type="button" aria-label="Fermer les filtres" onClick={() => setFiltersOpen(false)} className="absolute inset-0 h-full w-full cursor-default bg-[#102b43]/75" />
          <div className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-[26px] bg-[#fdfcf8] px-6 pt-6 pb-10 shadow-[0_-12px_35px_rgba(16,43,67,0.16)]">
            <div className="relative mb-5 flex items-center justify-center">
              <h3 className="m-0 text-[20px] font-medium text-[#102b43]">Filtres</h3>
              <button type="button" aria-label="Fermer les filtres" onClick={() => setFiltersOpen(false)} className="absolute right-0 text-[13px] text-[#5e7282]">
                Fermer
              </button>
            </div>
            <div className="grid gap-5">{filterList}</div>
          </div>
        </div>
      )}
    </div>
  );
}
