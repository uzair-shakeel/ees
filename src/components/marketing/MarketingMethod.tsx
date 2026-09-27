"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  MarketingShell,
  ASSETS,
  wrap,
  btnPrimary,
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
      className="mt-6 inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium text-eef-ink transition hover:text-eef-navy [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
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
        <nav className="mb-8 text-[12px] text-eef-secondary" aria-label="Fil d'Ariane">
          <Link href="/" className="cursor-pointer transition hover:text-eef-navy">
            Accueil
          </Link>
          <span className="mx-1.5 text-eef-border">/</span>
          <span className="text-eef-ink">Notre méthode</span>
        </nav>

        <p className="m-0 mb-[10px] text-[9px] font-medium uppercase tracking-[0.16em] text-eef-blue">
          Notre méthode
        </p>

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16 lg:gap-24">
          <h1 className="m-0 max-w-[10em] text-[clamp(2.5rem,7vw,78px)] font-medium leading-[1.05] tracking-[-0.03em] text-eef-ink">
            Une méthode humaine pour un projet personnel.
          </h1>
          <div className="md:justify-self-end md:pt-2">
            <p className="m-0 max-w-[28rem] text-[16px] leading-[1.65] text-eef-secondary">
              Choisir ses études à l&apos;étranger demande plus qu&apos;une liste
              d&apos;établissements et une checklist administrative.
            </p>
            <a
              href="mailto:hello@eef.fr"
              className={`${btnPrimary} mt-7 min-h-[48px] px-6 text-[14px]`}
            >
              Parler à un conseiller
            </a>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[28px] bg-eef-soft max-md:mt-8 max-md:rounded-[22px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.conversation}
            alt="Étudiants accompagnés dans leur projet"
            className="aspect-[21/9] min-h-[240px] w-full object-cover max-md:aspect-[16/10] max-md:min-h-[200px]"
          />
          <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[10px] bg-white/95 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-eef-navy shadow-[0_2px_12px_rgba(16,43,67,0.08)] backdrop-blur-sm max-md:bottom-3 max-md:left-3 max-md:px-3">
            Comprendre. Choisir. S&apos;avancer.
          </span>
        </div>
      </section>

      {/* Conviction */}
      <section className={`${wrap} mt-[60px] grid items-start gap-8 pb-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 lg:gap-24`}>
        <div>
          <p className="m-0 mb-[10px] text-[11px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
            Notre conviction
          </p>
          <h2 className="m-0 max-w-[10em] text-[57px] font-[500] leading-[1.15] tracking-[-0.03em] text-eef-ink">
            Comprendre. Puis choisir.
          </h2>
        </div>
        <div>
          <p className="m-0 max-w-[28rem] text-[21px] leading-[1.65] text-eef-secondary">
            Un projet d&apos;études réussi commence par comprendre les options, comparer
            les parcours et construire une stratégie — avant de candidater.
          </p>
          <p className="mt-4 m-0 max-w-[28rem] text-[11px] leading-[1.65] text-eef-secondary">
            Nous ne partons jamais d&apos;une liste d&apos;universités. Nous partons de
            vous : votre profil, vos contraintes, votre ambition.
          </p>
          <TextLink href="/#orientation">Tout commence par l&apos;orientation</TextLink>
        </div>
      </section>

      {/* Principles */}
      <section className={`${wrap} pb-16 pt-4`}>
        <p className="m-0 mb-10 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
          Ce qui guide notre méthode
        </p>
        <div className="border-t border-eef-border">
          {PRINCIPLES.map((title, i) => (
            <div
              key={title}
              className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-b border-eef-border py-7 md:grid-cols-[4.5rem_1fr] md:gap-8 md:py-8"
            >
              <span className="text-[11px] font-medium tabular-nums text-eef-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 text-[clamp(1.25rem,2.5vw,57px)] font-[500] leading-[1.25] tracking-[-0.02em] text-eef-ink">
                {title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Humans */}
      <section className={`${wrap} mt-[40px] grid items-start gap-8 pb-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 lg:gap-24`}>
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
        <div className="relative grid min-h-[300px] overflow-hidden rounded-[28px] bg-eef-navy px-8 py-10 text-white max-md:rounded-[22px] md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-[60px] md:py-[56px]">
          <div className="relative z-10 max-w-[560px]">
            <h2 className="m-0 max-w-[18em] text-[40px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[40px]">
              Votre projet mérite plus qu&apos;une liste d&apos;universités.
            </h2>
            <p className="mt-4 m-0 text-[15px] leading-[1.6] text-white/70">
              Commençons par comprendre où vous voulez aller.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5 max-md:flex-col max-md:items-stretch">
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
