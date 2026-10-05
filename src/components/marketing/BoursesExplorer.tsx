"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  BOURSES_CONFIG,
  NIVEAUX,
  PERIOD_LABEL,
  SORTS,
  STATUS_LABEL,
  daysBetween,
  fold,
  formatDateFR,
  formatNumber,
  perYear,
  safeUrl,
  todayISO,
  type Bourse,
  type Niveau,
  type SortKey,
  type Statut,
} from "@/lib/bourses";

type Indexed = Bourse & { _search: string; _days: number | null; _perYear: number | null };

const isNiveau = (v: string): v is Niveau => (NIVEAUX as readonly string[]).includes(v);
const isSort = (v: string): v is SortKey => (SORTS as readonly string[]).includes(v);

const STATUS_CLASS: Record<Statut, string> = {
  VERIFIE: "bg-[#e3f3ea] text-[#17703f]",
  EN_REVUE: "bg-[#fcf0d6] text-[#8a5a00]",
  MANQUANT: "bg-[#eceff3] text-[#5f6773]",
};

function dateRank(it: Indexed): [number, number] {
  if (it._days === null) return [1, 0];
  if (it._days < 0) return [2, -it._days];
  return [0, it._days];
}

function sortItems(list: Indexed[], sort: SortKey): Indexed[] {
  const arr = list.slice();
  if (sort === "montant") arr.sort((a, b) => (b._perYear ?? -1) - (a._perYear ?? -1));
  else if (sort === "nom") arr.sort((a, b) => a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" }));
  else arr.sort((a, b) => {
    const x = dateRank(a);
    const y = dateRank(b);
    return x[0] - y[0] || x[1] - y[1];
  });
  return arr;
}

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (!text || !tokens.length) return <>{text}</>;

  let folded = "";
  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const f = fold(text[i]);
    for (let k = 0; k < f.length; k++) {
      folded += f[k];
      map.push(i);
    }
  }

  const ranges: [number, number][] = [];
  for (const t of tokens) {
    let from = 0;
    let idx: number;
    while ((idx = folded.indexOf(t, from)) !== -1) {
      ranges.push([map[idx], map[idx + t.length - 1] + 1]);
      from = idx + t.length;
    }
  }
  if (!ranges.length) return <>{text}</>;

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [ranges[0]];
  for (const r of ranges.slice(1)) {
    const last = merged[merged.length - 1];
    if (r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push(r);
  }

  const out: ReactNode[] = [];
  let pos = 0;
  merged.forEach(([s, e], i) => {
    if (s > pos) out.push(text.slice(pos, s));
    out.push(
      <mark key={i} className="rounded-[3px] bg-[#fff0b3] px-px text-inherit">
        {text.slice(s, e)}
      </mark>,
    );
    pos = e;
  });
  if (pos < text.length) out.push(text.slice(pos));
  return <>{out}</>;
}

