"use client";

import Link from "next/link";
import { useState } from "react";

const ASSETS = {
  logo: "/marketing/assets/img-001.png",
  advisor: "/marketing/assets/img-002.webp",
  conversation: "/marketing/assets/img-003.webp",
  student: "/marketing/assets/img-004.webp",
  library: "/marketing/assets/img-005.webp",
  campus: "/marketing/assets/img-006.PNG",
  city: "/marketing/assets/img-007.webp",
  logoMark: "/marketing/assets/img-008.png",
};

const JOURNEY = [
  {
    n: "01",
    title: "Clarifier votre projet",
    desc: "Comprendre votre parcours, vos résultats, vos centres d'intérêt, vos objectifs professionnels et vos contraintes.",
  },
  {
    n: "02",
    title: "Choisir vos formations",
    desc: "Identifier les domaines et diplômes cohérents avec votre profil, de la Licence au Master et aux écoles spécialisées.",
  },
  {
    n: "03",
    title: "Comparer les établissements",
    desc: "Étudier le programme, la sélectivité, la ville, le budget et les débouchés. Chaque choix doit avoir une raison.",
  },
  {
    n: "04",
    title: "Construire votre stratégie",
    desc: "Organiser une sélection équilibrée de candidatures ambitieuses, réalistes et plus prudentes.",
  },
  {
    n: "05",
    title: "Préparer votre dossier",
    desc: "Structurer votre CV, vos motivations, votre projet d'études et les pièces nécessaires à vos candidatures.",
  },
  {
    n: "06",
    title: "Préparer votre arrivée",
    desc: "Logement, démarches et budget : l'accompagnement continue après l'admission.",
  },
];

const PROFILE = [
  { title: "Votre parcours", desc: "Ce que vous avez déjà étudié." },
  { title: "Vos forces", desc: "Les matières et compétences qui vous correspondent." },
  { title: "Vos ambitions", desc: "Ce que vous aimeriez construire professionnellement." },
  { title: "Vos contraintes", desc: "Budget, langue, ville, calendrier et niveau d'études." },
];

const UNI_CRITERIA = [
  { n: "01", title: "Programme", desc: "Que vais-je réellement étudier ?" },
  { n: "02", title: "Adéquation", desc: "Mon profil correspond-il aux prérequis ?" },
  { n: "03", title: "Sélectivité", desc: "Quel niveau de candidature est réaliste ?" },
  { n: "04", title: "Budget", desc: "Frais de scolarité et coût de la ville." },
  { n: "05", title: "Localisation", desc: "Quel environnement étudiant me correspond ?" },
  { n: "06", title: "Débouchés", desc: "Que permet réellement cette formation ?" },
];

const STRATEGY = [
  {
    n: "01",
    title: "Ambitieuse",
    desc: "Des formations plus sélectives qui correspondent à votre projet et méritent d'être tentées.",
  },
  {
    n: "02",
    title: "Réaliste",
    desc: "Des candidatures cohérentes avec votre dossier académique et votre profil.",
  },
  {
    n: "03",
    title: "Prudente",
    desc: "Des options supplémentaires pour réduire le risque d'une stratégie trop concentrée.",
  },
];

const DOSSIER_STEPS = [
  "Comprendre votre calendrier",
  "Préparer vos documents",
  "Organiser vos candidatures",
  "Constituer votre dossier",
  "Vérifier chaque étape",
  "Suivre les réponses",
  "Préparer la suite après admission",
];

const AFTER = [
  {
    n: "01",
    title: "Logement",
    desc: "Comprendre les quartiers, préparer votre dossier locatif et organiser votre recherche.",
  },
  {
    n: "02",
    title: "Démarches",
    desc: "Identifier les formalités importantes avant et après votre arrivée.",
  },
  {
    n: "03",
    title: "Budget",
    desc: "Anticiper logement, transport, alimentation, assurance et dépenses du quotidien.",
  },
  {
    n: "04",
    title: "Arrivée",
    desc: "Préparer vos premières semaines pour vous installer plus sereinement.",
  },
];

