"use client";

import Link from "next/link";
import { useState } from "react";
import "@/styles/marketing.css";

const ASSETS = {
  logo: "/marketing/assets/img-001.png",
  advisor: "/marketing/assets/img-002.webp",
  conversation: "/marketing/assets/img-003.webp",
  student: "/marketing/assets/img-004.webp",
  library: "/marketing/assets/img-005.webp",
  campus: "/marketing/assets/img-006.webp",
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
  { title: "Programme", desc: "Que vais-je réellement étudier ?" },
  { title: "Adéquation", desc: "Mon profil correspond-il aux prérequis ?" },
  { title: "Sélectivité", desc: "Quel niveau de candidature est réaliste ?" },
  { title: "Budget", desc: "Frais de scolarité et coût de la ville." },
  { title: "Localisation", desc: "Quel environnement étudiant me correspond ?" },
  { title: "Débouchés", desc: "Que permet réellement cette formation ?" },
];

const STRATEGY = [
  {
    title: "Ambitieuse",
    desc: "Des formations plus sélectives qui correspondent à votre projet et méritent d'être tentées.",
  },
  {
    title: "Réaliste",
    desc: "Des candidatures cohérentes avec votre dossier académique et votre profil.",
  },
  {
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
    <div className="public-site">
      <header className="ed-header">
        <div className="ed-nav-inner">
          <Link href="/" className="ed-logo" aria-label="Procédure EEF — Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.logo} alt="eef" />
          </Link>

          <nav className="ed-desktop-nav" aria-label="Navigation principale">
            {["S'orienter", "Candidater", "S'installer", "Comprendre"].map((label) => (
              <div className="ed-nav-group" key={label}>
                <button type="button">
                  {label}
                  <IconChevron />
                </button>
              </div>
            ))}
          </nav>

          <div className="ed-desktop-actions">
            <Link href="/login" className="ed-student-link">
              Espace étudiant <IconArrow />
            </Link>
            <a href="mailto:hello@eef.fr" className="ed-button">
              Parler à un conseiller <IconArrow />
            </a>
          </div>

          <button
            type="button"
            className="ed-mobile-toggle"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <IconMenu />
          </button>
        </div>

        <div className={`ed-mobile-menu${menuOpen ? " open" : ""}`}>
          <Link href="/login" onClick={() => setMenuOpen(false)}>
            Espace étudiant
          </Link>
          <Link href="/register" onClick={() => setMenuOpen(false)}>
            Commencer
          </Link>
          <a href="mailto:hello@eef.fr">Parler à un conseiller</a>
        </div>
      </header>

      <main>
        <section className="ed-hp-hero ed-wrap">
          <h1 className="ed-hp-title">
            {"Construisez votre projet d'études"}
            <br />
            <Link href="/register" className="ed-hp-chip">
              <IconSearch />
              Trouver ma voie
            </Link>
            {" en France avec "}
            <a
              href="mailto:hello@eef.fr"
              className="ed-hp-avatar"
              aria-label="Parler à un conseiller"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.advisor} alt="" />
            </a>
            {" un\u00A0conseiller humain."}
          </h1>

          <p className="ed-hp-subtitle">
            Orientation, formations, candidatures et installation — un accompagnement
            humain à chaque étape.
          </p>

          <nav className="ed-hp-tabs" aria-label="Étapes du parcours">
            <a href="#parcours">Orientation</a>
            <span aria-hidden />
            <a href="#parcours" className="active">
              Formations
            </a>
            <span aria-hidden />
            <a href="#dossier">Candidature</a>
            <span aria-hidden />
            <a href="#installation">Installation</a>
          </nav>

          <div className="ed-hp-cta">
            <a href="#parcours" className="ed-hp-pill ed-hp-pill-light">
              <IconRoute />
              Parcours de A à Z
            </a>
            <Link href="/login" className="ed-hp-pill ed-hp-pill-dark">
              Espace étudiant
            </Link>
            <a href="mailto:hello@eef.fr" className="ed-hp-pill ed-hp-pill-primary">
              Parler à un conseiller
              <IconArrow />
            </a>
          </div>

          <div className="ed-hp-foot">
            <div className="ed-hp-avatars" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.advisor} alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.conversation} alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.student} alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.library} alt="" />
            </div>
            <p className="ed-hp-foot-label">Un accompagnement humain, pas un algorithme.</p>
          </div>
        </section>

        <section className="ed-section ed-wrap ed-journey" id="parcours">
          <div className="ed-journey-intro">
            <p className="ed-eyebrow">01 — DE A À Z</p>
            <h2>
              Votre parcours,
              <br />
              étape par étape.
            </h2>
            <p>
              Chaque étape influence la suivante. Nous construisons donc votre projet dans
              le bon ordre plutôt que de commencer directement par les candidatures.
            </p>
          </div>
          <div className="ed-numbered-rows">
            {JOURNEY.map((step) => (
              <div className="ed-numbered-row" key={step.n}>
                <span className="ed-step-number">{step.n}</span>
                <div>
                  <h3>
                    <a href="#dossier">
                      {step.title} <IconArrow />
                    </a>
                  </h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ed-section ed-wrap">
          <p className="ed-eyebrow">02 — TOUT COMMENCE PAR VOUS</p>
          <h2>Vous ne savez pas encore exactement quoi étudier ? C&apos;est là que tout commence.</h2>
          <p>Avant de parler d&apos;universités, nous prenons le temps de comprendre votre profil.</p>
          <div className="ed-feature-grid cols-4">
            {PROFILE.map((item) => (
              <article className="ed-feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ed-section ed-wrap ed-split">
          <div>
            <p className="ed-eyebrow">03 — UN ACCOMPAGNEMENT HUMAIN</p>
            <h2>Une vraie personne qui connaît votre dossier.</h2>
            <p>
              Votre conseiller apprend à connaître votre parcours, vos hésitations et vos
              objectifs avant de vous orienter.
            </p>
            <p>
              La technologie organise les informations et votre progression. Elle ne
              remplace pas la réflexion, le conseil ou la discussion.
            </p>
            <p>
              <strong>Votre projet n&apos;est pas généré automatiquement. Il est construit avec vous.</strong>
            </p>
          </div>
          <div className="ed-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.conversation} alt="Échange avec un conseiller" />
          </div>
        </section>

        <section className="ed-section ed-wrap">
          <p className="ed-eyebrow">04 — CHOISIR AVEC MÉTHODE</p>
          <h2>Une université ne se résume pas à son nom.</h2>
          <p>
            Deux formations portant presque le même intitulé peuvent proposer des contenus,
            des niveaux de sélection, des coûts et des perspectives très différents.
          </p>
          <div className="ed-photo" style={{ marginTop: "1.75rem", minHeight: 320 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.campus} alt="Campus universitaire" />
          </div>
          <div className="ed-feature-grid cols-3">
            {UNI_CRITERIA.map((item) => (
              <article className="ed-feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ed-section ed-wrap">
          <p className="ed-eyebrow">05 — LA STRATÉGIE</p>
          <h2>Ne pas candidater au hasard.</h2>
          <p>
            Une bonne stratégie ne consiste pas à multiplier les candidatures. Elle
            consiste à construire une sélection cohérente.
          </p>
          <div className="ed-feature-grid cols-3">
            {STRATEGY.map((item) => (
              <article className="ed-feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ed-section ed-wrap ed-split" id="dossier">
          <div>
            <p className="ed-eyebrow">06 — VOTRE DOSSIER</p>
            <h2>Votre parcours doit être compris, pas simplement envoyé.</h2>
            <p>
              Un bon dossier relie votre parcours passé, votre choix de formation et votre
              projet futur de manière cohérente.
            </p>
            <ul className="ed-checklist">
              {DOSSIER_STEPS.map((step) => (
                <li key={step}>
                  <span className="dot" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ed-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.library} alt="Préparation du dossier" />
          </div>
        </section>

        <section className="ed-section ed-wrap" id="installation">
          <p className="ed-eyebrow">08 — ET APRÈS L&apos;ADMISSION ?</p>
          <h2>L&apos;admission n&apos;est pas la dernière étape.</h2>
          <div className="ed-feature-grid cols-4" style={{ marginTop: "1.75rem" }}>
            {AFTER.map((item) => (
              <article className="ed-feature-card" key={item.n}>
                <p className="ed-eyebrow">{item.n}</p>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
          <div className="ed-photo" style={{ marginTop: "1.75rem", minHeight: 300 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.city} alt="Vie en France" />
          </div>
        </section>

        <section className="ed-section ed-wrap">
          <p className="ed-eyebrow">LE JOURNAL EEF</p>
          <h2>Comprendre avant de décider.</h2>
          <div className="ed-articles">
            {ARTICLES.map((article) => (
              <a href="#parcours" key={article.title}>
                <div>
                  <p className="ed-eyebrow">{article.tag}</p>
                  <h3>{article.title}</h3>
                </div>
                <IconArrow />
              </a>
            ))}
          </div>
        </section>

        <section className="ed-workspace-link ed-wrap">
          <p className="ed-eyebrow">VOTRE ESPACE ÉTUDIANT</p>
          <p>
            Des outils pour organiser.
            <br />
            Des humains pour conseiller.
          </p>
          <Link href="/login" className="ed-text-link">
            Ouvrir Mon Dossier →
          </Link>
        </section>

        <section className="ed-final ed-wrap">
          <div className="ed-final-card">
            <div className="ed-final-copy">
              <h2>Votre projet mérite plus qu&apos;une liste d&apos;universités.</h2>
              <p>Commençons par comprendre où vous voulez aller.</p>
              <div className="ed-final-actions">
                <a href="mailto:hello@eef.fr" className="ed-final-btn ed-final-btn-primary">
                  Parler à un conseiller
                </a>
                <Link href="/register" className="ed-final-btn ed-final-btn-outline">
                  Commencer
                </Link>
              </div>
            </div>
            <div className="ed-final-art" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.logoMark} alt="" />
            </div>
          </div>
        </section>
      </main>

      <footer className="ed-footer">
        <div className="ed-wrap">
          <div className="ed-footer-grid">
            <div className="ed-footer-brand">
              <Link href="/" className="ed-footer-logo" aria-label="Procédure EEF — Accueil">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ASSETS.logo} alt="eef" />
              </Link>
              <p className="ed-footer-tagline">
                Votre projet d&apos;études en France, accompagné de A à Z.
              </p>
              <a className="ed-footer-mail" href="mailto:hello@eef.fr">
                Nous écrire <IconArrow />
              </a>
            </div>

            <div>
              <a className="ed-footer-cta" href="mailto:hello@eef.fr">
                Parler à un conseiller <IconArrow />
              </a>
            </div>

            <div className="ed-footer-nav">
              <nav aria-label="S'orienter">
                <p className="ed-footer-col-title">S&apos;orienter</p>
                <a href="#parcours">Orientation</a>
                <a href="#parcours">Formations</a>
                <a href="#parcours">Universités</a>
              </nav>
              <nav aria-label="Candidater">
                <p className="ed-footer-col-title">Candidater</p>
                <a href="#dossier">Stratégie</a>
                <a href="#dossier">Dossier</a>
                <Link href="/login">Procédure EEF</Link>
              </nav>
              <nav aria-label="S'installer">
                <p className="ed-footer-col-title">S&apos;installer</p>
                <a href="#installation">Logement</a>
                <a href="#installation">Démarches</a>
                <a href="#installation">Vie en France</a>
              </nav>
              <nav aria-label="Procédure EEF">
                <p className="ed-footer-col-title">Procédure EEF</p>
                <Link href="/login">Espace étudiant</Link>
                <Link href="/register">Commencer</Link>
                <a href="mailto:hello@eef.fr">Contact</a>
              </nav>
            </div>
          </div>

          <div className="ed-footer-legal">
            <p>© 2026 Procédure EEF</p>
            <nav aria-label="Informations légales">
              <a href="#">Mentions légales</a>
              <a href="#">Politique de confidentialité</a>
              <a href="#">Conditions</a>
              <a href="#">Cookies</a>
            </nav>
          </div>
          <p className="ed-footer-disclaimer">
            Procédure EEF est un service indépendant et n&apos;est pas affilié à Campus
            France ou au gouvernement français.
          </p>
        </div>
        <span className="ed-footer-mega" aria-hidden>
          eef
        </span>
      </footer>
    </div>
  );
}
