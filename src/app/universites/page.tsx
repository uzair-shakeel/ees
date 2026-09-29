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

const COMPARISON_ITEMS = [
    [
        "Cohérence académique",
        "Le programme correspond-il réellement à votre objectif ?",
    ],
    ["Sélectivité", "Votre parcours répond-il aux attentes publiées ?"],
    ["Environnement", "Grande métropole, ville étudiante ou campus plus calme ?"],
    ["Budget", "Frais de scolarité et coût de la vie."],
    [
        "Opportunités",
        "Stages, entreprises, réseau, recherche et poursuite d'études.",
    ],
    [
        "Expérience étudiante",
        "Organisation, campus, localisation et cadre de vie.",
    ],
] as const;

const FILTER_GROUPS = [
    ["Niveau", ["Licence", "Master", "Doctorat", "BUT", "MBA"]],
    [
        "Domaine",
        [
            "Informatique",
            "Commerce",
            "Ingénierie",
            "Droit",
            "Santé",
            "Arts",
            "Sciences",
        ],
    ],
    [
        "Ville",
        ["Paris", "Lyon", "Lille", "Toulouse", "Bordeaux", "Marseille", "Nice"],
    ],
    ["Établissement", ["Public", "Privé"]],
    ["Langue", ["Français", "Anglais", "Bilingue"]],
    ["Voie", ["EEF", "Parcoursup", "Mon Master", "eCandidat", "Directe"]],
] as const;

const orientationWrap =
    "mx-auto w-[calc(100%-2.5rem)] max-w-[1350px] lg:w-[calc(100%-8rem)]";

