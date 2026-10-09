"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { FooterCta } from "@/components/marketing/FooterCta";

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
  "m-0 mb-[1.15rem] text-[10px] font-medium tracking-[0.16em] text-[#8aa4b8]";
export const sectionH2 =
  "m-0 font-medium text-eef-ink tracking-[-0.03em] leading-[1.14] text-[clamp(2rem,4vw,46px)]";
/** Marketing page hero titles — ~48px+ on phones, scales to desktop display size */
export const marketingHeroH1 =
  "font-medium leading-[1.06] tracking-[-0.03em] text-eef-ink text-[clamp(3rem,12.5vw,78px)]";
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
      { href: "/faq", label: "Faq" },
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

function IconClose() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m6 6 12 12M18 6 6 18" />
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
            aria-label="Procédure eef — Accueil"
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
            <Link href="/login" className={btnPrimary}>
              Parler à un conseiller <IconArrow />
            </Link>
          </div>

          <button
            type="button"
            className="ml-auto cursor-pointer border-0 bg-transparent p-1.5 text-eef-ink lg:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-[60] min-h-dvh overflow-y-auto bg-eef-mist px-7 pb-10 pt-8 lg:hidden">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Procédure eef — Accueil">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ASSETS.logo} alt="eef" className="h-10 w-[71px] object-contain" />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="inline-flex size-10 cursor-pointer items-center justify-center border-0 bg-transparent text-eef-ink"
              >
                <IconClose />
              </button>
            </div>

            <nav className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9" aria-label="Navigation mobile">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <p className="m-0 mb-5 text-[9px] font-medium tracking-[0.16em] text-eef-ink">
                    {item.label}
                  </p>
                  <div className="grid gap-4">
                    {item.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block text-[14px] leading-[1.45] text-eef-ink"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="mt-10 flex flex-col items-start gap-5 border-t border-eef-border pt-7">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-8 items-center gap-2 text-[12px] font-medium text-eef-ink"
              >
                Espace étudiant <IconArrow />
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={`${btnPrimary} min-h-[52px] w-fit px-7`}
              >
                Parler à un conseiller <IconArrow />
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f5fafd,#f5fafd_32%,#e7f1fb_70%,#d8e8f7)]">
        <div className="relative z-10 mx-auto w-[calc(100%-48px)] max-w-[1360px] pt-16 max-md:pt-12 md:w-[calc(100%-88px)]">
          <FooterCta />
        </div>
        <div
          className="relative z-10 mt-16 w-full border-t border-[#c6d9e7] lg:mt-20"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-[calc(100%-48px)] max-w-[1360px] pt-16 pb-[200px] max-md:pt-12 max-md:pb-[140px] md:w-[calc(100%-88px)] lg:pt-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-[60px]">
            <div className="shrink-0">
              <Link href="/" aria-label="Procédure eef — Accueil">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ASSETS.logo} alt="eef" className="h-[32px] w-auto" />
              </Link>
              <p className="mt-[22px] max-w-[270px] text-[15px] font-medium leading-[1.75] text-[#102b43]">
                Votre projet d&apos;études en France, accompagné de A à Z.
              </p>
              <Link
                className="mt-5 inline-flex min-h-[52px] w-full max-w-[280px] items-center justify-center gap-2.5 rounded-full bg-[#193e5f] px-7 text-[13px] font-medium text-white transition-colors hover:bg-[#25577f] sm:w-auto"
                href="/login"
              >
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
              </Link>
              <div
                className="mt-[26px] flex gap-[14px]"
                aria-label="Réseaux sociaux"
              >
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-[#c6d9e7] bg-white/50 text-[#102b43] transition-colors hover:border-[#102b43] hover:text-[#102b43]"
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
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-[#c6d9e7] bg-white/50 text-[#102b43] transition-colors hover:border-[#102b43] hover:text-[#102b43]"
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
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-[#c6d9e7] bg-white/50 text-[#102b43] transition-colors hover:border-[#102b43] hover:text-[#102b43]"
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
                </a>
              </div>
            </div>

            <div className="grid w-full min-w-0 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8 lg:w-auto lg:justify-items-start lg:gap-x-[44px] lg:gap-y-8">
              <nav
                aria-label="S'orienter"
                className="flex min-w-0 flex-col items-start"
              >
                <p className="mb-4 text-[11px] font-semibold leading-[1.75] tracking-[1.54px] text-[#173b5d]">
                  S&apos;orienter
                </p>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/orientation"
                >
                  Orientation
                </a>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/formations"
                >
                  Formations
                </a>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/universites"
                >
                  Universités
                </a>
              </nav>
              <nav
                aria-label="Candidater"
                className="flex min-w-0 flex-col items-start"
              >
                <p className="mb-4 text-[11px] font-semibold leading-[1.75] tracking-[1.54px] text-[#173b5d]">
                  Candidater
                </p>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/strategie-de-candidature"
                >
                  Stratégie
                </a>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/accompagnement-dossier"
                >
                  Dossier
                </a>
                <Link
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/procedure-eef"
                >
                  Procédure eef
                </Link>
              </nav>
              <nav
                aria-label="S'installer"
                className="flex min-w-0 flex-col items-start"
              >
                <p className="mb-4 text-[11px] font-semibold leading-[1.75] tracking-[1.54px] text-[#173b5d]">
                  S&apos;installer
                </p>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/appartements"
                >
                  Logement
                </a>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/visa"
                >
                  Démarches
                </a>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/vie-en-france"
                >
                  Vie en France
                </a>
              </nav>
              <nav
                aria-label="Procédure eef"
                className="flex min-w-0 flex-col items-start"
              >
                <p className="mb-4 text-[11px] font-semibold leading-[1.75] tracking-[1.54px] text-[#173b5d]">
                  Procédure eef
                </p>
                <Link
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/methode"
                >
                  À propos
                </Link>
                <Link
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/journal"
                >
                  Ressources
                </Link>
                <Link
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="/faq"
                >
                  Faq
                </Link>
                <a
                  className="text-[13px] leading-[2.3] text-[#5e7282] hover:text-[#102b43]"
                  href="mailto:info@etudesenfrance.org"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-[#c6d9e7] pt-[26px] max-md:mt-12 md:mt-20 md:flex-row md:items-center md:justify-between">
            <p className="text-[11px] leading-[19.25px] text-[#5e7282]">
              © 2026 Procédure eef
            </p>
            <nav
              aria-label="Informations légales"
              className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] leading-[19.25px] text-[#5e7282]"
            >
              <a href="mailto:hello@eef.fr?subject=Mentions%20l%C3%A9gales" className="hover:text-[#102b43]">
                Mentions légales
              </a>
              <a href="mailto:hello@eef.fr?subject=Politique%20de%20confidentialit%C3%A9" className="hover:text-[#102b43]">
                Politique de confidentialité
              </a>
              <a href="mailto:hello@eef.fr?subject=Conditions%20g%C3%A9n%C3%A9rales" className="hover:text-[#102b43]">
                Conditions
              </a>
              <a href="mailto:hello@eef.fr?subject=Politique%20cookies" className="hover:text-[#102b43]">
                Cookies
              </a>
            </nav>
          </div>
          <p className="relative z-10 mt-[18px] max-w-[700px] text-[11px] leading-[19.25px] text-[#5e7282]/85">
            Procédure eef est un service indépendant et n&apos;est pas affilié à
            Campus France ou au gouvernement français.
          </p>
        </div>
        <span
          className="pointer-events-none absolute bottom-[-40px] left-1/2 -translate-x-1/2 select-none font-display text-[min(55vw,580px)] leading-[0.8] font-semibold tracking-[-29px] text-[#173b5d]/10 sm:text-[#d5e5f1]/70 md:bottom-[-100px]"
          aria-hidden="true"
        >
          eef
        </span>
      </footer>
    </div>
  );
}
