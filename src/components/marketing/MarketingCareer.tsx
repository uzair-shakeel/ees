"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  MarketingShell,
  wrap,
  eyebrow,
  sectionH2,
  bodyMuted,
  btnPrimary,
} from "@/components/marketing/MarketingShell";

const JOB_TARGETS = [
  "Finance",
  "Data",
  "Informatique",
  "Ingénierie",
  "Marketing",
  "Droit",
  "Autre",
] as const;

const NEXT_TOOLS = [
  {
    title: "Revue LinkedIn",
    desc: "Optimisez votre profil pour attirer recruteurs et opportunités pertinentes.",
  },
  {
    title: "Lettres de motivation",
    desc: "Des modèles structurés pour expliquer votre projet avec clarté.",
  },
  {
    title: "Simulateur d'entretien",
    desc: "Préparez vos réponses aux questions les plus fréquentes.",
  },
  {
    title: "Suivi de candidatures",
    desc: "Organisez vos démarches et ne perdez plus aucune échéance.",
  },
];

function IconSparkle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2.5 13.2 8.3 19 9.5 13.2 10.7 12 16.5 10.8 10.7 5 9.5 10.8 8.3 12 2.5Z"
        fill="#63a8d8"
      />
      <path
        d="M18.5 14.5 19.1 17.2 21.8 17.8 19.1 18.4 18.5 21.1 17.9 18.4 15.2 17.8 17.9 17.2 18.5 14.5Z"
        fill="#9ec4df"
      />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}

export function MarketingCareer() {
  const [target, setTarget] = useState<(typeof JOB_TARGETS)[number]>("Autre");
  const [cvText, setCvText] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function analyze(e: FormEvent) {
    e.preventDefault();
    setStatus("done");
  }

  return (
    <MarketingShell>
      {/* Hero */}
      <section className={`${wrap} pt-10 pb-16 max-md:pb-12`}>
        <nav className="mb-8 text-[12px] text-eef-secondary" aria-label="Fil d'Ariane">
          <Link href="/" className="cursor-pointer transition hover:text-eef-navy">
            Accueil
          </Link>
          <span className="mx-1.5 text-eef-border">/</span>
          <span className="text-eef-ink">Carrière</span>
        </nav>

        <p className={eyebrow}>CARRIÈRE</p>

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16 lg:gap-24">
          <h1 className="m-0 max-w-[11em] text-[clamp(2rem,4.5vw,46px)] font-medium leading-[1.12] tracking-[-0.03em] text-eef-ink">
            Votre diplôme n&apos;est pas la ligne d&apos;arrivée.
          </h1>
          <p className={`${bodyMuted} max-w-[28rem] md:justify-self-end md:pt-2`}>
            Une fois le diplôme en poche, le vrai travail commence. Analyseur de CV ATS,
            préparation d&apos;entretiens, stratégie LinkedIn — des outils concrets pour
            transformer votre formation en carrière.
          </p>
        </div>

        <div className="mt-12 flex min-h-[220px] items-center justify-center rounded-[28px] border border-dashed border-eef-border bg-[#edf4f9] px-6 py-16 text-center max-md:mt-8 max-md:min-h-[160px] max-md:rounded-[22px]">
          <p className="m-0 max-w-md text-[14px] text-eef-secondary">
            [Illustration du parcours étudiant en France]
          </p>
        </div>
      </section>

      {/* ATS Analyzer */}
      <section className={`${wrap} py-20 max-md:py-14`}>
        <p className="mb-10 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#8aa4b8]">
          Comprendre · Choisir · Avancer
        </p>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <form
            onSubmit={analyze}
            className="rounded-[28px] border border-eef-border bg-white p-7 shadow-[0_12px_40px_rgba(16,43,67,0.06)] max-md:rounded-[22px] max-md:p-5"
          >
            <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-eef-navy">
              Analyseur de CV ATS
            </p>

            <div className="mt-7">
              <p className="m-0 mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-eef-secondary">
                Poste cible
              </p>
              <div className="flex flex-wrap gap-2">
                {JOB_TARGETS.map((job) => {
                  const active = target === job;
                  return (
                    <button
                      key={job}
                      type="button"
                      onClick={() => setTarget(job)}
                      className={`cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                        active
                          ? "border-eef-navy bg-eef-navy text-white"
                          : "border-eef-border bg-white text-eef-ink hover:border-eef-navy hover:bg-eef-mist"
                      }`}
                    >
                      {job}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-7">
              <label
                htmlFor="cv-text"
                className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.14em] text-eef-secondary"
              >
                Collez le texte de votre CV
              </label>
              <textarea
                id="cv-text"
                value={cvText}
                onChange={(e) => {
                  setCvText(e.target.value);
                  setStatus("idle");
                }}
                rows={9}
                placeholder="Collez ici le contenu de votre CV (texte brut)…"
                className="w-full resize-y rounded-2xl border border-eef-border bg-eef-mist/40 px-4 py-3.5 text-[14px] leading-relaxed text-eef-ink outline-none transition placeholder:text-eef-secondary/70 focus:border-eef-blue focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className={`${btnPrimary} mt-5 w-full min-h-[52px] gap-2.5 text-[14px]`}
            >
              Analyser mon CV <IconDoc />
            </button>

            {status === "done" && (
              <p className="mt-4 rounded-xl bg-eef-mist px-4 py-3 text-[13px] leading-snug text-eef-navy">
                Analyse prête pour le poste <strong>{target}</strong>
                {cvText.trim()
                  ? ` — ${cvText.trim().split(/\s+/).length} mots détectés.`
                  : " — collez votre CV pour un diagnostic plus précis."}
              </p>
            )}
          </form>

          <div className="lg:pt-6">
            <IconSparkle />
            <h2 className="mt-4 m-0 max-w-[16em] text-[18px] font-semibold leading-snug tracking-[-0.02em] text-eef-ink">
              Compatibilité ATS, format, mots-clés, impact.
            </h2>
            <p className={`${bodyMuted} mt-4 max-w-[28rem]`}>
              Les recruteurs scannent d&apos;abord votre CV avec des logiciels ATS. Cet
              outil vous aide à vérifier la lisibilité, les mots-clés manquants et la
              structure — pour que votre profil arrive jusqu&apos;à un humain.
            </p>
          </div>
        </div>
      </section>

      {/* Beyond CV */}
      <section className={`${wrap} pb-24 pt-8 max-md:pb-16`}>
        <p className={eyebrow}>LA SUITE</p>
        <h2 className={sectionH2}>Au-delà du CV.</h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-10">
          {NEXT_TOOLS.map((item) => (
            <article key={item.title} className="flex flex-col border-t border-eef-border pt-6">
              <h3 className="m-0 text-[18px] font-semibold tracking-[-0.02em] text-eef-ink">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.55] text-eef-secondary">
                {item.desc}
              </p>
              <span className="mt-6 inline-flex w-fit rounded-full bg-[#e8eef4] px-3 py-1.5 text-[12px] font-medium text-eef-secondary">
                Bientôt disponible
              </span>
            </article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