const ARTICLES = [
  {
    tag: "ORIENTATION · LE GUIDE",
    title: "Licence, Bachelor ou Master : comment choisir ?",
  },
  {
    tag: "Universités",
    title: "Construire une shortlist d'universités : la méthode",
  },
  {
    tag: "Dossier",
    title: "Comment structurer un projet d'études cohérent ?",
  },
  {
    tag: "Études en France",
    title: "Comprendre la procédure Études en France",
  },
  {
    tag: "Vie en France",
    title: "Préparer son départ en France : la checklist",
  },
  {
    tag: "Logement",
    title: "Trouver un logement étudiant : quels documents préparer ?",
  },
];

const wrap = "mx-auto w-[calc(100%-2.5rem)] max-w-[1360px] lg:w-[calc(100%-8rem)]";
const eyebrow =
  "m-0 mb-[1.15rem] text-[10px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]";
const sectionH2 =
  "m-0 font-medium text-eef-ink tracking-[-0.03em] leading-[1.14] text-[60px]";
const bodyMuted = "m-0 text-[15px] leading-[1.65] text-eef-secondary";
const pillBase =
  "inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-[11px] whitespace-nowrap rounded-full border border-[#173b5d] px-6 text-[14px] font-medium transition hover:-translate-y-0.5";
const btnPrimary =
  "inline-flex min-h-[43px] cursor-pointer items-center justify-center gap-3.5 rounded-full bg-eef-navy px-[19px] text-[13px] font-medium text-white transition hover:bg-eef-ink [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5";
const textLink =
  "inline-flex cursor-pointer items-center gap-1 text-[13px] font-medium text-eef-ink underline decoration-eef-border underline-offset-[5px] transition hover:text-eef-navy hover:decoration-eef-navy";

