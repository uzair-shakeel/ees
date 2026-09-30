"use client";

import Link from "next/link";
import {
  MarketingShell,
  ASSETS,
  wrap,
  btnPrimary,
  marketingHeroH1,
} from "@/components/marketing/MarketingShell";

const FEATURES = [
  {
    title: "Les échéances clés",
    desc: "Candidatures, bourses, visa, rentrée : comprendre le calendrier pour soutenir sans stresser.",
    icon: "calendar",
  },
  {
    title: "Planification financière",
    desc: "Coût total réaliste (frais, logement, vie courante), justificatifs de ressources et prise en charge.",
    icon: "piggy",
  },
  {
    title: "Checklist d'arrivée",
    desc: "Ce que votre enfant doit régler dans ses 30 premiers jours — et comment vous pouvez aider à distance.",
    icon: "plane",
  },
  {
    title: "Venir en visite",
    desc: "Repères pratiques pour préparer une visite pendant les études.",
    icon: "heart",
  },
] as const;

function FeatureIcon({ type }: { type: (typeof FEATURES)[number]["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
  } as const;

  if (type === "calendar") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
      </svg>
    );
  }
  if (type === "piggy") {
    return (
      <svg {...common}>
        <path d="M19 10c0-1.5-1.5-3-4-3h-1.5C12 5 10.5 4 9 4c-1.2 0-2.2.6-2.8 1.5" />
        <path d="M5 11c0 4 3 7 7 7h2c3 0 5-2 5-4.5 0-1-.3-1.8-.8-2.5" />
        <path d="M8 18v2" />
        <path d="M14 18v2" />
        <circle cx="15.5" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (type === "plane") {
    return (
      <svg {...common}>
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22 11 13 2 9Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M19.5 12.5c1.8-1.9 1.8-4.8 0-6.6a4.4 4.4 0 0 0-6.3 0L12 7.1l-1.2-1.2a4.4 4.4 0 0 0-6.3 0c-1.8 1.8-1.8 4.7 0 6.6L12 20.5Z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function MarketingParents() {
  return (
    <MarketingShell>
      <section className={`${wrap} pt-10 pb-16 max-md:pb-12`}>
        <nav className="mb-6 text-[12px] text-eef-secondary md:mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="cursor-pointer transition hover:text-eef-navy">
            Accueil
          </Link>
          <span className="mx-1.5 text-eef-border">/</span>
          <span className="text-eef-ink">Parents</span>
        </nav>

        <p className="m-0 mb-[10px] text-[9px] font-medium uppercase tracking-[0.16em] text-eef-blue">
          PARENTS
        </p>

        <div className="grid min-w-0 items-start gap-5 md:gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-24">
          <h1 className={`m-0 max-w-none ${marketingHeroH1} md:max-w-[11em] lg:max-w-[9em]`}>
            Accompagner sans envahir.
          </h1>
          <p className="m-0 max-w-[28rem] text-[15px] leading-[1.65] text-eef-secondary md:text-[16px] lg:justify-self-end lg:pt-2">
            Un espace d&apos;information pour comprendre le parcours de votre enfant :
            étapes, échéances, budget et arrivée en France.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[22px] bg-eef-soft md:mt-12 md:rounded-[28px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.conversation}
            alt="Étudiants collaborant ensemble"
            className="aspect-[4/3] min-h-[180px] w-full object-cover sm:aspect-[16/10] sm:min-h-[200px] md:aspect-[21/9] md:min-h-[240px]"
          />
          <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center rounded-full bg-white/95 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-eef-navy shadow-[0_2px_12px_rgba(16,43,67,0.08)] backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-3.5 sm:text-[9px] sm:tracking-[0.12em] md:bottom-5 md:left-5 md:px-4 md:py-2 md:text-[10px] md:tracking-[0.14em]">
            Comprendre · Choisir · Avancer
          </span>
        </div>
      </section>

      <section className={`${wrap} pb-10 pt-2 md:pt-4`}>
        <div className="grid min-w-0 gap-x-10 gap-y-10 md:grid-cols-2 md:gap-x-14 md:gap-y-14 lg:gap-x-20 lg:gap-y-16">
          {FEATURES.map((item) => (
            <article key={item.title} className="flex min-w-0 flex-col items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#c6d9e7] bg-[#e8f2fa] text-eef-blue md:h-[48px] md:w-[48px]">
                <FeatureIcon type={item.icon} />
              </div>
              <h2 className="m-0 mt-4 text-[clamp(1.35rem,5vw,27px)] font-semibold leading-[1.2] tracking-[-0.02em] text-eef-ink md:mt-5">
                {item.title}
              </h2>
              <p className="mt-2 m-0 max-w-[26rem] text-[14px] leading-[1.55] text-eef-secondary md:mt-2.5 md:text-[15px]">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${wrap} pb-20 pt-8 max-md:pb-14 md:pb-24 md:pt-10`}>
        <div className="flex items-start gap-3 text-[14px] leading-[1.6] text-eef-secondary">
          <span className="mt-0.5 shrink-0 text-eef-blue">
            <IconLock />
          </span>
          <p className="m-0 min-w-0 max-w-[48rem] text-[13px] md:text-[14px]">
            <strong className="font-semibold text-eef-blue">Vie privée d&apos;abord :</strong>{" "}
            l&apos;accès au suivi du dossier d&apos;un étudiant (statut, échéances)
            n&apos;est possible qu&apos;avec son consentement explicite, activable depuis
            son espace Mon Dossier.
          </p>
        </div>

        <Link
          href="/#parcours"
          className={`${btnPrimary} mt-7 min-h-[52px] w-full px-7 text-[14px] sm:mt-8 sm:w-auto`}
        >
          Consulter les guides
        </Link>
      </section>
    </MarketingShell>
  );
}
