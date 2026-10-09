"use client";

import Link from "next/link";
import {
  MarketingShell,
  btnPrimary,
  wrap,
} from "@/components/marketing/MarketingShell";
import {
  JOURNAL_ARTICLES,
  type JournalArticle,
} from "@/content/journal-articles";

function sectionId(index: number) {
  return `partie-${index + 1}`;
}

export function JournalArticleView({ article }: { article: JournalArticle }) {
  const related = article.related
    .map((slug) => JOURNAL_ARTICLES.find((item) => item.slug === slug))
    .filter((item): item is JournalArticle => Boolean(item));

  return (
    <MarketingShell>
      <article className={`${wrap} pt-8 pb-20 md:pt-10 md:pb-28`}>
        <nav aria-label="Fil d'Ariane" className="mb-8 text-[13px] text-eef-secondary">
          <Link href="/" className="transition hover:text-eef-navy">
            Accueil
          </Link>
          <span aria-hidden> / </span>
          <Link href="/journal" className="transition hover:text-eef-navy">
            Le journal
          </Link>
        </nav>

        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-eef-blue">
          {article.category}
        </p>
        <h1 className="mt-3 m-0 max-w-[18em] text-[clamp(2rem,5vw,52px)] font-medium leading-[1.12] tracking-[-0.03em] text-eef-ink">
          {article.title}
        </h1>
        <p className="mt-5 m-0 max-w-[40rem] text-[17px] leading-[1.6] text-eef-secondary md:text-[18px]">
          {article.metaDescription}
        </p>

        <div className="mt-8 overflow-hidden rounded-[18px] bg-eef-soft md:mt-10 md:rounded-[22px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt=""
            className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
          />
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Sommaire" className="lg:sticky lg:top-28 lg:self-start">
            <p className="m-0 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
              Sommaire
            </p>
            <ol className="mt-4 m-0 list-none space-y-2.5 p-0">
              {article.sections.map((section, index) => (
                <li key={section.heading}>
                  <a
                    href={`#${sectionId(index)}`}
                    className="text-[13px] leading-snug text-eef-secondary transition hover:text-eef-navy"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="text-[13px] leading-snug text-eef-secondary transition hover:text-eef-navy"
                >
                  Questions fréquentes
                </a>
              </li>
            </ol>
          </nav>

          <div className="min-w-0 max-w-[44rem]">
            {article.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 m-0 text-[16px] leading-[1.75] text-[#3d5366] first:mt-0 md:text-[17px]"
              >
                {paragraph}
              </p>
            ))}

            {article.sections.map((section, index) => (
              <section key={section.heading} id={sectionId(index)} className="mt-12 scroll-mt-28">
                <h2 className="m-0 text-[clamp(1.35rem,3vw,28px)] font-medium leading-[1.25] tracking-[-0.02em] text-eef-ink">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 m-0 text-[16px] leading-[1.75] text-[#3d5366] md:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.items.length > 0 && (
                  <ul className="mt-4 m-0 list-none space-y-2.5 p-0">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="border-t border-eef-border py-2.5 text-[15px] leading-[1.55] text-eef-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section id="faq" className="mt-14 scroll-mt-28">
              <h2 className="m-0 text-[clamp(1.35rem,3vw,28px)] font-medium leading-[1.25] tracking-[-0.02em] text-eef-ink">
                Questions fréquentes
              </h2>
              <div className="mt-6 border-t border-eef-border">
                {article.faq.map((item) => (
                  <div key={item.q} className="border-b border-eef-border py-5">
                    <h3 className="m-0 text-[17px] font-medium leading-[1.4] text-eef-ink">
                      {item.q}
                    </h3>
                    <p className="mt-2 m-0 text-[15px] leading-[1.65] text-eef-secondary">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-12 rounded-[22px] bg-[#e8f2fa] px-6 py-7 md:px-8 md:py-8">
              <p className="m-0 max-w-[36rem] text-[16px] leading-[1.6] text-eef-ink">
                {article.cta}
              </p>
              <Link href="/login" className={`${btnPrimary} mt-5`}>
                Parler à un conseiller
              </Link>
            </div>

            <p className="mt-8 m-0 text-[13px] leading-[1.6] text-[#8aa4b8]">
              Les procédures, calendriers et conditions peuvent évoluer. Vérifiez les
              sources officielles qui correspondent à votre situation. Procédure EEF
              est un service indépendant et n&apos;est pas affilié à Campus France ou
              au gouvernement français.
            </p>

            {related.length > 0 && (
              <section className="mt-14">
                <h2 className="m-0 text-[clamp(1.35rem,3vw,28px)] font-medium leading-[1.25] tracking-[-0.02em] text-eef-ink">
                  À lire ensuite
                </h2>
                <ul className="mt-5 m-0 list-none border-t border-eef-border p-0">
                  {related.map((item) => (
                    <li key={item.slug} className="border-b border-eef-border">
                      <Link
                        href={`/journal/${item.slug}`}
                        className="group block py-4"
                      >
                        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-eef-blue">
                          {item.category}
                        </p>
                        <p className="mt-1.5 m-0 text-[17px] font-medium leading-snug text-eef-ink transition group-hover:text-eef-navy">
                          {item.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>
    </MarketingShell>
  );
}
