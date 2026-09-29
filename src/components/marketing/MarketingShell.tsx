"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export const ASSETS = {
  logo: "/marketing/assets/img-001.png",
  advisor: "/marketing/assets/img-002.webp",
  conversation: "/marketing/assets/img-003.webp",
  student: "/marketing/assets/img-004.webp",
  library: "/marketing/assets/img-005.webp",
  campus: "/marketing/assets/img-006.PNG",
  city: "/marketing/assets/img-007.webp",
  logoMark: "/marketing/assets/img-008.png",
};

export const wrap =
  "mx-auto w-[calc(100%-2.5rem)] max-w-[1360px] lg:w-[calc(100%-8rem)]";
export const eyebrow =
  "m-0 mb-[1.15rem] text-[10px] font-medium uppercase tracking-[0.16em] text-[#8aa4b8]";
export const sectionH2 =
  "m-0 font-medium text-eef-ink tracking-[-0.03em] leading-[1.14] text-[clamp(2rem,4vw,46px)]";
export const bodyMuted = "m-0 text-[14px] leading-[1.65] text-eef-secondary";
export const btnPrimary =
  "inline-flex min-h-[43px] cursor-pointer items-center justify-center gap-3.5 rounded-full bg-eef-navy px-[19px] text-[13px] font-medium text-white transition hover:bg-eef-ink [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5";

export const NAV_ITEMS = [
  {
    label: "S'orienter",
    links: [
      { href: "/orientation", label: "Orientation" },
      { href: "/formations", label: "Formations" },
      { href: "/universites", label: "Universités" },
      { href: "/bourses", label: "Bourses" },
    ],
  },
  {
    label: "Candidater",
    links: [
      { href: "/strategie-de-candidature", label: "Stratégie de candidature" },
      { href: "/accompagnement-dossier", label: "Préparer son dossier" },
      { href: "/procedure-eef", label: "Procédure Études en France" },
      { href: "/admissions", label: "Voies d'admission" },
    ],
  },
  {
    label: "S'installer",
    links: [
      { href: "/vie-en-france", label: "Vie en France" },
      { href: "/appartements", label: "Logement" },
      { href: "/visa", label: "Visa et démarches" },
      { href: "/budget-etudiant", label: "Budget étudiant" },
    ],
  },
  {
    label: "Comprendre",
    links: [
      { href: "/journal", label: "Ressources" },
      { href: "/methode", label: "Notre méthode" },
      { href: "/faq", label: "FAQ" },
      { href: "/communaute", label: "Communauté" },
      { href: "/carriere", label: "Carrière" },
      { href: "/parents", label: "Parents" },
    ],
  },
];

export function IconArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <path d="M4 6h16" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MarketingShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-eef-mist text-eef-ink [&_a]:no-underline [&_img]:block [&_img]:max-w-full">
      <header className="sticky top-0 z-40 h-20 border-b border-eef-border bg-eef-mist">
        <div
          className={`${wrap} flex h-full max-w-[1512px] items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]`}
        >
          <Link
            href="/"
            className="shrink-0 justify-self-start"
            aria-label="Procédure EEF — Accueil"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.logo}
              alt="eef"
              className="h-10 w-[71px] object-contain"
            />
          </Link>

          <nav
            className="mx-auto hidden h-full items-center justify-center gap-[25px] lg:flex"
            aria-label="Navigation principale"
          >
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="group relative flex h-full items-center"
              >
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
                          <Link
                            key={link.label}
                            href={link.href}
                            className="flex cursor-pointer items-center justify-between rounded-[9px] px-3 py-3.5 text-[13px] text-eef-ink transition hover:bg-eef-mist hover:text-eef-navy"
                          >
                            {link.label}
                            <IconArrow />
                          </Link>
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
              <p className="px-3.5 py-2 text-[12px] font-semibold text-eef-ink">
                {item.label}
              </p>
              {item.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block cursor-pointer rounded-[10px] px-3.5 py-2.5 text-[14px] text-eef-secondary hover:bg-eef-soft hover:text-eef-navy"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer rounded-[10px] px-3.5 py-3 text-[15px] text-eef-ink hover:bg-eef-soft"
          >
            Espace étudiant
          </Link>
          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer rounded-[10px] px-3.5 py-3 text-[15px] text-eef-ink hover:bg-eef-soft"
          >
            Commencer
          </Link>
          <a
            href="mailto:hello@eef.fr"
            className="cursor-pointer rounded-[10px] px-3.5 py-3 text-[15px] text-eef-ink hover:bg-eef-soft"
          >
            Parler à un conseiller
          </a>
        </div>
      </header>

      <main>{children}</main>

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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </span>
            </a>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                {
                  title: "S'ORIENTER",
                  links: [
                    ["/#orientation", "Orientation"],
                    ["/#parcours", "Formations"],
                    ["/#methode", "Universités"],
                  ],
                },
                {
                  title: "CANDIDATER",
                  links: [
                    ["/#strategie", "Stratégie"],
                    ["/#dossier", "Dossier"],
                    ["/#dossier", "Procédure EEF"],
                  ],
                },
                {
                  title: "S'INSTALLER",
                  links: [
                    ["/#installation", "Logement"],
                    ["/#installation", "Démarches"],
                    ["/#installation", "Vie en France"],
                  ],
                },
                {
                  title: "PROCÉDURE EEF",
                  links: [
                    ["/#parcours", "À propos"],
                    ["/journal", "Ressources"],
                    ["/faq", "FAQ"],
                    ["mailto:hello@eef.fr", "Contact"],
                  ],
                },
              ].map((col) => (
                <nav key={col.title} aria-label={col.title} className="flex flex-col gap-2">
                  <p className="m-0 mb-1 text-[11px] font-semibold tracking-[0.08em] text-eef-ink">
                    {col.title}
                  </p>
                  {col.links.map(([href, label]) =>
                    href.startsWith("mailto:") ? (
                      <a
                        key={label}
                        href={href}
                        className="cursor-pointer text-[13px] text-eef-secondary hover:text-eef-navy"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        key={label}
                        href={href}
                        className="cursor-pointer text-[13px] text-eef-secondary hover:text-eef-navy"
                      >
                        {label}
                      </Link>
                    ),
                  )}
                </nav>
              ))}
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
          className="pointer-events-none absolute left-1/2 bottom-[-40px] md:top-1/2 -translate-x-1/2 md:bottom-[2em] select-none font-display text-[min(40vw,580px)] leading-[0.8] font-semibold text-[#d5e5f1]/70 tracking-[-29px]"
          aria-hidden="true"
        >
          eef
        </span>
      </footer>
    </div>
  );
}
