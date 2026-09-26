"use client";

import Link from "next/link";
import {
  MarketingShell,
  ASSETS,
  wrap,
  btnPrimary,
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
        <nav className="mb-8 text-[12px] text-eef-secondary" aria-label="Fil d'Ariane">
          <Link href="/" className="cursor-pointer transition hover:text-eef-navy">
            Accueil
          </Link>
          <span className="mx-1.5 text-eef-border">/</span>
          <span className="text-eef-ink">Parents</span>
        </nav>

        <p className="m-0 mb-[10px] text-[9px] font-medium uppercase tracking-[0.16em] text-eef-blue">
          PARENTS
        </p>

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 lg:gap-24">
          <h1 className="m-0 max-w-[9em] text-[clamp(2.5rem,7vw,78px)] font-medium leading-[1.05] tracking-[-0.03em] text-eef-ink">
            Accompagner sans envahir.
          </h1>
          <p className="m-0 max-w-[28rem] text-[16px] leading-[1.65] text-eef-secondary md:justify-self-end md:pt-2">
            Un espace d&apos;information pour comprendre le parcours de votre enfant :
            étapes, échéances, budget et arrivée en France.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[28px] bg-eef-soft max-md:mt-8 max-md:rounded-[22px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.conversation}
            alt="Étudiants collaborant ensemble"
            className="aspect-[21/9] min-h-[240px] w-full object-cover max-md:aspect-[16/10] max-md:min-h-[200px]"
          />
          <span className="absolute bottom-5 left-5 inline-flex items-center rounded-full bg-white/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-eef-navy shadow-[0_2px_12px_rgba(16,43,67,0.08)] backdrop-blur-sm max-md:bottom-3 max-md:left-3 max-md:px-3 max-md:text-[9px]">
            Comprendre · Choisir · Avancer
          </span>
        </div>
      </section>

      <section className={`${wrap} pb-10 pt-4`}>
        <div className="grid gap-x-14 gap-y-14 sm:grid-cols-2 lg:gap-x-20 lg:gap-y-16">
          {FEATURES.map((item) => (
            <article key={item.title} className="flex flex-col items-start">
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] border border-[#c6d9e7] bg-[#e8f2fa] text-eef-blue">
                <FeatureIcon type={item.icon} />
              </div>
              <h2 className="m-0 mt-5 text-[27px] font-semibold leading-[1.2] tracking-[-0.02em] text-eef-ink">
                {item.title}
              </h2>
              <p className="mt-2.5 m-0 max-w-[26rem] text-[15px] leading-[1.55] text-eef-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${wrap} pb-24 pt-10 max-md:pb-16`}>
        <div className="flex items-start gap-3 text-[14px] leading-[1.6] text-eef-secondary">
          <span className="mt-0.5 shrink-0 text-eef-blue">
            <IconLock />
          </span>
          <p className="m-0 max-w-[48rem] text-[14px]">
            <strong className="font-semibold text-eef-blue">Vie privée d&apos;abord :</strong>{" "}
            l&apos;accès au suivi du dossier d&apos;un étudiant (statut, échéances)
            n&apos;est possible qu&apos;avec son consentement explicite, activable depuis
            son espace Mon Dossier.
          </p>
        </div>

        <Link
          href="/#parcours"
          className={`${btnPrimary} mt-8 min-h-[52px] px-7 text-[14px]`}
        >
          Consulter les guides
        </Link>
      </section>
    </MarketingShell>
  );
}
