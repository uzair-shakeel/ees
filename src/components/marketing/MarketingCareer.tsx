"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  MarketingShell,
  ASSETS,
  wrap,
  btnPrimary,
  marketingHeroH1,
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
    desc: "Titre, profil, mots-clés et positionnement réseau.",
  },
  {
    title: "Lettres de motivation",
    desc: "Assistant de structuration par programme et par offre.",
  },
  {
    title: "Simulateur d'entretien",
    desc: "Questions types du marché français, avec retours.",
  },
  {
    title: "Suivi de candidatures",
    desc: "Stages et emplois : contacts, relances, statuts, résultats.",
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
        <nav className="mb-6 text-[12px] text-eef-secondary md:mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="cursor-pointer transition hover:text-eef-navy">
            Accueil
          </Link>
          <span className="mx-1.5 text-eef-border">/</span>
          <span className="text-eef-ink">Carrière</span>
        </nav>

        <p className="m-0 mb-[10px] text-[9px] font-medium tracking-[0.16em] text-eef-blue">
          Carrière
        </p>

        <div className="grid min-w-0 items-start gap-5 md:gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-24">
          <h1 className={`m-0 max-w-none ${marketingHeroH1} md:max-w-[11em] lg:max-w-[9em]`}>
            Votre diplôme n&apos;est pas la ligne d&apos;arrivée.
          </h1>
          <p className="m-0 max-w-[28rem] text-[15px] leading-[1.65] text-eef-secondary md:text-[16px] lg:justify-self-end lg:pt-2">
            Analyseur de CV ATS, préparation d&apos;entretiens, suivi de candidatures de
            stage et d&apos;emploi : transformez vos études en France en carrière en France.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[22px] bg-eef-soft md:mt-12 md:rounded-[28px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSETS.student}
            alt="Étudiant travaillant sur un ordinateur"
            className="aspect-[4/3] min-h-[180px] w-full object-cover sm:aspect-[16/10] sm:min-h-[200px] md:aspect-[21/9] md:min-h-[240px]"
          />
          <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center rounded-[10px] bg-white/95 px-3 py-1.5 text-[8px] font-semibold tracking-[0.1em] text-eef-navy shadow-[0_2px_12px_rgba(16,43,67,0.08)] backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-3.5 sm:text-[9px] sm:tracking-[0.12em] md:bottom-5 md:left-5 md:px-4 md:py-2 md:tracking-[0.14em]">
            Comprendre. Choisir. Avancer.
          </span>
        </div>
      </section>

      {/* ATS Analyzer */}
      <section className={`${wrap} py-14 md:py-20`}>
        <p className="mb-8 text-center text-[10px] font-medium tracking-[0.2em] text-[#8aa4b8] md:mb-10">
          Comprendre · Choisir · Avancer
        </p>

        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <form
            onSubmit={analyze}
            className="min-w-0 rounded-[22px] border border-eef-border bg-white p-5 shadow-[0_12px_40px_rgba(16,43,67,0.06)] sm:p-6 md:rounded-[28px] md:p-7"
          >
            <p className="m-0 text-[10px] font-semibold tracking-[0.16em] text-eef-navy">
              Analyseur de CV ATS
            </p>

            <div className="mt-6 md:mt-7">
              <p className="m-0 mb-3 text-[10px] font-semibold tracking-[0.14em] text-eef-secondary">
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
                      className={`cursor-pointer rounded-full border px-3 py-1.5 text-[12px] font-medium transition sm:px-3.5 sm:py-2 sm:text-[13px] ${ active ? "border-eef-navy bg-eef-navy text-white" : "border-eef-border bg-white text-eef-ink hover:border-eef-navy hover:bg-eef-mist" }`}
                    >
                      {job}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 md:mt-7">
              <label
                htmlFor="cv-text"
                className="mb-3 block text-[10px] font-semibold tracking-[0.14em] text-eef-secondary"
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
                rows={8}
                placeholder="Collez ici le contenu de votre CV (texte brut)…"
                className="min-h-[10rem] w-full resize-y rounded-2xl border border-eef-border bg-eef-mist/40 px-3.5 py-3 text-[14px] leading-relaxed text-eef-ink outline-none transition placeholder:text-eef-secondary/70 focus:border-eef-blue focus:bg-white sm:min-h-[12rem] sm:px-4 sm:py-3.5"
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

          <div className="min-w-0 lg:pt-6">
            <div className="text-eef-blue">
              <IconSparkle />
            </div>
            <h2 className="mt-3 m-0 max-w-[16em] text-[clamp(1.35rem,4.5vw,27px)] font-semibold leading-snug tracking-[-0.02em] text-eef-ink md:mt-4">
              Compatibilité ATS, format, mots-clés, impact.
            </h2>
            <p className="mt-3 m-0 max-w-[28rem] text-[14px] leading-[1.55] text-eef-secondary md:mt-4 md:text-[15px]">
              Analyse déterministe de structure et de couverture de mots-clés selon
              votre poste cible — avec des actions concrètes, pas des généralités.
            </p>
          </div>
        </div>
      </section>

      {/* Beyond CV */}
      <section className={`${wrap} mt-12 pb-20 max-md:pb-14 md:mt-[60px] md:pb-24`}>
        <p className="m-0 mb-[10px] text-[11px] font-medium tracking-[0.16em] text-[#8aa4b8]">
          La suite
        </p>
        <h2 className="m-0 text-[clamp(2rem,8vw,60px)] font-semibold leading-[1.15] tracking-[-0.02em] text-eef-ink">
          Au-delà du CV.
        </h2>

        <div className="mt-8 grid min-w-0 gap-x-8 gap-y-8 md:mt-10 md:grid-cols-2 md:gap-y-10 lg:grid-cols-4 lg:gap-10">
          {NEXT_TOOLS.map((item) => (
            <article key={item.title} className="flex min-w-0 flex-col">
              <h3 className="m-0 text-[clamp(1.25rem,4vw,27px)] font-semibold tracking-[-0.02em] text-eef-ink">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 m-0 text-[14px] leading-[1.55] text-eef-secondary md:mt-2.5">
                {item.desc}
              </p>
              <span className="mt-4 inline-flex w-fit rounded-full bg-[#e8eef4] px-3 py-1.5 text-[11px] font-medium text-eef-secondary md:mt-5">
                Bientôt disponible
              </span>
            </article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
