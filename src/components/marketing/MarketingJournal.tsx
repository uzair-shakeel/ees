"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MarketingShell,
  wrap,
  marketingHeroH1,
} from "@/components/marketing/MarketingShell";
import { JOURNAL_ARTICLES } from "@/content/journal-articles";

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
  slug: string;
  category: Exclude<Category, "Tout">;
  title: string;
  desc: string;
  image: string;
  featured?: "main" | "side";
  badge?: string;
};

const ARTICLES: Article[] = JOURNAL_ARTICLES.map((article) => ({
  id: article.id,
  slug: article.slug,
  category: article.category,
  title: article.title,
  desc: article.metaDescription,
  image: article.image,
  featured: article.featured,
  badge: article.badge,
}));

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

  const sideArticles =
    sides.length > 0
      ? sides
      : filtered.filter((a) => a.id !== main?.id).slice(0, 2);

  return (
    <MarketingShell>
      {/* Hero */}
      <section className={`${wrap} pt-10 pb-10 max-md:pb-8`}>
        <p className="m-0 mb-[10px] text-[9px] font-medium tracking-[0.16em] text-[#8aa4b8]">
          Des repères pour chaque étape
        </p>
        <h1 className={`m-0 ${marketingHeroH1}`}>
          Le journal<span className="text-eef-blue">.</span>
        </h1>
        <p className="mt-3 m-0 max-w-[36rem] text-[15px] leading-[1.65] text-eef-secondary md:mt-4 md:text-[16px]">
          Comprendre avant de décider. Les bonnes questions, au bon moment.
        </p>

        <label className="relative mt-8 block md:mt-10">
          <span className="sr-only">Rechercher dans le journal</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Que souhaitez-vous comprendre ?"
            className="w-full rounded-2xl border border-eef-border bg-[#eef4f9] py-3.5 pl-4 pr-12 text-[15px] text-eef-ink outline-none transition placeholder:text-eef-secondary/70 focus:border-eef-blue focus:bg-white md:py-4 md:pl-5 md:pr-14"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-eef-secondary md:right-5">
            <IconSearch />
          </span>
        </label>

        <div
          className="mt-6 flex gap-x-5 overflow-x-auto border-b border-eef-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:gap-y-2 md:overflow-visible"
          role="tablist"
          aria-label="Catégories"
        >
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(cat)}
                className={`shrink-0 cursor-pointer border-b-2 pb-3 text-[13px] font-medium whitespace-nowrap transition ${ active ? "border-eef-blue text-eef-navy" : "border-transparent text-eef-secondary hover:text-eef-navy" }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {main ? (
        <section className={`${wrap} pb-14 pt-6 max-md:pb-12`}>
          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.9fr)] lg:gap-12">
            <article className="min-w-0">
              <Link href={`/journal/${main.slug}`} className="group block cursor-pointer">
                <div className="overflow-hidden rounded-[18px] bg-eef-soft md:rounded-[22px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={main.image}
                    alt=""
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02] md:aspect-[16/9]"
                  />
                </div>
                <p className="mt-4 m-0 text-[11px] font-semibold tracking-[0.14em] text-eef-blue md:mt-5">
                  {main.badge ?? main.category}
                </p>
                <h2 className="mt-2.5 m-0 max-w-[22em] text-[clamp(1.25rem,4.5vw,27px)] font-semibold leading-[1.25] tracking-[-0.02em] text-eef-ink md:mt-3">
                  {main.title}
                </h2>
                <p className="mt-2.5 m-0 max-w-[34rem] text-[14px] leading-[1.55] text-eef-secondary md:mt-3 md:text-[15px]">
                  {main.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-eef-ink transition group-hover:text-eef-navy md:mt-5 [&_svg]:transition-transform group-hover:[&_svg]:translate-x-0.5 group-hover:[&_svg]:-translate-y-0.5">
                  Lire le guide <IconArrowUpRight />
                </span>
              </Link>
            </article>

            {/* Always stacked under the hero on small/mid screens; vertical cards from sm up, compact row on phones */}
            <div className="grid min-w-0 grid-cols-1 gap-6 sm:gap-8">
              {sideArticles.map((article) => (
                <article key={article.id} className="min-w-0">
                  <Link
                    href={`/journal/${article.slug}`}
                    className="group grid cursor-pointer grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-4 sm:grid-cols-1 sm:gap-0"
                  >
                    <div className="overflow-hidden rounded-[14px] bg-eef-soft sm:rounded-[18px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.image}
                        alt=""
                        className="aspect-square size-full object-cover transition duration-500 group-hover:scale-[1.02] sm:aspect-[16/10]"
                      />
                    </div>
                    <div className="min-w-0 sm:mt-4">
                      <p className="m-0 text-[11px] font-semibold tracking-[0.14em] text-eef-blue">
                        {article.category}
                      </p>
                      <h3 className="mt-1.5 m-0 text-[16px] font-semibold leading-[1.3] tracking-[-0.02em] text-eef-ink sm:mt-2 sm:text-[17px] md:text-[18px]">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                </article>
              ))}
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
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 md:mb-8 md:gap-4">
            <h2 className="m-0 text-[clamp(1.6rem,5vw,46px)] font-medium leading-[1.15] tracking-[-0.03em] text-eef-ink">
              Pour aller plus loin.
            </h2>
            <p className="m-0 text-[11px] font-medium tracking-[0.16em] text-[#8aa4b8]">
              Les guides EEF
            </p>
          </div>

          <div className="border-t border-eef-border">
            {list.map((article) => (
              <Link
                key={article.id}
                href={`/journal/${article.slug}`}
                className="group grid cursor-pointer grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 border-b border-eef-border py-5 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-5 sm:py-6 md:gap-7"
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
                  <p className="m-0 text-[10px] font-semibold tracking-[0.14em] text-eef-blue sm:text-[11px]">
                    {article.category}
                  </p>
                  <h3 className="mt-1 m-0 text-[15px] font-semibold leading-[1.35] tracking-[-0.02em] text-eef-ink sm:mt-1.5 sm:text-[17px] md:text-[18px]">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 m-0 hidden text-[14px] leading-[1.5] text-eef-secondary sm:block">
                    {article.desc}
                  </p>
                </div>
                <span className="hidden text-eef-navy transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:inline-flex">
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
