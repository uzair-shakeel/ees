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
      { href: "/#orientation", label: "Orientation" },
      { href: "/#parcours", label: "Formations" },
      { href: "/#methode", label: "Universités" },
      { href: "/#parcours", label: "Bourses" },
    ],
  },
  {
    label: "Candidater",
    links: [
      { href: "/#strategie", label: "Stratégie de candidature" },
      { href: "/#dossier", label: "Préparer son dossier" },
      { href: "/#dossier", label: "Procédure Études en France" },
      { href: "/#methode", label: "Voies d'admission" },
    ],
  },
  {
    label: "S'installer",
    links: [
      { href: "/#installation", label: "Vie en France" },
      { href: "/#installation", label: "Logement" },
      { href: "/#installation", label: "Visa et démarches" },
      { href: "/#installation", label: "Budget étudiant" },
    ],
  },
  {
    label: "Comprendre",
    links: [
      { href: "/#parcours", label: "Ressources" },
      { href: "/#methode", label: "Notre méthode" },
      { href: "/#parcours", label: "FAQ" },
      { href: "/#accompagnement", label: "Communauté" },
      { href: "/carriere", label: "Carrière" },
      { href: "/#parcours", label: "Parents" },
    ],
  },
];

export function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
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

export function MarketingShell({ children }: { children: ReactNode }) {
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
              <p className="px-3.5 py-2 text-[12px] font-semibold text-eef-ink">{item.label}</p>
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
                className="mt-3.5 inline-flex cursor-pointer items-center gap-1 text-eef-deep"
              >
                Nous écrire <IconArrow />
              </a>
              <div className="mt-5 flex gap-2.5">
                {["in", "x"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-eef-border text-[11px] font-semibold uppercase text-eef-navy transition hover:bg-white"
                    aria-label={s === "in" ? "LinkedIn" : "X"}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <a
                href="mailto:hello@eef.fr"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-eef-navy px-5 py-3 text-[13px] font-medium text-white"
              >
                Parler à un conseiller <IconArrow />
              </a>
            </div>

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
                    ["/#parcours", "Ressources"],
                    ["/#parcours", "FAQ"],
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
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-eef-border pt-6 text-[12px] text-eef-secondary">
            <p className="m-0">© 2026 Procédure EEF</p>
            <nav aria-label="Informations légales" className="flex flex-wrap gap-4">
              <a href="#" className="cursor-pointer hover:text-eef-navy">
                Mentions légales
              </a>
              <a href="#" className="cursor-pointer hover:text-eef-navy">
                Politique de confidentialité
              </a>
              <a href="#" className="cursor-pointer hover:text-eef-navy">
                Conditions
              </a>
              <a href="#" className="cursor-pointer hover:text-eef-navy">
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
