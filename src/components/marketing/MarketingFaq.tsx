"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MarketingShell,
  ASSETS,
  wrap,
} from "@/components/marketing/MarketingShell";

const FAQS = [
  {
    q: "Est-ce que Procédure EEF peut m'aider si je ne sais pas quoi étudier ?",
    a: "Oui. L'orientation fait partie du début de l'accompagnement. Nous travaillons d'abord sur votre profil avant de parler d'établissements.",
  },
  {
    q: "Est-ce que vous choisissez l'université à ma place ?",
    a: "Non. Nous construisons avec vous une sélection cohérente — réaliste, ambitieuse et de sécurité — mais la décision finale vous appartient toujours.",
  },
  {
    q: "Pouvez-vous garantir une admission ?",
    a: "Non. Aucun accompagnement sérieux ne peut garantir une admission. Nous maximisons la qualité et la cohérence de votre dossier, pas une promesse impossible.",
  },
  {
    q: "Pouvez-vous m'aider avec ma lettre de motivation ?",
    a: "Oui. Nous structurons votre projet, clarifions vos arguments et affinons le texte pour qu'il soit compréhensible par un jury français.",
  },
  {
    q: "Est-ce que vous accompagnez la procédure Études en France ?",
    a: "Oui. Nous vous guidons sur les étapes, les pièces et le calendrier de la procédure Études en France, en lien avec votre stratégie de candidature.",
  },
  {
    q: "Est-ce que Procédure EEF est Campus France ?",
    a: "Non. Procédure EEF est un service indépendant. Nous ne sommes pas affiliés à Campus France ni au gouvernement français.",
  },
  {
    q: "Est-ce que l'accompagnement s'arrête après l'admission ?",
    a: "Non. Après l'admission, nous restons présents pour le visa, l'installation, le logement et les premières semaines en France.",
  },
  {
    q: "À quoi sert l'espace étudiant ?",
    a: "C'est votre espace Mon Dossier : suivi des étapes, documents, échéances et échanges avec votre conseiller — au même endroit.",
  },
] as const;

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function MarketingFaq() {
  const [open, setOpen] = useState(0);

  return (
    <MarketingShell>
      {/* Hero */}
      <section className={`${wrap} pt-10 pb-16 max-md:pb-12`}>
        <p className="m-0 mb-[10px] text-[9px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
          Les réponses, simplement.
        </p>

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16 lg:gap-24">
          <h1 className="m-0 max-w-[9em] text-[88px] font-medium leading-[1.05] tracking-[-0.03em] text-eef-ink">
            Vos questions. Nos réponses.
          </h1>
          <div className="md:justify-self-end md:pt-2">
            <p className="m-0 max-w-[26rem] text-[16px] leading-[1.65] text-eef-secondary">
              Comprendre l&apos;accompagnement avant de commencer. Et pouvoir en parler,
              tout simplement.
            </p>
            <a
              href="mailto:hello@eef.fr"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 text-[13px] font-medium text-eef-ink transition hover:text-eef-navy [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
            >
              Poser ma question <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className={`${wrap} mt-[60px] grid gap-10 pb-16 md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] md:gap-14 lg:gap-20`}>
        <p className="m-0 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
          L&apos;accompagnement EEF
        </p>

        <div className="border-t border-eef-border">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;

            return (
              <div key={item.q} className="border-b border-eef-border">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[18px] font-[500] leading-[1.4] tracking-[-0.01em] text-eef-ink md:text-[17px]">
                    {item.q}
                  </span>
                  <span className="mt-1 text-eef-navy">
                    <IconChevron open={isOpen} />
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="m-0 max-w-[40rem] pb-6 text-[14px] leading-[1.6] text-eef-secondary">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className={`${wrap} pb-24 pt-8 max-md:pb-16`}>
        <div className="relative grid min-h-[300px] overflow-hidden rounded-[28px] bg-eef-navy px-8 py-10 text-white max-md:rounded-[22px] md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-[60px] md:py-[56px]">
          <div className="relative z-10 max-w-[560px]">
            <h2 className="m-0 max-w-[18em] text-[40px] font-medium leading-[1.2] tracking-[-0.02em] md:text-[40px]">
              Votre question mérite une vraie conversation.
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
