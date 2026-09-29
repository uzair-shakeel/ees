"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  MarketingShell,
  ASSETS,
  wrap,
  btnPrimary,
  marketingHeroH1,
} from "@/components/marketing/MarketingShell";

const PRINCIPLES = [
  "Comprendre avant de recommander.",
  "Expliquer avant de décider.",
  "Accompagner sans décider à votre place.",
  "Rester présent après l'admission.",
] as const;

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex cursor-pointer items-center gap-2 text-[13px] font-medium text-eef-ink transition hover:text-eef-navy md:text-[14px] [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
    >
      {children} <IconArrowRight />
    </Link>
  );
}

export function MarketingMethod() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className={`${wrap} pt-10 pb-16 max-md:pb-12`}>
        <nav className="mb-6 text-[12px] text-eef-secondary md:mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="cursor-pointer transition hover:text-eef-navy">
            Accueil
          </Link>
          <span className="mx-1.5 text-eef-border">/</span>
          <span className="text-eef-ink">Notre méthode</span>
        </nav>

        <p className="m-0 mb-[10px] text-[9px] font-medium uppercase tracking-[0.16em] text-eef-blue">
          Notre méthode
        </p>

        <div className="grid min-w-0 items-start gap-5 md:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-24">
          <h1 className={`m-0 max-w-none lg:max-w-[10em] ${marketingHeroH1}`}>
            Une méthode humaine pour un projet personnel.
          </h1>
          <div className="min-w-0 lg:justify-self-end lg:pt-2">
            <p className="m-0 max-w-[28rem] text-[15px] leading-[1.65] text-eef-secondary md:text-[16px]">
              Choisir ses études à l&apos;étranger demande plus qu&apos;une liste
              d&apos;établissements et une checklist administrative.
            </p>
            <a
              href="mailto:hello@eef.fr"
              className={`${btnPrimary} mt-6 min-h-[52px] w-full px-6 text-[14px] sm:mt-7 sm:w-auto`}
            >
              Parler à un conseiller
            </a>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[22px] bg-eef-soft md:mt-12 md:rounded-[28px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.conversation}
            alt="Étudiants accompagnés dans leur projet"
            className="aspect-[4/3] min-h-[180px] w-full object-cover sm:aspect-[16/10] sm:min-h-[200px] md:aspect-[21/9] md:min-h-[240px]"
          />
          <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center rounded-[10px] bg-white/95 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-eef-navy shadow-[0_2px_12px_rgba(16,43,67,0.08)] backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-3.5 sm:text-[9px] md:bottom-5 md:left-5 md:px-4 md:py-2 md:tracking-[0.14em]">
            Comprendre. Choisir. S&apos;avancer.
          </span>
        </div>
      </section>

      {/* Conviction */}
      <section className={`${wrap} mt-12 grid min-w-0 items-start gap-6 pb-14 md:mt-[60px] md:gap-8 md:pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-24`}>
        <div className="min-w-0">
          <p className="m-0 mb-[10px] text-[9px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8] md:text-[11px]">
            Notre conviction
          </p>
          <h2 className="m-0 max-w-[12em] text-[36px] font-medium leading-[1.15] tracking-[-0.03em] text-eef-ink md:text-[clamp(2.5rem,6vw,57px)]">
            Comprendre. Puis choisir.
          </h2>
        </div>
        <div className="min-w-0">
          <p className="m-0 max-w-[28rem] text-[19px] leading-[1.65] text-eef-secondary md:text-[18px] lg:text-[21px]">
            Un projet d&apos;études réussi commence par comprendre les options, comparer
            les parcours et construire une stratégie — avant de candidater.
          </p>
          <p className="mt-4 m-0 max-w-[28rem] text-[11px] leading-[1.65] text-eef-secondary md:text-[14px]">
            Nous ne partons jamais d&apos;une liste d&apos;universités. Nous partons de
            vous : votre profil, vos contraintes, votre ambition.
          </p>
          <TextLink href="/#orientation">Tout commence par l&apos;orientation</TextLink>
        </div>
      </section>

      {/* Principles */}
      <section className={`${wrap} pb-14 pt-2 md:pb-16 md:pt-4`}>
        <p className="m-0 mb-8 text-[9px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8] md:mb-10 md:text-[11px]">
          Ce qui guide notre méthode
        </p>
        <div className="border-t border-eef-border">
          {PRINCIPLES.map((title, i) => (
            <div
              key={title}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-3 border-b border-eef-border py-5 md:grid-cols-[4.5rem_1fr] md:gap-8 md:py-8"
            >
              <span className="text-[11px] font-medium tabular-nums text-eef-blue md:text-[11px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 min-w-0 text-[32px] font-medium leading-[1.25] tracking-[-0.02em] text-eef-ink md:text-[clamp(1.5rem,4.5vw,2.5rem)]">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Humans */}
      <section className={`${wrap} mt-8 grid min-w-0 items-start gap-6 pb-14 md:mt-[40px] md:gap-8 md:pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-24`}>
        <div>
          <p className="m-0 mb-[10px] text-[11px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
            Humains, avant tout
          </p>
          <h2 className="m-0 max-w-[12em] text-[clamp(1.85rem,3.5vw,64px)] font-medium leading-[1.15] tracking-[-0.03em] text-eef-ink">
            Des outils pour organiser. Des humains pour conseiller.
          </h2>
        </div>
        <div>
          <p className="m-0 max-w-[28rem] text-[15px] leading-[1.65] text-eef-secondary">
            L&apos;espace étudiant centralise votre progression, vos documents et vos
            échéances. Les décisions importantes se prennent avec un conseiller —
            jamais seulement avec un outil.
          </p>
          <TextLink href="/faq">Les réponses à vos questions</TextLink>
        </div>
      </section>

      {/* Disclaimer */}
      <section className={`${wrap} pb-12`}>
        <div className="grid gap-8 rounded-[22px] bg-[#eef4f9] px-7 py-8 text-[13px] leading-[1.6] text-eef-secondary max-md:px-5 max-md:py-6 md:grid-cols-2 md:gap-12 md:px-10 md:py-10">
          <p className="m-0">
            Procédure EEF est un service indépendant. Nous ne sommes pas affiliés à
            Campus France ni au gouvernement français.
          </p>
          <p className="m-0">
            Les procédures, calendriers et exigences peuvent varier selon votre pays
            de résidence, votre nationalité et le type de formation visé.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={`${wrap} pb-24 pt-4 max-md:pb-16`}>
        <div className="relative grid min-h-[280px] overflow-hidden rounded-[22px] bg-eef-navy px-6 py-9 text-white sm:px-8 sm:py-10 md:min-h-[300px] md:grid-cols-[1.2fr_0.8fr] md:items-center md:rounded-[28px] md:px-[60px] md:py-[56px]">
          <div className="relative z-10 max-w-[560px]">
            <h2 className="m-0 max-w-[18em] text-[clamp(1.5rem,5vw,40px)] font-medium leading-[1.2] tracking-[-0.02em]">
              Votre projet mérite plus qu&apos;une liste d&apos;universités.
            </h2>
            <p className="mt-3 m-0 text-[14px] leading-[1.6] text-white/70 md:mt-4 md:text-[15px]">
              Commençons par comprendre où vous voulez aller.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:hello@eef.fr"
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white px-[22px] text-[13px] font-medium text-eef-navy transition hover:bg-eef-mist max-md:w-full"
              >
                Parler à un conseiller <IconArrowRight />
              </a>
              <Link
                href="/"
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/50 px-[22px] text-[13px] font-medium text-white transition hover:bg-white/10 max-md:w-full"
              >
                Découvrir Procédure EEF <IconArrowRight />
              </Link>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -right-20 top-1/2 flex size-[360px] -translate-y-1/2 items-center justify-center sm:-right-8 md:size-[480px]"
            aria-hidden
          >
            <div className="absolute size-full rounded-full border border-white/10" />
            <div className="absolute size-[78%] rounded-full border border-white/10" />
            <div className="absolute size-[49%] rounded-full border border-white/10" />
            <div className="relative flex size-[100px] items-center justify-center rounded-full border border-white/15 bg-white/[0.07]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.logoMark}
                alt=""
                className="absolute left-1/2 top-1/2 w-[80px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-90 brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