const page = () => {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({});
    const [filtersOpen, setFiltersOpen] = useState(false);

    function toggleFilter(label: string, option: string) {
        setSelectedFilters((current) => ({
            ...current,
            [label]: current[label] === option ? null : option,
        }));
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
                    <span className="">Universités</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
                    Universités
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[770px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Comparer les établissements avec les bons critères.
                    </h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            La meilleure université n&apos;est pas nécessairement la plus
                            connue. C&apos;est celle qui correspond le mieux à votre projet,
                            votre profil et vos contraintes.
                        </p>
                        <a
                            href="mailto:hello@eef.fr"
                            className="mt-[25px] inline-flex h-[52px] w-fit shrink-0 items-center justify-center gap-[21px] whitespace-nowrap rounded-full bg-eef-navy px-[26px] text-[13px] font-medium text-white transition hover:bg-eef-ink"
                        >
                            Construire ma shortlist{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
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
                    </div>
                </div>

                <div className="relative mt-[65px] overflow-hidden rounded-[28px] bg-eef-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/campus.webp"
                        alt="Façade d'une université française"
                        className="h-[435px] min-h-[321px] w-full object-[center_45%] object-cover max-md:min-h-50"
                    />
                    <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[9px] bg-[#f5fafd] px-4.5 py-[13px] text-[9px] uppercase tracking-[1.17px] text-[#102B43]">
                        Comparer. Choisir. S&apos;avancer.
                    </span>
                </div>
            </section>

            {/* Profile */}
            <section className={`${orientationWrap} py-[76px] sm:py-[88px]`}>
                <p className="m-0 mb-[23px] text-[10px] font-medium leading-[1.5] uppercase tracking-[1.6px] text-[#173b5d]">
                    Comparer avec méthode
                </p>
                <h2 className="m-0 max-w-[12em] text-[clamp(35px,5vw,58px)] font-medium leading-[1.1] tracking-[-2.565px] text-[#102b43]">
                    Au-delà du classement.
                </h2>
                <div className="mt-[28px] sm:mt-11 grid md:grid-cols-3">
                    {COMPARISON_ITEMS.map(([title, description], index) => (
                        <article
                            key={title}
                            className="relative py-5 pl-0 md:px-[36px] md:py-[26px] md:nth-[3n+1]:pl-0 md:nth-[3n]:pr-0 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[#c6d9e7] before:content-[''] md:before:inset-x-4 md:after:pointer-events-none md:after:absolute md:after:bottom-4 md:after:right-0 md:after:top-4 md:after:w-px md:after:bg-[#c6d9e7] md:after:content-[''] md:nth-[3n]:after:hidden"
                        >
                            <div className="flex items-start gap-4">
                                <span className="pt-[7px] text-[11px] font-medium tabular-nums text-[#63a8d8] w-[34px]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 className="m-0 text-[20px] font-medium leading-[1.2] tracking-[-0.7px] text-[#102b43]">
                                        {title}
                                    </h3>
                                    <p className="mt-2 m-0 max-w-[20rem] text-[13px] leading-[1.8] text-[#5e7282]">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Approach */}
            <section className={`${orientationWrap} py-[72px]`}>
                <div className="flex flex-col">
                    <div>
                        <p className="m-0 mb-[21px] sm:mb-[23px] text-[10px] leading-[1.5] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
                            La sélection
                        </p>
                        <h2 className="m-0 max-w-[11em] text-[clamp(40px,5.4vw,78px)] font-medium leading-[1.1] tracking-[-3.51px] text-[#102B43]">
                            Une shortlist. Pas une collection d&apos;écoles.
                        </h2>
                    </div>
                    <div className="pt-[26px]">
                        <p className="m-0 max-w-[780px] text-[15px] sm:text-[17px] leading-[1.75] text-[#5e7282]">
                            Chaque établissement retenu doit avoir une fonction dans votre
                            stratégie. Nous vous aidons à équilibrer ambition, cohérence
                            académique et budget, sans présenter aucune candidature comme
                            garantie.
                        </p>
                        <Link
                            href="/methode"
                            className="mt-[22px] underline underline-offset-4 h-11 inline-flex items-center gap-[15px] text-[13px] font-medium text-[#102b43] transition hover:text-eef-navy"
                        >
                            Comprendre la stratégie de candidature <IconArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Explorer */}
            <section className={`${orientationWrap} py-10`}>
                <div className="mb-10 flex items-end justify-between gap-4.5 max-md:flex-col max-md:items-start">
                    <h2 className="m-0 text-[clamp(40px,5.4vw,64px)] font-medium leading-[1.1] tracking-[-3px] text-[#102B43]">
                        Explorer les formations.
                    </h2>
                    <p className="m-0 max-w-[370px] text-[13px] leading-[1.75] text-[#5e7282]">
                        Seules les informations vérifiées à la source sont affichées. Le
                        catalogue reste vide tant que les données ne sont pas confirmées.
                    </p>
                </div>

                <div className="flex h-[58px] items-center gap-2 rounded-full border border-[#c6d9e7] bg-white py-2 pl-5 pr-2 shadow-[rgba(37,39,37,0.08)_0px_10px_30px_-12px] max-md:h-auto max-md:flex-wrap max-md:rounded-[18px] max-md:p-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2 max-md:basis-full max-md:px-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-search h-5 w-5 shrink-0 text-[#5e7282]"
                            aria-hidden="true"
                        >
                            <path d="m21 21-4.34-4.34"></path>
                            <circle cx="11" cy="11" r="8"></circle>
                        </svg>
                        <input
                            type="search"
                            placeholder="Rechercher une université, une école ou une formation"
                            className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-[#102B43] outline-none placeholder:text-[#9aabba]"
                            aria-label="Rechercher une université, une école ou une formation"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => setFiltersOpen(true)}
                        className="hidden h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-[#102b43] px-4 text-[13px] font-medium text-[#102b43] max-md:inline-flex"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="M4 6h16M7 12h10M10 18h4" />
                        </svg>
                        Filtres
                    </button>
                    <button
                        type="button"
                        className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-eef-navy px-4.5 text-[13.5px] font-medium text-white transition hover:bg-eef-ink"
                    >
                        Rechercher
                    </button>
                </div>

                <div className="mt-10 grid gap-12 md:grid-cols-[minmax(0,260px)_1fr]">
                    <div className="grid gap-6 max-md:hidden">
                        {FILTER_GROUPS.map(([label, options]) => (
                            <div key={label}>
                                <p className="m-0 mb-[7px] text-[11.5px] leading-[17.81px] font-bold uppercase tracking-[0.92px] text-[#5e7282]">
                                    {label}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {options.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            aria-pressed={selectedFilters[label] === option}
                                            onClick={() => toggleFilter(label, option)}
                                            className={`cursor-pointer rounded-full border px-3.5 py-[7px] leading-[100%] text-[12.5px] h-[35.38px] font-semibold transition ${
                                                selectedFilters[label] === option
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
                        <p className="m-0 mt-2 max-w-[260px] text-[12px] leading-[1.75] text-[#5e7282]">
                            Procédure EEF n&apos;affiche que des formations vérifiées à la
                            source (statuts VÉRIFIÉ / EN REVUE / MANQUANT). Aucune donnée
                            d&apos;établissement n&apos;est inventée.
                        </p>
                    </div>
                    <div className="flex min-h-[360px] justify-center py-20 text-[16px] text-[#5e7282]">
                        Recherche en cours...
                    </div>
                </div>

                {filtersOpen && (
                    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Filtres de recherche">
                        <button
                            type="button"
                            aria-label="Fermer les filtres"
                            onClick={() => setFiltersOpen(false)}
                            className="eef-filter-backdrop absolute inset-0 h-full w-full cursor-default bg-[#102b43]/75"
                        />
                        <div className="eef-filter-sheet absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-[26px] bg-[#fdfcf8] px-6 pb-10 pt-6 shadow-[0_-12px_35px_rgba(16,43,67,0.16)]">
                            <div className="relative mb-5 flex items-center justify-center">
                                <h3 className="m-0 text-[20px] font-medium text-[#102b43]">Filtres</h3>
                                <button
                                    type="button"
                                    aria-label="Fermer les filtres"
                                    onClick={() => setFiltersOpen(false)}
                                    className="absolute right-0 inline-flex size-6 items-center justify-center rounded-full border border-[#7fa9a3] text-[#5e928c]"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                                        <path d="m6 6 12 12M18 6 6 18" />
                                    </svg>
                                </button>
                            </div>
                            <div className="grid gap-6">
                                {FILTER_GROUPS.map(([label, options]) => (
                                    <div key={label}>
                                        <p className="m-0 mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.92px] text-[#5e7282]">{label}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {options.map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    aria-pressed={selectedFilters[label] === option}
                                                    onClick={() => toggleFilter(label, option)}
                                                    className={`cursor-pointer rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition ${
                                                        selectedFilters[label] === option
                                                            ? "border-[#102b43] bg-[#102b43] text-white"
                                                            : "border-[#e2e5e5] bg-white text-[#5e7282] hover:border-[#63a8d8] hover:text-[#63a8d8]"
                                                    }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </MarketingShell>
    );
};

export default page;
