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
      { href: "/carriere", label: "Carrière" },
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
          className="mx-auto w-[calc(100%-48px)] max-w-[1360px] pt-[64px] md:w-[calc(100%-128px)] md:pt-[88px]"
          id="dossier"
        >
          <div className="max-w-[720px]">
            <p className="text-[10px] leading-[15px] mb-[23px] tracking-[1.6px] font-medium text-[#173b5d]">
              06 — VOTRE DOSSIER
            </p>
            <h2 className="text-[40px] leading-[1.1] font-medium tracking-[-1.8px] md:text-[64px] md:tracking-[-2.88px]">
              Votre parcours doit être compris, pas simplement envoyé.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.75] text-[#5e7282] md:mt-[26px]">
              Un bon dossier relie votre parcours passé, votre choix de
              formation et votre projet futur de manière cohérente.
            </p>
            <p className="mt-5 text-[14px] leading-[1.75] text-[#5e7282] md:mt-[26px]">
              Nous vous aidons à structurer, relire et améliorer votre
              présentation. Les informations et motivations restent toujours les
              vôtres.
            </p>
            <div className="mb-12 mt-6 flex h-[44px] items-center gap-[15px] text-[13px] font-medium text-[#102b43] underline decoration-[#c6d9e7] underline-offset-6 md:mb-[88px] md:mt-[30px]">
              <span>Comprendre l&apos;accompagnement dossier</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-arrow-right"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>

            <ul className="space-y-5 py-12 md:space-y-[26px] md:py-[88px]">
              {DOSSIER_STEPS.map((step) => (
                <li key={step} className="flex items-center gap-[18px]">
                  <span className="border border-[#c6d9e7] rounded-full w-[22px] h-[22px] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5e7282"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                  <span className="text-[19px] leading-[1.2] font-medium tracking-[-0.475px]">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="mx-auto w-[calc(100%-48px)] max-w-[1360px] py-16 md:w-[calc(100%-88px)] md:py-[80px]"
          id="installation"
        >
          <p className="text-[10px] leading-[15px] mb-[23px] tracking-[1.6px] font-medium text-[#173b5d]">
            08 — ET APRÈS L&apos;ADMISSION ?
          </p>
          <h2 className="max-w-[650px] text-[40px] leading-[1.1] font-medium tracking-[-1.8px] md:text-[64px] md:tracking-[-2.88px]">
            L&apos;admission n&apos;est pas la dernière étape.
          </h2>
          <div className="mt-8 grid gap-8 lg:mt-[50px] lg:grid-cols-[1.2fr_1fr] lg:gap-[65px]">
            <figure className="">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.city}
                alt="Vie en France"
                className="h-full w-full rounded-t-[28px] rounded-bl-[28px] rounded-br-[100px]"
              />
              <div className="mt-[20px] h-[44px] text-[13px] text-[#102b43] font-medium gap-[15px] flex items-center underline decoration-[#c6d9e7] underline-offset-6">
                <span>Préparer mon arrivée</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-right"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </figure>
            <div className="">
              {AFTER.map((item) => (
                <a
                  href="#"
                  className="flex items-start gap-[22px] border-t border-[#c6d9e7] py-[28px]"
                  key={item.n}
                >
                  <span className="w-[25px] pt-[5px] text-[10px] text-[#63a8d8]">
                    {item.n}
                  </span>
                  <div className="w-full flex flex-col">
                    <div className="w-full flex items-center justify-between gap-4">
                      <h3 className="text-[26px] leading-[31.19px] tracking-[-0.91px] font-medium text-[#102b43]">
                        {item.title}
                      </h3>
                      <span className="text-[#173b5d]" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-arrow-up-right"
                          aria-hidden="true"
                        >
                          <path d="M7 7h10v10"></path>
                          <path d="M7 17 17 7"></path>
                        </svg>
                      </span>
                    </div>
                    <p className="mt-2.5 text-[13px] leading-[1.75] text-[#5e7282]">
                      {item.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-[calc(100%-48px)] max-w-[1360px] py-16 md:w-[calc(100%-80px)] md:py-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] leading-[15px] mb-[23px] tracking-[1.6px] font-medium text-[#173b5d]">
                LE JOURNAL EEF
              </p>
              <h2 className="max-w-[500px] text-[40px] leading-[1.1] font-medium tracking-[-1.8px] md:text-[64px] md:tracking-[-2.88px]">
                Comprendre avant de décider.
              </h2>
            </div>

            <div className="mt-[20px] h-[44px] text-[13px] text-[#102b43] font-medium gap-[15px] flex items-center underline decoration-[#c6d9e7] underline-offset-6">
              <span>Toutes les ressources</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-arrow-right"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:mt-[48px] lg:grid-cols-[1.25fr_1fr] lg:gap-[65px]">
            <a href="#parcours" className="group block min-w-0">
              <div className="aspect-[2/1] overflow-hidden rounded-[22px] bg-[#e4eff6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.library}
                  alt="Étudiante cherchant un livre dans une bibliothèque"
                  className="h-full w-full object-cover transition-transform duration-500"
                />
              </div>
              <p className="mt-[25px] text-[10px] leading-[15px] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
                {ARTICLES[0].tag}
              </p>
              <h3 className="mt-3 max-w-[540px] text-[23px] leading-[1.2] tracking-[-1.155px] font-medium text-[#102b43] md:text-[33px]">
                {ARTICLES[0].title}
              </h3>
              <span className="mt-[25px] inline-flex items-center gap-[14px] text-[12px] leading-[18.59px] text-[#102b43]">
                Lire le guide{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-up-right"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </span>
            </a>

            <div>
              {ARTICLES.slice(1).map((article) => (
                <a
                  href="#parcours"
                  className="flex items-center justify-between gap-4 border-t first:border-t-0 border-[#e5e7eb] first:pt-0 py-6"
                  key={article.title}
                >
                  <div>
                    <p className="mb-[11px] text-[9px] leading-[13.5px] font-medium uppercase tracking-[1.44px] text-[#173b5d]">
                      {article.tag}
                    </p>
                    <h3 className="max-w-[340px] text-[22px] leading-[1.2] tracking-[-0.55px] font-medium text-[#102b43]">
                      {article.title}
                    </h3>
                  </div>
                  <span className=" text-[#173b5d]" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-up-right"
                      aria-hidden="true"
                    >
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-[calc(100%-48px)] max-w-[1360px] grid-cols-1 gap-6 border-b border-[#c6d9e7] py-[56px] md:w-[calc(100%-88px)] md:py-[65px] sm:grid-cols-[1fr_1.7fr_1fr] sm:items-center sm:gap-8">
          <p className="text-[10px] leading-[15px] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
            VOTRE ESPACE ÉTUDIANT
          </p>
          <p className="text-[26px] leading-[1.3] tracking-[-0.78px] text-[#102b43] md:text-[24px] md:leading-[1.35] md:tracking-[-0.72px]">
            Des outils pour organiser.
            <br />
            Des humains pour conseiller.
          </p>
          <Link
            href="/login"
            className="mt-[20px] h-[44px] text-[13px] text-[#102b43] font-medium gap-[15px] flex items-center justify-start underline decoration-[#c6d9e7] underline-offset-6 sm:justify-end"
          >
            <span>Ouvrir Mon Dossier</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-right"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </section>

        <section className="mx-auto w-[calc(100%-48px)] max-w-[1360px] pt-[60px] pb-16 md:w-[calc(100%-88px)]">
          <div className="relative grid min-h-[300px] overflow-hidden rounded-[28px] bg-[#173b5d] px-8 py-10 text-white md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-[60px] md:py-[56px]">
            <div className="relative z-10 max-w-[560px]">
              <h2 className="max-w-[540px] text-[34px] leading-[1.15] tracking-[-1.3741px] font-medium md:text-[40px]">
                Votre projet mérite plus qu&apos;une liste d&apos;universités.
              </h2>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#ffffffb8]">
                Commençons par comprendre où vous voulez aller.
              </p>
              <div className="mt-[30px] flex flex-wrap gap-[14px] max-md:flex-col max-md:items-stretch">
                <a
                  href="mailto:hello@eef.fr"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#ffffff] px-[22px] transition-colors hover:bg-[#eaf2f7] max-md:w-full"
                >
                  <span className="flex items-center gap-2.5 text-[13px] font-medium text-[#193e5f]">
                    Parler à un conseiller
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </a>
                <Link
                  href="/register"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/50 px-[22px] transition-colors hover:bg-white/10 max-md:w-full"
                >
                  <span className="flex items-center gap-2.5 text-[13px] font-medium text-[#ffffff]">
                    Découvrir Procédure EEF
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-arrow-right"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -right-20 top-1/2 flex size-[360px] -translate-y-1/2 items-center justify-center sm:-right-8 md:size-[480px]"
              aria-hidden="true"
            >
              <div className="absolute size-full rounded-full border border-white/10" />
              <div className="absolute size-[78%] rounded-full border border-white/10" />
              <div className="absolute size-[49%] rounded-full border border-white/10" />
              <div className="relative flex size-[100px] items-center justify-center rounded-full border border-white/15 bg-white/[0.07]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.logoMark}
                  alt=""
                  className="absolute left-1/2 top-1/2 w-[80px] -translate-x-1/2 -translate-y-1/2 transform object-contain opacity-90 brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative isolate overflow-hidden border-t border-[#c6d9e7] bg-[linear-gradient(180deg,#f5fafd,#f5fafd_32%,#e7f1fb_70%,#d8e8f7)]">
        <div className="relative z-10 mx-auto w-[calc(100%-48px)] max-w-[1360px] pt-[96px] pb-[200px] max-md:pt-[60px] max-md:pb-[120px] md:w-[calc(100%-88px)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-[60px] xl:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.6fr)]">
            <div>
              <Link href="/" aria-label="Procédure EEF — Accueil">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ASSETS.logo} alt="eef" className="h-[32px] w-auto" />
              </Link>
              <p className="mt-[22px] max-w-[270px] text-[15px] font-medium leading-[1.75] text-[#102b43]">
                Votre projet d&apos;études en France, accompagné de A à Z.
              </p>
              <a
                className="mt-5 inline-flex items-center gap-[7px] text-[14px] text-[#5e7282]"
                href="mailto:hello@eef.fr"
              >
                Nous écrire
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-up-right"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>
              <div
                className="mt-[26px] flex gap-[14px]"
                aria-label="Réseaux sociaux"
              >
                <span
                  className="flex size-10 items-center justify-center rounded-full border border-[#c6d9e7] bg-white/50 text-[#102b43]"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-instagram"
                    aria-hidden="true"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </span>
                <span
                  className="flex size-10 items-center justify-center rounded-full border border-[#c6d9e7] bg-white/50 text-[#102b43]"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-linkedin"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </span>
                <span
                  className="flex size-10 items-center justify-center rounded-full border border-[#c6d9e7] bg-white/50 text-[#102b43]"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-twitter"
                    aria-hidden="true"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </span>
              </div>
            </div>

            <a
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 justify-self-start rounded-full bg-[#193e5f] px-7 text-[13px] font-medium text-white transition-colors hover:bg-[#25577f] lg:justify-self-center"
              href="mailto:hello@eef.fr"
            >
              <span className="text-white flex items-center gap-2.5">
                Parler à un conseiller
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-arrow-up-right"
                aria-hidden="true"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
              </span>
            </a>

            <div className="flex min-w-0 flex-wrap justify-end gap-x-[44px] gap-y-8 max-md:grid max-md:grid-cols-2 max-md:justify-end max-md:gap-x-[44px] max-md:gap-y-8 lg:col-span-2 lg:self-start xl:col-span-1">
              <nav
                aria-label="S'orienter"
                className="flex min-w-0 flex-col items-start gap-1"
              >
                <p className="mb-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#102b43]">
                  S&apos;orienter
                </p>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="#parcours"
                >
                  Orientation
                </a>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="#parcours"
                >
                  Formations
                </a>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="#parcours"
                >
                  Universités
                </a>
              </nav>
              <nav
                aria-label="Candidater"
                className="flex min-w-0 flex-col items-start gap-1"
              >
                <p className="mb-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#102b43]">
                  Candidater
                </p>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="#dossier"
                >
                  Stratégie
                </a>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="#dossier"
                >
                  Dossier
                </a>
                <Link
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="/login"
                >
                  Procédure EEF
                </Link>
              </nav>
              <nav
                aria-label="S'installer"
                className="flex min-w-0 flex-col items-start gap-1"
              >
                <p className="mb-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#102b43]">
                  S&apos;installer
                </p>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="#installation"
                >
                  Logement
                </a>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="#installation"
                >
                  Démarches
                </a>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="#installation"
                >
                  Vie en France
                </a>
              </nav>
              <nav
                aria-label="Procédure EEF"
                className="flex min-w-0 flex-col items-start gap-1"
              >
                <p className="mb-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#102b43]">
                  Procédure EEF
                </p>
                <Link
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="/login"
                >
                  Espace étudiant
                </Link>
                <Link
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="/register"
                >
                  Commencer
                </Link>
                <a
                  className="py-1 text-[13px] leading-6 text-[#5e7282] hover:text-[#102b43]"
                  href="mailto:hello@eef.fr"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-4 border-t border-[#c6d9e7] pt-[26px] md:flex-row md:items-center md:justify-between">
            <p className="text-[11px] leading-[19.25px] text-[#5e7282]">
              © 2026 Procédure EEF
            </p>
            <nav
              aria-label="Informations légales"
              className="flex flex-wrap gap-x-6 gap-y-2 text-[#5e7282] text-[11px] leading-[19.25px] max-md:gap-x-5"
            >
              <a href="#" className="hover:text-[#102b43]">
                Mentions légales
              </a>
              <a href="#" className="hover:text-[#102b43]">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-[#102b43]">
                Conditions
              </a>
              <a href="#" className="hover:text-[#102b43]">
                Cookies
              </a>
            </nav>
          </div>
          <p className="relative z-10 mt-[18px] max-w-[700px] text-[11px] leading-[19.25px] text-[#5e7282]/85">
            Procédure EEF est un service indépendant et n&apos;est pas affilié à
            Campus France ou au gouvernement français.
          </p>
        </div>
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 bottom-[2em] select-none font-display text-[min(40vw,580px)] leading-[0.8] font-semibold text-[#d5e5f1]/70 tracking-[-29px]"
          aria-hidden="true"
        >
          eef
        </span>
      </footer>
    </div>
  );
}
