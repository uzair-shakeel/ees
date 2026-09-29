"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MarketingShell,
  ASSETS,
  wrap,
} from "@/components/marketing/MarketingShell";

const CATEGORIES = [
  "Tout",
  "Orientation",
  "Formations",
  "Universités",
  "Dossier",
  "Études en France",
  "Logement",
  "Vie en France",
] as const;

type Category = (typeof CATEGORIES)[number];

type Article = {
  id: string;
  category: Exclude<Category, "Tout">;
  title: string;
  desc: string;
  image: string;
  featured?: "main" | "side";
  badge?: string;
};

const ARTICLES: Article[] = [
  {
    id: "domaines",
    category: "Orientation",
    badge: "Orientation · À la une",
    title: "Comment choisir sa formation quand plusieurs domaines vous intéressent ?",
    desc: "Clarifier vos centres d'intérêt, comparer des parcours proches et construire un choix cohérent — sans vous disperser.",
    image: ASSETS.library,
    featured: "main",
  },
  {
    id: "publique-privee",
    category: "Formations",
    title: "Université publique ou école privée : quelles différences regarder ?",
    desc: "Programme, sélectivité, frais et débouchés : ce qu'il faut comparer avant de choisir.",
    image: ASSETS.campus,
    featured: "side",
  },
  {
    id: "shortlist",
    category: "Universités",
    title: "Construire une shortlist d'universités : la méthode",
    desc: "Une sélection équilibrée, ambitieuse et réaliste, fondée sur votre profil.",
    image: ASSETS.campus,
    featured: "side",
  },
  {
    id: "projet",
    category: "Dossier",
    title: "Comment structurer un projet d'études cohérent ?",
    desc: "Relier parcours, formation et ambition dans un récit clair pour les jurys.",
    image: ASSETS.student,
  },
  {
    id: "erreurs",
    category: "Dossier",
    title: "Les erreurs qui rendent une candidature difficile à comprendre",
    desc: "Les formulations floues, les incohérences et les pièces mal préparées à éviter.",
    image: ASSETS.conversation,
  },
  {
    id: "checklist",
    category: "Vie en France",
    title: "Préparer son départ en France : la checklist",
    desc: "Les étapes concrètes avant l'arrivée : documents, budget, premiers jours.",
    image: ASSETS.city,
  },
  {
    id: "logement",
    category: "Logement",
    title: "Trouver un logement étudiant : quels documents préparer ?",
    desc: "Dossier locatif, garanties et pièces utiles pour candidater plus vite.",
    image: ASSETS.city,
  },
  {
    id: "eef-procedure",
    category: "Études en France",
    title: "Comprendre la procédure Études en France",
    desc: "Calendrier, étapes et pièces : les repères essentiels pour avancer sereinement.",
    image: ASSETS.library,
  },
];

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function IconArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function MarketingJournal() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Tout");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const catOk = category === "Tout" || a.category === category;
      const qOk =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, category]);

  const main = filtered.find((a) => a.featured === "main") ?? filtered[0];
  const sides = filtered.filter((a) => a.featured === "side" && a.id !== main?.id).slice(0, 2);
  const list = filtered.filter(
    (a) => a.id !== main?.id && !sides.some((s) => s.id === a.id),
  );

  return (
    <MarketingShell>
      {/* Hero */}
      <section className={`${wrap} pt-10 pb-10 max-md:pb-8`}>
        <p className="m-0 mb-[10px] text-[9px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
          Des repères pour chaque étape
        </p>
        <h1 className="m-0 text-[clamp(2.75rem,8vw,78px)] font-medium leading-[1.02] tracking-[-0.03em] text-eef-ink">
          Le journal<span className="text-eef-blue">.</span>
        </h1>
        <p className="mt-4 m-0 max-w-[36rem] text-[16px] leading-[1.65] text-eef-secondary">
          Comprendre avant de décider. Les bonnes questions, au bon moment.
        </p>

        <label className="relative mt-10 block max-md:mt-8">
          <span className="sr-only">Rechercher dans le journal</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Que souhaitez-vous comprendre ?"
            className="w-full rounded-2xl border border-eef-border bg-[#eef4f9] py-4 pl-5 pr-14 text-[15px] text-eef-ink outline-none transition placeholder:text-eef-secondary/70 focus:border-eef-blue focus:bg-white"
          />
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-eef-secondary">
            <IconSearch />
          </span>
        </label>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-b border-eef-border">
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`cursor-pointer border-b-2 pb-3 text-[13px] font-medium transition ${
                  active
                    ? "border-eef-blue text-eef-navy"
                    : "border-transparent text-eef-secondary hover:text-eef-navy"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {main ? (
        <section className={`${wrap} pb-16 pt-6`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.9fr)] lg:gap-12">
            <article className="min-w-0">
              <Link href="#guides" className="group block cursor-pointer">
                <div className="overflow-hidden rounded-[22px] bg-eef-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={main.image}
                    alt=""
                    className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-5 m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-eef-blue">
                  {main.badge ?? main.category}
                </p>
                <h2 className="mt-3 m-0 max-w-[22em] text-[clamp(1.35rem,2.5vw,27px)] font-semibold leading-[1.25] tracking-[-0.02em] text-eef-ink">
                  {main.title}
                </h2>
                <p className="mt-3 m-0 max-w-[34rem] text-[15px] leading-[1.55] text-eef-secondary">
                  {main.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-eef-ink transition group-hover:text-eef-navy [&_svg]:transition-transform group-hover:[&_svg]:translate-x-0.5 group-hover:[&_svg]:-translate-y-0.5">
                  Lire le guide <IconArrowUpRight />
                </span>
              </Link>
            </article>

            <div className="flex flex-col gap-8">
              {(sides.length ? sides : filtered.filter((a) => a.id !== main.id).slice(0, 2)).map(
                (article) => (
                  <article key={article.id}>
                    <Link href="#guides" className="group block cursor-pointer">
                      <div className="overflow-hidden rounded-[18px] bg-eef-soft">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.image}
                          alt=""
                          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                      <p className="mt-4 m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-eef-blue">
                        {article.category}
                      </p>
                      <h3 className="mt-2 m-0 text-[17px] font-semibold leading-[1.3] tracking-[-0.02em] text-eef-ink md:text-[18px]">
                        {article.title}
                      </h3>
                    </Link>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className={`${wrap} py-16`}>
          <p className="m-0 text-[15px] text-eef-secondary">
            Aucun guide ne correspond à votre recherche.
          </p>
        </section>
      )}

      {/* List */}
      {list.length > 0 && (
        <section id="guides" className={`${wrap} pb-24 max-md:pb-16`}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="m-0 text-[clamp(1.85rem,3.5vw,46px)] font-medium leading-[1.15] tracking-[-0.03em] text-eef-ink">
              Pour aller plus loin.
            </h2>
            <p className="m-0 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
              Les guides EEF
            </p>
          </div>

          <div className="border-t border-eef-border">
            {list.map((article) => (
              <Link
                key={article.id}
                href="#guides"
                className="group grid cursor-pointer grid-cols-[5.5rem_1fr_auto] items-center gap-5 border-b border-eef-border py-6 max-md:grid-cols-[4.25rem_1fr] max-md:gap-4 md:gap-7"
              >
                <div className="overflow-hidden rounded-[12px] bg-eef-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt=""
                    className="aspect-square size-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-eef-blue">
                    {article.category}
                  </p>
                  <h3 className="mt-1.5 m-0 text-[17px] font-semibold leading-[1.3] tracking-[-0.02em] text-eef-ink md:text-[18px]">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 m-0 hidden text-[14px] leading-[1.5] text-eef-secondary sm:block">
                    {article.desc}
                  </p>
                </div>
                <span className="text-eef-navy transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-md:hidden">
                  <IconArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </MarketingShell>
  );
}