const NAV_ITEMS = [
  {
    label: "S'orienter",
    links: [
      { href: "#orientation", label: "Orientation" },
      { href: "#parcours", label: "Formations" },
      { href: "#methode", label: "Universités" },
      { href: "#parcours", label: "Bourses" },
    ],
  },
  {
    label: "Candidater",
    links: [
      { href: "#strategie", label: "Stratégie de candidature" },
      { href: "#dossier", label: "Préparer son dossier" },
      { href: "#dossier", label: "Procédure Études en France" },
      { href: "#methode", label: "Voies d'admission" },
    ],
  },
  {
    label: "S'installer",
    links: [
      { href: "#installation", label: "Vie en France" },
      { href: "#installation", label: "Logement" },
      { href: "#installation", label: "Visa et démarches" },
      { href: "#installation", label: "Budget étudiant" },
    ],
  },
  {
    label: "Comprendre",
    links: [
      { href: "#parcours", label: "Ressources" },
      { href: "#methode", label: "Notre méthode" },
      { href: "#parcours", label: "FAQ" },
      { href: "#accompagnement", label: "Communauté" },
      { href: "#parcours", label: "Carrière" },
      { href: "#parcours", label: "Parents" },
    ],
  },
];

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function IconRoute() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <path d="M4 6h16" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MarketingHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-eef-mist text-eef-ink [&_a]:no-underline [&_img]:block [&_img]:max-w-full">
      <header className="sticky top-0 z-40 h-20 border-b border-eef-border bg-eef-mist">
        <div
          className={`${wrap} flex h-full max-w-[1512px] items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]`}
        >
          <Link href="/" className="shrink-0 justify-self-start" aria-label="Procédure EEF — Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.logo} alt="eef" className="h-10 w-[71px] object-contain" />
          </Link>

          <nav
            className="mx-auto hidden h-full items-center justify-center gap-[25px] lg:flex"
            aria-label="Navigation principale"
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="group relative flex h-full items-center">
                <button
                  type="button"
                  className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 whitespace-nowrap border-0 bg-transparent p-0 text-[12px] font-medium text-eef-ink transition group-hover:text-eef-navy"
                >
                  {item.label}
                  <IconChevron />
                </button>

                <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-2 group-hover:pointer-events-auto">
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
                    <div className="min-h-0 overflow-hidden">
                      <div className="origin-top rounded-[18px] border border-eef-border bg-white p-2.5 shadow-[0_10px_30px_rgba(16,43,67,0.06)]">
                        {item.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="flex cursor-pointer items-center justify-between rounded-[9px] px-3 py-3.5 text-[13px] text-eef-ink transition hover:bg-eef-mist hover:text-eef-navy"
                          >
                            {link.label}
                            <IconArrow />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-[23px] lg:flex">
            <Link
              href="/login"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[12px] font-medium text-eef-ink transition hover:text-eef-navy"
            >
              Espace étudiant <IconArrow />
            </Link>
            <a href="mailto:hello@eef.fr" className={btnPrimary}>
              Parler à un conseiller <IconArrow />
            </a>
          </div>

          <button
            type="button"
            className="ml-auto cursor-pointer border-0 bg-transparent p-1.5 text-eef-ink lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <IconMenu />
          </button>
        </div>

        <div
          className={`grid gap-2 border-t border-eef-border bg-eef-mist px-5 pb-5 pt-3 lg:hidden ${
            menuOpen ? "" : "hidden"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="border-b border-eef-soft pb-2">
              <p className="px-3.5 py-2 text-[12px] font-semibold text-eef-ink">{item.label}</p>
              {item.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-[10px] px-3.5 py-2.5 text-[14px] text-eef-secondary hover:bg-eef-soft hover:text-eef-navy"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="rounded-[10px] px-3.5 py-3 text-[15px] text-eef-ink hover:bg-eef-soft"
          >
            Espace étudiant
          </Link>
          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="rounded-[10px] px-3.5 py-3 text-[15px] text-eef-ink hover:bg-eef-soft"
          >
            Commencer
          </Link>
          <a
            href="mailto:hello@eef.fr"
            className="rounded-[10px] px-3.5 py-3 text-[15px] text-eef-ink hover:bg-eef-soft"
          >
            Parler à un conseiller
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className={`${wrap} flex flex-col items-center px-0 pb-[92px] pt-16 text-center max-md:pb-[60px] max-md:pt-10`}>
          <h1 className="mx-auto max-w-[1120px] text-[clamp(33px,5.2vw,74px)] font-medium leading-[1.1] tracking-[-0.03em] text-eef-ink">
            {"Construisez votre projet d'études"}
            <br />
            <Link
              href="/register"
              className="mx-2.5 inline-flex -translate-y-[7px] items-center gap-2 rounded-full border border-eef-border bg-white px-[18px] py-2 align-middle text-[clamp(13px,1.25vw,16px)] font-medium tracking-normal text-eef-secondary shadow-[0_2px_12px_rgba(16,43,67,0.05)] transition hover:border-eef-blue hover:text-eef-ink hover:shadow-[0_4px_18px_rgba(99,168,216,0.15)] [&_svg]:text-eef-blue"
            >
              <IconSearch />
              Trouver ma voie
            </Link>
            {" en France avec "}
            <a
              href="mailto:hello@eef.fr"
              className="mx-3 inline-flex size-[clamp(50px,5.6vw,80px)] -translate-y-[5px] overflow-hidden rounded-full border-[3px] border-white align-middle shadow-[0_6px_20px_rgba(16,43,67,0.12)] transition hover:-translate-y-[9px]"
              aria-label="Parler à un conseiller"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.advisor} alt="" className="size-full object-cover object-center" />
            </a>
            {" un\u00A0conseiller humain."}
          </h1>

          <p className="mx-auto mt-6 max-w-[600px] text-[clamp(15px,1.5vw,19px)] font-medium leading-normal text-eef-ink">
            Orientation, formations, candidatures et installation — un accompagnement
            humain à chaque étape.
          </p>

          <nav
            className="mt-[30px] flex flex-wrap items-center justify-center gap-3.5 text-[13px] text-eef-secondary"
            aria-label="Étapes du parcours"
          >
            <a href="#parcours" className="px-0.5 py-1 transition hover:text-eef-ink">
              Orientation
            </a>
            <span className="h-px w-[26px] bg-eef-border" aria-hidden />
            <a href="#parcours" className="px-0.5 py-1 font-semibold text-eef-ink">
              Formations
            </a>
            <span className="h-px w-[26px] bg-eef-border" aria-hidden />
            <a href="#dossier" className="px-0.5 py-1 transition hover:text-eef-ink">
              Candidature
            </a>
            <span className="h-px w-[26px] bg-eef-border" aria-hidden />
            <a href="#installation" className="px-0.5 py-1 transition hover:text-eef-ink">
              Installation
            </a>
          </nav>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a href="#parcours" className={`${pillBase} bg-transparent text-[#173b5d] hover:bg-[#173b5d0f]`}>
              <IconRoute />
              Parcours de A à Z
            </a>
            <Link href="/login" className={`${pillBase} bg-[#173b5d] text-white hover:border-[#122f4b] hover:bg-[#122f4b]`}>
              Espace étudiant
            </Link>
            <a
              href="mailto:hello@eef.fr"
              className={`${pillBase} bg-[#173b5d] text-white hover:border-[#122f4b] hover:bg-[#122f4b]`}
            >
              Parler à un conseiller
              <IconArrow />
            </a>
          </div>

          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="flex items-center" aria-hidden>
              {[ASSETS.advisor, ASSETS.conversation, ASSETS.student, ASSETS.library].map(
                (src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className={`size-[46px] rounded-full border-2 border-eef-mist object-cover shadow-[0_2px_12px_rgba(16,43,67,0.09)] ${
                      i === 0 ? "" : "-ml-[13px]"
                    }`}
                  />
                ),
              )}
            </div>
            <p className="m-0 text-[13px] text-eef-secondary">
              Un accompagnement humain, pas un algorithme.
            </p>
          </div>
        </section>

        {/* 01 Journey */}
        <section
          id="parcours"
          className={`${wrap} grid items-stretch gap-12 py-[5.5rem] max-md:py-14 lg:grid-cols-[minmax(260px,0.4fr)_minmax(0,0.6fr)] lg:gap-[clamp(3rem,6vw,5.5rem)]`}
        >
          <div className="relative flex h-full min-h-full flex-col self-stretch pb-[5.5rem]">
            <p className={eyebrow}>01 — DE A À Z</p>
            <h2 className={`${sectionH2} max-w-[12em]`}>
              Votre parcours,
              <br />
              étape par étape.
            </h2>
            <p className={`${bodyMuted} mt-[1.15rem] max-w-[28rem]`}>
              Chaque étape influence la suivante. Nous construisons donc votre projet dans
              le bon ordre plutôt que de commencer directement par les candidatures.
            </p>
            <div
              className="pointer-events-none absolute bottom-0 left-0 hidden select-none whitespace-nowrap text-[clamp(3.25rem,5.5vw,5rem)] font-medium leading-none tracking-[-0.04em] text-[#c5d5e3] lg:block"
              aria-hidden
            >
              01&nbsp;—&nbsp;06
            </div>
          </div>

          <div className="self-stretch border-t border-eef-border">
            {JOURNEY.map((step) => (
              <a
                key={step.n}
                href="#dossier"
                className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-[1.15rem] gap-y-1 border-b border-eef-border py-[1.2rem] text-inherit"
              >
                <span className="pt-0.5 text-[11px] font-medium leading-tight tracking-[0.02em] text-[#8eb4d0]">
                  {step.n}
                </span>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="m-0 text-[23px] font-[500] leading-tight tracking-[-0.02em] text-eef-ink transition group-hover:text-eef-navy">
                      {step.title}
                    </h3>
                    <span className="mt-0.5 shrink-0 text-eef-ink opacity-75 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-eef-navy">
                      <IconArrow />
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-[34rem] text-[13px] leading-snug text-eef-secondary">
                    {step.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 02 Start */}
        <section id="orientation" className={`${wrap} py-[5.5rem] max-md:py-14`}>
          <p className={eyebrow}>02 — TOUT COMMENCE PAR VOUS</p>
          <h2 className={`${sectionH2} max-w-[min(13.5em,100%)]`}>
            <span className="text-eef-ink">
              Vous ne savez pas encore exactement quoi étudier ?
            </span>{" "}
            <span className="text-eef-blue">C&apos;est là que tout commence.</span>
          </h2>

          <div className="mt-11 grid items-stretch gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-[clamp(2.5rem,5vw,4.5rem)]">
            <div className="aspect-[5/5] max-h-[560px] overflow-hidden rounded-[16px_7.5rem_16px_16px] bg-eef-soft max-md:aspect-[5/4] max-md:max-h-none max-md:rounded-[14px_4.5rem_14px_14px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.library}
                alt="Étudiante consultant des ouvrages en bibliothèque"
                className="size-full object-cover"
              />
            </div>

            <div className="flex h-full min-w-0 flex-col">
              <p className="m-0 max-w-[28rem] text-[14px] font-medium leading-snug text-eef-ink">
                Avant de parler d&apos;universités, nous prenons le temps de comprendre votre
                profil.
              </p>

              <div className="mt-7 border-t border-eef-border">
                {PROFILE.map((item) => (
                  <div
                    key={item.title}
                    className="grid grid-cols-1 items-baseline gap-1.5 border-b border-eef-border py-[17px] sm:grid-cols-[minmax(7.5rem,0.38fr)_minmax(0,1fr)] sm:gap-x-6 sm:gap-y-4 sm:py-[1.15rem]"
                  >
                    <strong className="text-[16px] font-[500] tracking-[-0.01em] text-eef-ink">
                      {item.title}
                    </strong>
                    <span className="text-[12px] leading-normal text-eef-secondary">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#parcours"
                className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium hoveer:underline transition hover:text-eef-navy [&_span]:transition-transform hover:[&_span]:translate-x-[3px]"
              >
                Découvrir l&apos;orientation <span aria-hidden>→</span>
              </a>

              <p className="mb-0 mt-auto pt-2 text-[13px] leading-snug text-[#9aafbf]">
                Une recommandation doit toujours avoir une raison.
              </p>
            </div>
          </div>
        </section>

        {/* 03 Human */}
        <section
          id="accompagnement"
          className={`${wrap} grid items-start gap-10 py-[5.5rem] max-md:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[clamp(2.75rem,5vw,4.75rem)]`}
        >
          <div className="relative aspect-[1/1] max-h-[580px] overflow-hidden rounded-[28px] bg-eef-soft max-md:aspect-[5/4] max-md:max-h-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.conversation}
              alt="Échange entre étudiants et conseiller"
              className="size-full object-cover"
            />
            <span className="absolute bottom-[1.15rem] left-[1.15rem] inline-flex items-center rounded-[7px] bg-white px-3.5 py-2 text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-eef-navy shadow-[0_2px_10px_rgba(16,43,67,0.08)]">
              L&apos;échange fait la différence.
            </span>
          </div>

          <div className="flex min-w-0 flex-col items-start pt-0.5">
            <p className={`${eyebrow} text-eef-navy`}>03 — UN ACCOMPAGNEMENT HUMAIN</p>
            <h2 className={`${sectionH2} max-w-[11.5em]`}>
              Une vraie personne qui connaît votre dossier.
            </h2>
            <p className={`${bodyMuted} mt-[1.15rem] max-w-[26rem]`}>
              Votre conseiller apprend à connaître votre parcours, vos hésitations et vos
              objectifs avant de vous orienter.
            </p>
            <p className={`${bodyMuted} mt-[0.85rem] max-w-[26rem]`}>
              La technologie organise les informations et votre progression. Elle ne
              remplace pas la réflexion, le conseil ou la discussion.
            </p>
            <hr className="mt-[22px] w-full max-w-[26rem] border-0 border-t border-eef-border" />
            <p className="mt-[22px] max-w-[24rem] text-[18px] font-medium leading-normal text-eef-ink">
              Votre projet n&apos;est pas généré automatiquement. Il est construit avec vous.
            </p>
            <a
              href="mailto:hello@eef.fr"
              className={`${btnPrimary} mt-[1.85rem] min-h-12 px-[1.35rem] text-[13px]`}
            >
              Parler à un conseiller <IconArrow />
            </a>
          </div>
        </section>

        {/* 04 Method */}
        <section id="methode" className={`${wrap} py-[5.5rem] max-md:py-14`}>
          <p className={eyebrow}>04 — CHOISIR AVEC MÉTHODE</p>

          <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-[clamp(2rem,4vw,4rem)]">
            <h2 className={`${sectionH2} max-w-[11em]`}>
              Une université ne se résume pas à son nom.
            </h2>
            <p className={`text-[15px] leading-[1.65] text-eef-secondary max-w-[28rem] md:justify-self-end md:pt-1`}>
              Deux formations portant presque le même intitulé peuvent proposer des
              contenus, des niveaux de sélection, des coûts et des perspectives très
              différents.
            </p>
          </div>

          <div className="relative mt-10 min-w-[980px] min-h-[260px] max-h-[420px] overflow-hidden rounded-[28px] bg-eef-soft max-md:min-h-[200px] max-md:max-h-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.campus}
              alt="Entrée d'un établissement universitaire"
              className="size-full object-contain"
            />
            <span className="absolute bottom-[1.15rem] left-[1.15rem] inline-flex items-center rounded-full bg-white px-3.5 py-2 text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-eef-navy shadow-[0_2px_10px_rgba(16,43,67,0.08)]">
              Comparer moins. Comparer mieux.
            </span>
          </div>

          <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {UNI_CRITERIA.map((item, i) => (
              <article
                key={item.n}
                className={`border-eef-border p-5 max-md:border-b max-md:py-[1.15rem] max-md:pl-0 max-md:pr-3.5 sm:border-r ${
                  i === 0 ? "sm:pl-0" : ""
                } ${i === UNI_CRITERIA.length - 1 ? "sm:border-r-0 sm:pr-0" : ""} ${
                  (i + 1) % 3 === 0 ? "max-lg:sm:border-r-0 max-lg:sm:pr-0" : ""
                } ${(i + 1) % 3 === 1 ? "max-lg:sm:pl-0" : ""}`}
              >
                <span className="mb-2.5 block text-[9px] font-medium tracking-[0.04em] text-[#9aafbf]">
                  {item.n}
                </span>
                <h3 className="m-0 text-[18px] font-semibold leading-tight tracking-[-0.02em] text-eef-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[11px] leading-snug text-eef-secondary">{item.desc}</p>
              </article>
            ))}
          </div>

          <a href="#parcours" className={`${textLink} mt-8 gap-1.5 [&_span]:no-underline hover:[&_span]:translate-x-[3px] [&_span]:transition-transform`}>
            Explorer notre méthode de sélection <span aria-hidden>→</span>
          </a>
        </section>

        {/* 05 Strategy */}
        <section id="strategie" className={`${wrap} py-20 max-md:py-14`}>
          <p className="m-0 mb-5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]">
            05 — LA STRATÉGIE
          </p>

          <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16 lg:gap-24">
            <h2 className="m-0 max-w-[9em] text-[clamp(1.85rem,4vw,46px)] font-medium leading-[1.15] tracking-[-0.03em] text-eef-ink">
              Ne pas candidater au hasard.
            </h2>
            <p className="m-0 max-w-[26rem] text-[14px] leading-[1.65] text-eef-secondary md:justify-self-end md:pt-1">
              Une bonne stratégie ne consiste pas à multiplier les candidatures. Elle
              consiste à construire une sélection cohérente.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-12 lg:gap-16">
            {STRATEGY.map((item) => (
              <article key={item.n} className="border-t border-eef-border pt-6">
                <span className="mb-5 block text-[70px] font-medium leading-none tracking-[-0.04em] text-[#9ec4df]">
                  {item.n}
                </span>
                <h3 className="m-0 text-[33px] font-semibold leading-tight tracking-[-0.02em] text-eef-ink">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[14rem] text-[14px] leading-[1.55] text-eef-secondary">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-end justify-between gap-4 gap-x-8 md:mt-20">
            <p className="m-0 max-w-[28rem] text-[12px] leading-snug text-[#9aafbf]">
              Une candidature prudente ne signifie jamais qu&apos;une admission est garantie.
            </p>
            <a
              href="#parcours"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-eef-ink underline decoration-eef-border underline-offset-[5px] transition hover:text-eef-navy hover:decoration-eef-navy [&_span]:no-underline [&_span]:transition-transform hover:[&_span]:translate-x-[3px]"
            >
              Construire ma stratégie <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* 06 Dossier */}
        <section
          id="dossier"
          className={`${wrap} grid items-center gap-8 py-[5.5rem] max-md:py-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12`}
        >
          <div>
            <p className={eyebrow}>06 — VOTRE DOSSIER</p>
            <h2 className={sectionH2}>
              Votre parcours doit être compris, pas simplement envoyé.
            </h2>
            <p className={`${bodyMuted} mt-[1.15rem] max-w-[40rem]`}>
              Un bon dossier relie votre parcours passé, votre choix de formation et votre
              projet futur de manière cohérente.
            </p>
            <ul className="mt-6 grid list-none gap-3 p-0">
              {DOSSIER_STEPS.map((step) => (
                <li key={step} className="grid grid-cols-[1.5rem_1fr] items-start gap-2.5 text-eef-navy">
                  <span className="mt-[0.45rem] size-[0.55rem] rounded-full bg-eef-blue" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-h-[280px] overflow-hidden rounded-[18px] border border-eef-soft bg-eef-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.library}
              alt="Préparation du dossier"
              className="min-h-[280px] size-full object-cover"
            />
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className={`${wrap} py-[5.5rem] max-md:py-14`}>
          <p className={eyebrow}>08 — ET APRÈS L&apos;ADMISSION ?</p>
          <h2 className={sectionH2}>L&apos;admission n&apos;est pas la dernière étape.</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {AFTER.map((item) => (
              <article
                key={item.n}
                className="rounded-2xl border border-eef-soft bg-white px-[1.3rem] py-5"
              >
                <p className={eyebrow}>{item.n}</p>
                <h3 className="m-0 text-[1.05rem] font-semibold text-eef-ink">{item.title}</h3>
                <p className="mt-1.5 text-[0.92rem] leading-normal text-eef-secondary">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-7 min-h-[300px] overflow-hidden rounded-[18px] border border-eef-soft bg-eef-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.city} alt="Vie en France" className="min-h-[300px] size-full object-cover" />
          </div>
        </section>

        {/* Journal */}
        <section className={`${wrap} py-[5.5rem] max-md:py-14`}>
          <p className={eyebrow}>LE JOURNAL EEF</p>
          <h2 className={sectionH2}>Comprendre avant de décider.</h2>
          <div className="mt-8 grid gap-0">
            {ARTICLES.map((article) => (
              <a
                key={article.title}
                href="#parcours"
                className="group flex items-center justify-between gap-4 border-b border-eef-border py-5 text-inherit transition hover:bg-white/40"
              >
                <div>
                  <p className={eyebrow}>{article.tag}</p>
                  <h3 className="m-0 text-[1.15rem] font-semibold text-eef-ink transition group-hover:text-eef-navy">
                    {article.title}
                  </h3>
                </div>
                <span className="shrink-0 text-eef-ink opacity-70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <IconArrow />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Workspace */}
        <section className={`${wrap} py-12 text-center`}>
          <p className={eyebrow}>VOTRE ESPACE ÉTUDIANT</p>
          <p className="mx-auto mb-5 mt-2 font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] tracking-[-0.03em] text-eef-ink">
            Des outils pour organiser.
            <br />
            Des humains pour conseiller.
          </p>
          <Link
            href="/login"
            className="inline-flex rounded-full px-3 py-2 text-eef-deep transition hover:bg-eef-soft"
          >
            Ouvrir Mon Dossier →
          </Link>
        </section>

        {/* Final CTA */}
        <section className={`${wrap} pb-[4.5rem] pt-8`}>
          <div className="relative grid items-center gap-6 overflow-hidden rounded-[22px] bg-eef-navy px-6 py-8 text-white md:grid-cols-[1.2fr_0.8fr] md:px-11 md:py-11">
            <div>
              <h2 className="m-0 text-[clamp(1.7rem,3.5vw,2.6rem)] font-medium tracking-[-0.03em] text-white">
                Votre projet mérite plus qu&apos;une liste d&apos;universités.
              </h2>
              <p className="mt-3 text-white/80">
                Commençons par comprendre où vous voulez aller.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href="mailto:hello@eef.fr"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-eef-navy"
                >
                  Parler à un conseiller
                </a>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-transparent px-5 py-2.5 text-[13px] font-medium text-white"
                >
                  Commencer
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.logoMark} alt="" className="w-[min(220px,70%)] opacity-90" />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-eef-soft bg-[#eef6fb] pb-8 pt-12">
        <div className={wrap}>
          <div className="grid gap-8 md:grid-cols-[1.1fr_auto_1.6fr] md:gap-10">
            <div>
              <Link href="/" aria-label="Procédure EEF — Accueil">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ASSETS.logo} alt="eef" className="h-[26px] w-auto" />
              </Link>
              <p className="mt-3.5 max-w-[18rem] text-[0.95rem] text-eef-secondary">
                Votre projet d&apos;études en France, accompagné de A à Z.
              </p>
              <a
                href="mailto:hello@eef.fr"
                className="mt-3.5 inline-flex items-center gap-1 text-eef-deep"
              >
                Nous écrire <IconArrow />
              </a>
            </div>

            <div>
              <a
                href="mailto:hello@eef.fr"
                className="inline-flex items-center gap-2 rounded-full bg-eef-navy px-5 py-3 text-[13px] font-medium text-white"
              >
                Parler à un conseiller <IconArrow />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                {
                  title: "S'orienter",
                  links: [
                    ["#parcours", "Orientation"],
                    ["#parcours", "Formations"],
                    ["#parcours", "Universités"],
                  ],
                },
                {
                  title: "Candidater",
                  links: [
                    ["#dossier", "Stratégie"],
                    ["#dossier", "Dossier"],
                    ["/login", "Procédure EEF"],
                  ],
                },
                {
                  title: "S'installer",
                  links: [
                    ["#installation", "Logement"],
                    ["#installation", "Démarches"],
                    ["#installation", "Vie en France"],
                  ],
                },
                {
                  title: "Procédure EEF",
                  links: [
                    ["/login", "Espace étudiant"],
                    ["/register", "Commencer"],
                    ["mailto:hello@eef.fr", "Contact"],
                  ],
                },
              ].map((col) => (
                <nav key={col.title} aria-label={col.title} className="flex flex-col gap-2">
                  <p className="m-0 mb-1 text-[12px] font-semibold text-eef-ink">{col.title}</p>
                  {col.links.map(([href, label]) =>
                    href.startsWith("/") ? (
                      <Link key={label} href={href} className="text-[13px] text-eef-secondary hover:text-eef-navy">
                        {label}
                      </Link>
                    ) : (
                      <a key={label} href={href} className="text-[13px] text-eef-secondary hover:text-eef-navy">
                        {label}
                      </a>
                    ),
                  )}
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-eef-border pt-6 text-[12px] text-eef-secondary">
            <p className="m-0">© 2026 Procédure EEF</p>
            <nav aria-label="Informations légales" className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-eef-navy">
                Mentions légales
              </a>
              <a href="#" className="hover:text-eef-navy">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-eef-navy">
                Conditions
              </a>
              <a href="#" className="hover:text-eef-navy">
                Cookies
              </a>
            </nav>
          </div>
          <p className="mt-4 text-[12px] text-eef-secondary">
            Procédure EEF est un service indépendant et n&apos;est pas affilié à Campus
            France ou au gouvernement français.
          </p>
        </div>
        <span
          className="pointer-events-none absolute bottom-[-0.35em] right-4 select-none text-[clamp(6rem,18vw,14rem)] font-medium leading-none tracking-[-0.06em] text-[#d7e8f3]"
          aria-hidden
        >
          eef
        </span>
      </footer>
    </div>
  );
}
