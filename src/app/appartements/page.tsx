"use client";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import Link from "next/link";
import { useState } from "react";

const ASSETS = {
    logoMark: "/marketing/assets/img-008.png",
};

function IconArrowRight() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

const PROFILE_ITEMS = [
    [
        "CV",
        "Présenter clairement votre parcours académique, vos expériences et vos compétences.",
    ],
    [
        "Lettre de motivation",
        "Expliquer pourquoi cette formation correspond à votre projet.",
    ],
    [
        "Projet d'études",
        "Relier votre passé académique, votre choix actuel et votre objectif futur.",
    ],
    [
        "Pièces académiques",
        "Relevés, diplômes, attestations et autres justificatifs nécessaires.",
    ],
    [
        "Documents complémentaires",
        "Certifications linguistiques, traductions ou autres éléments demandés selon la candidature.",
    ],
] as const;

const APARTMENT_FILTERS = [
    ["Ville", ["Paris", "Lyon", "Lille", "Toulouse", "Bordeaux", "Nice"]],
    ["Type", ["Studio", "T1", "Colocation", "Résidence étudiante"]],
    ["Budget mensuel", ["≤ 700 €", "≤ 900 €", "≤ 1 200 €"]],
] as const;

const TRUST_POINTS = [
    ["Statuts affichés", "Vérifié, annonce externe ou vérification en cours : chaque annonce porte son statut."],
    ["Paiements traçables", "Jamais de paiement hors canal approuvé. Dépôts et frais visibles avant toute réservation."],
    ["Signaux d'alerte", "Loyer anormalement bas, pression pour payer vite, refus de visite : apprenez à reconnaître les signaux d'alerte."],
] as const;

const orientationWrap =
    "mx-auto w-[calc(100%-2.5rem)] max-w-[1350px] lg:w-[calc(100%-8rem)]";

const page = () => {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

    function selectFilter(group: string, option: string) {
        setSelectedFilters((current) => ({ ...current, [group]: option }));
    }

    return (
        <MarketingShell>
            {/* Hero */}
            <section className={`${orientationWrap} pt-[32px] lg:pt-[53px]`}>
                <nav
                    className="mb-[35px] lg:mb-[55px] text-[10px] leading-[15.5px] text-[#5e7282]"
                    aria-label="Fil d'Ariane"
                >
                    <Link href="/" className="transition">
                        Accueil
                    </Link>
                    <span className="mx-3">/</span>
                    <span className="">Appartements</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
                    Appartements
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[800px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Votre logement se prépare avant le départ.
                    </h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            Comprendre les quartiers, définir votre budget et préparer votre dossier locatif : nous vous aidons à organiser votre recherche. Aucune attribution de logement n'est garantie.
                        </p>
                    </div>
                </div>

                <div className="relative mt-[65px] overflow-hidden rounded-[28px] bg-eef-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/city.webp"
                        alt="Étudiante cherchant un livre dans une bibliothèque"
                        className="h-[435px] min-h-[321px] w-full object-[center_45%] object-cover max-md:min-h-50"
                    />
                    <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[9px] bg-[#f5fafd] px-4.5 py-[13px] text-[9px] uppercase tracking-[1.17px] text-[#102B43]">
                        COMPRENDRE. CHOISIR. AVANCER.
                    </span>
                </div>
            </section>

            {/* Apartment search */}
            <section className={`${orientationWrap} pt-[45px] md:pt-[70px]`}>
                <div className="grid rounded-[26px] border border-[#c6d9e7] bg-white p-6 md:grid-cols-3 gap-5">
                    {APARTMENT_FILTERS.map(([label, options]) => (
                        <div key={label}>
                            <p className="m-0 mb-[7px] text-[11.5px] leading-[17.81px] font-bold uppercase tracking-[0.92px] text-[#5e7282]">{label}</p>
                            <div className="flex flex-wrap gap-2">
                                {options.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        aria-pressed={selectedFilters[label] === option}
                                        onClick={() => selectFilter(label, option)}
                                        className={`cursor-pointer rounded-full border px-3.5 py-[7px] text-[12.5px] font-semibold transition ${selectedFilters[label] === option
                                                ? "border-[#102b43] bg-[#102b43] text-white"
                                                : "border-[#c6d9e7] bg-white text-[#5e7282] hover:border-[#63a8d8] hover:text-[#63a8d8]"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex min-h-[389px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#2527252e] bg-white/60 px-8 py-16 text-center">
                    <div className="flex size-14 items-center justify-center rounded-[16px] bg-[#e4eff6] text-[#63a8d8]" aria-hidden>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-6 w-6" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                    </div>
                    <h2 className="mt-5 m-0 text-[27px] leading-[1.2] font-medium tracking-[-0.945px] text-[#102B43]">Aucune annonce vérifiée pour l&apos;instant</h2>
                    <p className="mt-2 m-0 max-w-[512px] text-[15px] font-normal leading-[1.75] text-[#5e7282]">
                        Chaque logement est vérifié (propriétaire, loyer, charges, dépôt, garant) avant publication. Les annonces vérifiées apparaîtront ici — jamais d&apos;annonces douteuses.
                    </p>
                    <Link href="/faq" className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-eef-navy px-4.5 text-[13.5px] font-medium text-white transition hover:bg-eef-ink">
                        Lire : louer sans se faire arnaquer
                    </Link>
                </div>
            </section>

            {/* Student protection */}
            <section id="protection-etudiante" className={`${orientationWrap} py-[72px]`}>
                <p className="m-0 mb-[16px] text-[11px] font-medium uppercase tracking-[1.76px] text-[#173b5d]">Protection étudiante</p>
                <h2 className="m-0 max-w-[12em] text-[clamp(34px,5.4vw,60px)] font-medium leading-[1.12] tracking-[-2.7px] text-[#102B43]">La confiance fait partie du produit logement.</h2>
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {TRUST_POINTS.map(([title, description]) => (
                        <article key={title} className="p-[28px]">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#63a8d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-6 w-6" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                            <h3 className="m-0 mt-3 text-[18px] leading-[28px] tracking-[-0.63px] font-medium text-[#102B43]">{title}</h3>
                            <p className="mt-2 m-0 text-[14px] leading-[1.75] text-[#5e7282]">{description}</p>
                        </article>
                    ))}
                </div>
            </section>

        </MarketingShell>
    );
};

export default page;