function StatusBadge({ statut }: { statut: Statut }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-[6px] px-2 py-[3px] text-[10.5px] font-bold tracking-[0.05em] leading-[1.4] ${STATUS_CLASS[statut]}`}
    >
      {STATUS_LABEL[statut]}
    </span>
  );
}

function Missing() {
  return (
    <span className="inline-block rounded-[6px] bg-[#eceff3] px-[7px] py-px text-[11.5px] font-semibold text-[#5f6773]">
      Manquant
    </span>
  );
}

function Amount({ montant }: { montant: Bourse["montant"] }) {
  if (!montant) return <Missing />;
  return (
    <>
      {formatNumber(montant.valeur)} €{" "}
      <span className="text-[12.5px] font-medium text-[#5d6b7e]">{PERIOD_LABEL[montant.periode]}</span>
    </>
  );
}

function Deadline({ iso, days }: { iso: string | null; days: number | null }) {
  if (!iso || days === null) return <Missing />;
  let pill: ReactNode;
  if (days < 0) pill = <span className="rounded-full bg-[#eceff3] px-2 py-px text-[11.5px] font-semibold text-[#5f6773]">Clôturée</span>;
  else if (days === 0) pill = <span className="rounded-full bg-[#fbe7e8] px-2 py-px text-[11.5px] font-semibold text-[#a8212a]">Aujourd&apos;hui</span>;
  else if (days <= 14) pill = <span className="rounded-full bg-[#fbe7e8] px-2 py-px text-[11.5px] font-semibold tabular-nums text-[#a8212a]">J-{days}</span>;
  else pill = <span className="rounded-full bg-[#e7eef8] px-2 py-px text-[11.5px] font-semibold tabular-nums text-[#1f3a5f]">J-{days}</span>;
  return (
    <>
      {formatDateFR(iso)} {pill}
    </>
  );
}

export function BoursesExplorer({
  bourses,
  initialToday,
  demo = BOURSES_CONFIG.demo,
}: {
  bourses: Bourse[];
  initialToday: string;
  demo?: boolean;
}) {
  const [today, setToday] = useState(initialToday);
  const [q, setQ] = useState("");
  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [hideClosed, setHideClosed] = useState(false);
  const [sort, setSort] = useState<SortKey>("date");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const urlReady = useRef(false);
  const deferredQ = useDeferredValue(q);

  useEffect(() => {
    setToday(todayISO());
    const p = new URLSearchParams(window.location.search);
    const q0 = p.get("q");
    if (q0) setQ(q0);
    const n0 = (p.get("niveau") ?? "").split(",").filter(isNiveau);
    if (n0.length) setNiveaux(n0);
    if (p.get("ouvertes") === "1") setHideClosed(true);
    const t = p.get("tri");
    if (t && isSort(t)) setSort(t);
  }, []);

  useEffect(() => {
    if (!urlReady.current) {
      urlReady.current = true;
      return;
    }
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (niveaux.length) p.set("niveau", NIVEAUX.filter((l) => niveaux.includes(l)).join(","));
    if (hideClosed) p.set("ouvertes", "1");
    if (sort !== "date") p.set("tri", sort);
    const qs = p.toString();
    window.history.replaceState(null, "", (qs ? `?${qs}` : window.location.pathname) + window.location.hash);
  }, [q, niveaux, hideClosed, sort]);

  const items = useMemo<Indexed[]>(
    () =>
      bourses.map((b) => ({
        ...b,
        _search: fold([b.nom, b.organisme, b.domaine ?? "", b.niveaux.join(" "), b.eligibilite ?? "", STATUS_LABEL[b.statut] ?? ""].join(" ")),
        _days: b.dateLimite ? daysBetween(today, b.dateLimite) : null,
        _perYear: perYear(b),
      })),
    [bourses, today],
  );

  const tokens = useMemo(() => fold(deferredQ).split(/\s+/).filter(Boolean), [deferredQ]);

  const { list, counts } = useMemo(() => {
    const base = items.filter(
      (it) => tokens.every((t) => it._search.includes(t)) && !(hideClosed && it._days !== null && it._days < 0),
    );
    const nextCounts = {} as Record<Niveau, number>;
    NIVEAUX.forEach((l) => {
      nextCounts[l] = base.filter((it) => it.niveaux.includes(l)).length;
    });
    const filtered = niveaux.length ? base.filter((it) => it.niveaux.some((l) => niveaux.includes(l))) : base;
    return { list: sortItems(filtered, sort), counts: nextCounts };
  }, [items, tokens, hideClosed, niveaux, sort]);

  const isFiltered = Boolean(q.trim() || niveaux.length || hideClosed || sort !== "date");
  const shownQ = deferredQ.trim();
  const activeNiveaux = NIVEAUX.filter((l) => niveaux.includes(l));

  const toggleNiveau = (l: Niveau) =>
    setNiveaux((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));

  const toggleExpanded = (slug: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const resetAll = () => {
    setQ("");
    setNiveaux([]);
    setHideClosed(false);
    setSort("date");
  };

  return (
    <div>
      <form
        className="flex h-[58px] items-center gap-2 rounded-full border border-[#c6d9e7] bg-white py-2 pl-5 pr-2 shadow-[rgba(37,39,37,0.08)_0px_10px_30px_-12px]"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          inputRef.current?.blur();
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#5e7282]" aria-hidden>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.34-4.34" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && q) {
              e.preventDefault();
              setQ("");
            }
          }}
          placeholder="Rechercher une bourse, un organisme..."
          className="min-w-0 flex-1 bg-transparent py-2 text-[15px] leading-none text-[#102B43] outline-none placeholder:text-[#9aabba]"
          aria-label="Rechercher une bourse ou un organisme"
          autoComplete="off"
        />
        {q && (
          <button type="button" className="shrink-0 px-1 text-[13px] text-[#5e7282]" aria-label="Effacer la recherche" onClick={() => { setQ(""); inputRef.current?.focus(); }}>
            Effacer
          </button>
        )}
        <button type="submit" className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-eef-navy px-5 text-[12px] font-medium text-white transition hover:bg-eef-ink">
          Rechercher
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrer par niveau d'études">
        {NIVEAUX.map((level) => {
          const on = niveaux.includes(level);
          return (
            <button
              key={level}
              type="button"
              aria-pressed={on}
              onClick={() => toggleNiveau(level)}
              className={`cursor-pointer rounded-full border px-3.5 py-2 text-[12px] font-semibold whitespace-nowrap transition ${
                on
                  ? "border-[#173b5d] bg-[#173b5d] text-white"
                  : "border-[#c6d9e7] bg-white text-[#5e7282] hover:border-[#63a8d8] hover:text-[#63a8d8]"
              }`}
            >
              {level} <span className={on ? "font-medium text-white/70" : "font-medium text-[#8a96a6]"}>{counts[level]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
        <p className="m-0 text-[14px] text-[#5d6b7e]" aria-live="polite">
          {list.length === 0 ? (
            "Aucune bourse"
          ) : (
            <>
              <strong className="font-semibold text-[#15263d]">{list.length}</strong> {list.length === 1 ? "bourse" : "bourses"}
            </>
          )}
          {shownQ && <> pour « {shownQ} »</>}
          {activeNiveaux.length > 0 && <> en {activeNiveaux.join(" ou ")}</>}
        </p>
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-[#33445c] select-none">
            <input type="checkbox" className="peer sr-only" checked={hideClosed} onChange={(e) => setHideClosed(e.target.checked)} />
            <span className="relative h-[18px] w-8 rounded-full bg-[#cbd5e1] transition peer-checked:bg-[#1f3a5f] after:absolute after:top-0.5 after:left-0.5 after:size-3.5 after:rounded-full after:bg-white after:shadow-[0_1px_2px_rgba(0,0,0,0.2)] after:transition after:content-[''] peer-checked:after:translate-x-3.5" />
            Masquer les bourses clôturées
          </label>
          <label className="inline-flex items-center gap-2 text-[13px] text-[#33445c]">
            Trier par
            <select
              value={sort}
              onChange={(e) => {
                if (isSort(e.target.value)) setSort(e.target.value);
              }}
              className="cursor-pointer appearance-none rounded-full border border-[#d8e0ea] bg-white bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%235d6b7e%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E')] bg-[length:14px] bg-[position:right_10px_center] bg-no-repeat py-[7px] pr-8 pl-3.5 text-[13px] text-[#15263d]"
            >
              <option value="date">Date limite la plus proche</option>
              <option value="montant">Montant le plus élevé</option>
              <option value="nom">Nom (A–Z)</option>
            </select>
          </label>
          {isFiltered && (
            <button type="button" className="cursor-pointer text-[13px] font-semibold text-[#1f3a5f] underline underline-offset-[3px]" onClick={resetAll}>
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {list.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((it) => {
            const open = expanded.has(it.slug);
            const panelId = `bourse-${it.slug}-details`;
            const url = safeUrl(it.source);
            return (
              <article key={it.slug} className="flex flex-col gap-2.5 rounded-2xl border border-[#e6ecf3] bg-white px-[22px] pt-5 pb-4 transition hover:border-[#c6d3e3]">
                <div className="flex flex-wrap items-center gap-1.5">
                  <StatusBadge statut={it.statut} />
                  {it.niveaux.map((level) => (
                    <span
                      key={level}
                      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-[6px] px-2 py-[3px] text-[11.5px] ${
                        niveaux.includes(level) ? "bg-[#e7eef8] font-semibold text-[#1f3a5f]" : "bg-[#f1f5f9] font-medium text-[#5d6b7e]"
                      }`}
                    >
                      {level}
                    </span>
                  ))}
                  {demo && <span className="ml-auto text-[11.5px] text-[#8a96a6] italic">Exemple</span>}
                </div>

                <h3 className="m-0 mt-1 text-[17px] leading-[1.35] font-semibold tracking-[-0.01em] text-[#15263d]">
                  <Link href={`${BOURSES_CONFIG.basePath}/${it.slug}`} className="text-inherit no-underline hover:underline hover:underline-offset-[3px]">
                    <Highlight text={it.nom} tokens={tokens} />
                  </Link>
                </h3>
                <p className="m-0 text-[13.5px] text-[#5d6b7e]">
                  <Highlight text={it.organisme} tokens={tokens} />
                  {it.domaine && (
                    <span className="mt-0.5 block text-[12.5px] text-[#7b8798]">
                      <Highlight text={it.domaine} tokens={tokens} />
                    </span>
                  )}
                </p>

                <dl className="mt-1.5 grid grid-cols-2 gap-3 border-t border-[#e6ecf3] pt-3.5">
                  <div>
                    <dt className="text-[12px] text-[#5d6b7e]">Montant</dt>
                    <dd className="m-0 mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[14.5px] font-semibold text-[#15263d]">
                      <Amount montant={it.montant} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[12px] text-[#5d6b7e]">Date limite</dt>
                    <dd className="m-0 mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[14.5px] font-semibold text-[#15263d]">
                      <Deadline iso={it.dateLimite} days={it._days} />
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 py-1 text-[13px] font-semibold text-[#1f3a5f]"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggleExpanded(it.slug)}
                  >
                    {open ? "Masquer le détail" : "Voir le détail"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={`transition ${open ? "rotate-180" : ""}`}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {it.statut === "VERIFIE" && it.verifieLe && (
                    <span className="text-[12px] text-[#17703f]">Vérifié le {formatDateFR(it.verifieLe)}</span>
                  )}
                </div>

                {open && (
                  <div id={panelId} className="border-t border-[#e6ecf3] pt-3 text-[13.5px] text-[#33445c]">
                    <section>
                      <h4 className="m-0 mb-1 text-[12.5px] font-semibold text-[#15263d]">Éligibilité</h4>
                      {it.eligibilite ? <p className="m-0"><Highlight text={it.eligibilite} tokens={tokens} /></p> : <Missing />}
                    </section>
                    <section className="mt-3">
                      <h4 className="m-0 mb-1 text-[12.5px] font-semibold text-[#15263d]">Pièces demandées</h4>
                      {it.pieces?.length ? (
                        <ul className="m-0 list-disc pl-[18px]">
                          {it.pieces.map((piece) => (
                            <li key={piece}>{piece}</li>
                          ))}
                        </ul>
                      ) : (
                        <Missing />
                      )}
                    </section>
                    <p className="mt-3.5 flex flex-wrap gap-x-[18px] gap-y-2">
                      <Link href={`${BOURSES_CONFIG.basePath}/${it.slug}`} className="font-semibold text-[#1f3a5f] underline-offset-[3px]">
                        Voir la page de la bourse
                      </Link>
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1f3a5f] underline-offset-[3px]">
                          Source officielle ↗
                        </a>
                      ) : (
                        <span>
                          Source officielle : <Missing />
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 flex min-h-[280px] flex-col items-center justify-center rounded-[25px] border border-dashed border-[#2527252e] bg-white/60 px-6 py-10 text-center">
          <h2 className="m-0 text-[27px] font-medium leading-[1.2] tracking-[-0.945px] text-[#102B43]">
            Aucune bourse ne correspond à ces critères
          </h2>
          <p className="m-0 mt-2 max-w-[512px] text-[15px] leading-[1.75] text-[#5e7282]">
            Essayez un autre mot-clé, retirez un niveau d&apos;études ou affichez aussi les bourses clôturées.
          </p>
          <button type="button" className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-[#173B5D] px-4.5 text-[13.5px] font-medium text-white" onClick={resetAll}>
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
