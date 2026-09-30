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
    title: "Cercles de ville",
    desc: "Retrouvez des étudiants déjà installés dans votre ville d'arrivée : conseils pratiques, bons plans et premières rencontres.",
    icon: "pin",
  },
  {
    title: "Groupes d'école",
    desc: "Posez vos questions par établissement et par programme, auprès de ceux qui y étudient déjà.",
    icon: "grad",
  },
  {
    title: "Mentors",
    desc: "Des étudiants vérifiés accompagnent les nouveaux arrivants sur les démarches du quotidien.",
    icon: "mentor",
  },
  {
    title: "Recherche de colocataire",
    desc: "Trouvez un colocataire compatible selon ville, budget, calendrier et rythme de vie.",
    icon: "roommate",
    tag: "Profils vérifiés",
  },
  {
    title: "Événements",
    desc: "Webinaires d'accueil, rencontres locales et sessions pratiques avant et après votre arrivée.",
    icon: "calendar",
  },
  {
    title: "Ambassadeurs & alumni",
    desc: "Représentez la communauté sur votre campus et partagez votre expérience avec les prochaines promotions.",
    icon: "alumni",
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

  if (type === "pin") {
    return (
      <svg {...common}>
        <path d="M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  if (type === "grad") {
    return (
      <svg {...common}>
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12.5v4.2c0 .8 2.7 2.8 6 2.8s6-2 6-2.8v-4.2" />
        <path d="M22 10v6" />
      </svg>
    );
  }
  if (type === "mentor") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 19.5c1.2-3.2 3.5-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
        <path d="M17.5 4.5 19 6l2.5-2.5" />
      </svg>
    );
  }
  if (type === "roommate") {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c.9-2.8 2.8-4.2 5.5-4.2s4.6 1.4 5.5 4.2" />
        <path d="M16 8h5" />
        <path d="M18.5 5.5v5" />
      </svg>
    );
  }
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
  return (
    <svg {...common}>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M2.5 19c.8-2.5 2.4-3.8 5.5-3.8 1.4 0 2.5.3 3.4.9" />
      <path d="M12.6 16.1c.9-.6 2-.9 3.4-.9 3.1 0 4.7 1.3 5.5 3.8" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16.5" cy="9.5" r="2.5" />
      <path d="M2.5 19c.9-2.8 2.8-4.2 5.5-4.2 1.6 0 2.9.5 3.9 1.3" />
      <path d="M13.2 16.5c.9-.7 2.1-1.1 3.5-1.1 2.8 0 4.5 1.3 5.3 3.6" />
    </svg>
  );
}

export function MarketingCommunity() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className={`${wrap} pt-10 pb-16 max-md:pb-12`}>
        <nav className="mb-6 text-[12px] text-eef-secondary md:mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="cursor-pointer transition hover:text-eef-navy">
            Accueil
          </Link>
          <span className="mx-1.5 text-eef-border">/</span>
          <span className="text-eef-ink">Communauté</span>
        </nav>

        <p className="m-0 mb-[10px] text-[9px] font-medium uppercase tracking-[0.16em] text-eef-blue">
          COMMUNAUTÉ
        </p>

        <div className="grid min-w-0 items-start gap-5 md:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-24">
          <h1 className={`m-0 max-w-none lg:max-w-[9em] ${marketingHeroH1}`}>
            N&apos;arrivez pas en France en étranger.
          </h1>
          <div className="min-w-0 lg:justify-self-end lg:pt-2">
            <p className="m-0 max-w-[28rem] text-[15px] leading-[1.65] text-eef-secondary md:text-[16px]">
              Un réseau d&apos;étudiants vérifiés, organisé par ville, école, programme et
              promotion. Fonctionnel et utile — pas un réseau social de plus.
            </p>
            <Link
              href="/register"
              className={`${btnPrimary} mt-6 min-h-[52px] w-full px-6 text-[14px] sm:mt-7 sm:w-auto`}
            >
              Rejoindre ma promotion
            </Link>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[22px] bg-eef-soft md:mt-12 md:rounded-[28px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.conversation}
            alt="Étudiants de la communauté EEF"
            className="aspect-[4/3] min-h-[180px] w-full object-cover sm:aspect-[16/10] sm:min-h-[200px] md:aspect-[21/9] md:min-h-[240px]"
          />
          <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center rounded-[10px] bg-white/95 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-eef-navy shadow-[0_2px_12px_rgba(16,43,67,0.08)] backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-3.5 sm:text-[9px] md:bottom-5 md:left-5 md:px-4 md:py-2 md:tracking-[0.14em]">
            Comprendre. Choisir. Avancer.
          </span>
        </div>
      </section>

      {/* Features */}
      <section className={`${wrap} pb-8 pt-2 md:pt-4`}>
        <div className="grid min-w-0 gap-x-10 gap-y-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-16">
          {FEATURES.map((item) => (
            <article key={item.title} className="flex min-w-0 flex-col items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#c6d9e7] bg-[#e8f2fa] text-eef-blue md:h-[48px] md:w-[48px]">
                <FeatureIcon type={item.icon} />
              </div>
              <h2 className="m-0 mt-4 text-[clamp(1.35rem,5vw,27px)] font-semibold leading-[1.2] tracking-[-0.02em] text-eef-ink md:mt-5">
                {item.title}
              </h2>
              <p className="mt-2 m-0 max-w-[24rem] text-[14px] leading-[1.55] text-eef-secondary md:mt-2.5 md:text-[15px]">
                {item.desc}
              </p>
              {"tag" in item && item.tag ? (
                <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-eef-blue">
                  {item.tag}
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* Empty state */}
      <section className={`${wrap} mt-12 pb-20 max-md:pb-14 md:mt-[60px] md:pb-24`}>
        <h2 className="m-0 max-w-[12em] text-[clamp(1.6rem,5vw,46px)] font-medium leading-[1.15] tracking-[-0.03em] text-eef-ink">
          Les membres arrivent bientôt.
        </h2>

        <div className="mt-8 rounded-[22px] border border-dashed border-eef-border bg-white px-5 py-10 text-center md:mt-10 md:rounded-[28px] md:px-8 md:py-[60px]">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#c6d9e7] bg-[#e8f2fa] text-eef-blue md:h-[48px] md:w-[48px]">
            <IconUsers />
          </div>
          <h3 className="mt-5 m-0 text-[clamp(1.25rem,4.5vw,27px)] font-semibold leading-[1.25] tracking-[-0.02em] text-eef-ink md:mt-6">
            Aucun profil affiché pour l&apos;instant
          </h3>
          <p className="mx-auto mt-3 m-0 max-w-[36rem] text-[14px] leading-[1.55] text-eef-secondary md:text-[15px]">
            Seuls des profils d&apos;étudiants réels et vérifiés apparaîtront ici — jamais
            de profils fictifs. Rejoignez la liste : vous serez connecté(e) à votre
            promotion dès l&apos;ouverture.
          </p>
          <Link
            href="/register"
            className={`${btnPrimary} mt-6 min-h-[52px] w-full px-6 text-[14px] sm:mt-8 sm:w-auto`}
          >
            M&apos;inscrire à ma promotion
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
