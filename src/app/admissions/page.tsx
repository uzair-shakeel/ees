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

const orientationWrap =
    "mx-auto w-[calc(100%-2.5rem)] max-w-[1350px] lg:w-[calc(100%-8rem)]";

const SIMULATOR_GROUPS = [
    ["Où résidez-vous actuellement ?", ["Dans un pays à procédure « Études en France »", "En France", "Dans l'UE (hors France)", "Ailleurs"]],
    ["Quel niveau visez-vous ?", ["Licence 1re année", "Licence 2 / 3", "Master", "Doctorat"]],
    ["Quel type d'établissement ?", ["Université publique", "École / établissement privé", "Je ne sais pas encore"]],
] as const;

const PUBLIC_SUPPORT = [
    "Identification de la voie et calendrier de candidature",
    "Liste ciblée d'établissements et checklist documentaire",
    "Relecture CV et lettre de motivation",
    "Préparation à l'entretien Campus France",
    "Revue de préparation avant soumission",
] as const;

const CLEAR_CHOICE = [
    "Vérifier le contenu et la reconnaissance du diplôme",
    "Comprendre les prérequis et les conditions d'admission",
    "Anticiper le budget de formation et de vie",
    "Comparer les voies de candidature applicables",
    "Garder une stratégie équilibrée, sans garantie d'admission",
] as const;

const page = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selections, setSelections] = useState<Record<string, string>>({
        [SIMULATOR_GROUPS[0][0]]: SIMULATOR_GROUPS[0][1][0],
        [SIMULATOR_GROUPS[1][0]]: SIMULATOR_GROUPS[1][1][2],
        [SIMULATOR_GROUPS[2][0]]: SIMULATOR_GROUPS[2][1][0],
    });

    function selectOption(group: string, option: string) {
        setSelections((current) => ({ ...current, [group]: option }));
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
                    <span className="">Admissions</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
                    Admissions
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[800px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Comprendre votre voie, préparer la suite.
                    </h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            Études en France, Parcoursup, Mon Master ou candidature directe : la voie dépend de votre situation et de l'établissement. Identifiez les repères à confirmer avec votre conseiller et les organismes officiels.
                        </p>
                    </div>
                </div>
            </section>

            {/* Application route simulator */}
            <section className={`${orientationWrap} pt-[70px] pb-[76px] sm:pb-[88px]`}>
                <div className="grid items-start md:grid-cols-[0.95fr_1.05fr] gap-8">
                    <div className="rounded-[22px] border border-[#c6d9e7] bg-white shadow-[0_8px_25px_rgba(16,43,67,0.025)] p-8">
                        <p className="m-0 text-[11px] font-medium leading-[16.5px] uppercase tracking-[1.76px] text-[#173b5d]">Simulateur de voie</p>
                        <div className="mt-5 grid gap-6">
                            {SIMULATOR_GROUPS.map(([label, options]) => (
                                <div key={label}>
                                    <p className="m-0 mb-[7px] text-[11.5px] leading-[17.81px] font-bold uppercase tracking-[0.92px] text-[#5e7282]">{label}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {options.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                aria-pressed={selections[label] === option}
                                                onClick={() => selectOption(label, option)}
                                                className={`cursor-pointer rounded-full border px-3.5 py-[7px] text-[12.5px] min-h-[35.38px] font-semibold transition ${selections[label] === option
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
                            <div>
                                <p className="m-0 mb-[7px] text-[11.5px] leading-[17.81px] font-bold uppercase tracking-[0.92px] text-[#5e7282]">Domaine (optionnel)</p>
                                <input id="admission-domain" type="text" placeholder="Ex : informatique, droit, commerce..." className="h-[50px] w-full rounded-[11px] border border-[#c6d9e7] bg-white px-4 text-[15px] text-[#102b43] outline-none placeholder:text-[#9aabba] focus:border-[#63a8d8]" />
                            </div>
                            <button
                                type="button"
                                disabled={isAnalyzing}
                                onClick={() => setIsAnalyzing(true)}
                                className="inline-flex h-[50px] cursor-pointer items-center justify-center gap-2 rounded-full bg-eef-navy px-5 text-[15px] font-medium text-white transition hover:bg-eef-ink disabled:cursor-wait disabled:opacity-90"
                            >
                                {isAnalyzing ? "Analyse..." : "Déterminer ma voie"}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-route h-4 w-4" aria-hidden="true"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-10 flex flex-col justify-center h-full">
                        <h2 className="m-0 text-[27px] leading-[1.2] font-medium tracking-[-0.945px] text-[#102B43]">Votre voie de candidature</h2>
                        <p className="mt-3 m-0 max-w-[530px] text-[15px] leading-[1.75] text-[#5e7282]">Répondez aux trois questions : vous obtenez la séquence recommandée, les portails à utiliser, les documents probables et la prochaine action.</p>
                    </div>
                </div>
            </section>

            {/* Accompaniments */}
            <section className={`${orientationWrap} pb-[78px] sm:pb-[96px]`}>
                <p className="m-0 mb-[16px] text-[11px] font-medium uppercase tracking-[1.76px] text-[#173b5d]">Deux accompagnements</p>
                <h2 className="m-0 max-w-[12em] text-[clamp(34px,4.3vw,60px)] font-medium leading-[1.08] tracking-[-2.7px] text-[#102B43]">Public ou privé : le même sérieux.</h2>

                <div className="mt-12 grid items-start gap-5 md:grid-cols-2">
                    <div className="py-9 md:p-9">
                        <span className="inline-flex rounded-full bg-[#e4eff6] px-[11px] py-[5px] text-[11.5px] font-bold text-[#173b5d]">Voie publique / EEF</span>
                        <h3 className="mt-4 m-0 text-[27px] font-medium leading-[1.2] tracking-[-0.945px] text-[#102B43]">Un accompagnement accessible, sans pression commerciale.</h3>
                        <ul className="mt-5 grid gap-2.5 p-0 text-[15px] text-[#102b43]">
                            {PUBLIC_SUPPORT.map((item) =>
                                <li key={item} className="flex items-start gap-2.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#63a8d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check mt-0.5 h-4.5 w-4.5 h-5 w-5 shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                                    {item}
                                </li>)}
                        </ul>
                    </div>

                    <div className="rounded-[28px] bg-[#102b43] p-8 sm:p-9 text-white">
                        <span className="inline-flex rounded-full bg-[#f5fafd] px-[11px] py-[5px] text-[11.5px] font-bold text-[#173b5d]">Un choix éclairé</span>
                        <h3 className="mt-4 m-0 text-[27px] font-medium leading-[1.2] tracking-[-0.945px] text-[#f5fafd]">Un établissement doit correspondre à votre projet.</h3>
                        <ul className="mt-5 grid gap-2.5 p-0 text-[15px] text-[#f5fafd]">
                            {CLEAR_CHOICE.map((item) => 
                            <li key={item} className="flex items-start gap-2.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#63a8d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check mt-0.5 h-4.5 w-4.5 h-5 w-5 shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                                {item}
                                </li>)}
                        </ul>
                    </div>
                </div>

                <p className="mt-8 max-w-[672px] text-[14px] leading-[1.75] text-[#5e7282]">Procédure EEF est un service indépendant, non affilié à Campus France ni au gouvernement français. Les procédures et calendriers doivent toujours être confirmés auprès des organismes concernés.</p>
            </section>
        </MarketingShell>
    );
};

export default page;
