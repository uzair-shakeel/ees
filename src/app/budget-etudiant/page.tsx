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

const BUDGET_FIELDS = [
    ["tuition", "Frais de scolarité (annuels)", "one-time"],
    ["fees", "Frais de dossier (total)", "one-time"],
    ["visa", "Frais de visa & procédure", "one-time"],
    ["rent", "Loyer mensuel", "monthly"],
    ["deposit", "Dépôt de garantie", "one-time"],
    ["insurance", "Assurances (mensuel)", "monthly"],
    ["food", "Alimentation (mensuel)", "monthly"],
    ["transport", "Transport (mensuel)", "monthly"],
    ["phone", "Téléphone & internet (mensuel)", "monthly"],
    ["misc", "Divers (mensuel)", "monthly"],
    ["arrival", "Coûts d'arrivée (équipement...)", "one-time"],
    ["duration", "Durée (mois)", "duration"],
] as const;

const CURRENCY_FIELDS = ["tuition", "fees", "visa", "rent", "deposit", "insurance", "food", "transport", "phone", "misc", "arrival"] as const;

function formatCurrency(value: number) {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);
}

const page = () => {
    const [budget, setBudget] = useState<Record<string, number>>({
        tuition: 0,
        fees: 0,
        visa: 0,
        rent: 0,
        deposit: 0,
        insurance: 0,
        food: 0,
        transport: 0,
        phone: 0,
        misc: 0,
        arrival: 0,
        duration: 12,
    });
    const [showTotals, setShowTotals] = useState(false);

    const monthlyTotal = ["rent", "insurance", "food", "transport", "phone", "misc"]
        .reduce((total, key) => total + budget[key], 0);
    const installationTotal = ["tuition", "fees", "visa", "deposit", "arrival"]
        .reduce((total, key) => total + budget[key], 0);
    const projectTotal = installationTotal + monthlyTotal * budget.duration;

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
                    <span className="">Budget étudiant</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
                    Budget étudiant
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[800px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Le loyer n'est que la moitié de l'histoire.
                    </h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            Renseignez vos propres estimations : la plateforme calcule votre coût d'installation, votre budget mensuel et votre coût annuel total. Aucun montant n'est garanti ni pré-rempli.
                        </p>
                    </div>
                </div>
            </section>

            {/* Budget calculator */}
            <section className={`${orientationWrap} pb-[96px] pt-[70px]`}>
                <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[22px] border border-[#c6d9e7] bg-white p-8">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {BUDGET_FIELDS.map(([key, label, kind]) => (
                                <div key={key}>
                                    <label htmlFor={`budget-${key}`} className="mb-[7px] block text-[11.5px] font-bold uppercase tracking-[0.92px] text-[#5e7282]">
                                        {label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id={`budget-${key}`}
                                            type="number"
                                            min={kind === "duration" ? 1 : 0}
                                            step="1"
                                            value={budget[key]}
                                            onChange={(event) => {
                                                const value = Math.max(kind === "duration" ? 1 : 0, Number(event.target.value) || 0);
                                                setBudget((current) => ({ ...current, [key]: value }));
                                                setShowTotals(false);
                                            }}
                                            className="h-[50px] w-full rounded-[14px] border border-[#c6d9e7] bg-white px-4 text-[13px] text-[#102b43] outline-none focus:border-[#63a8d8]"
                                        />
                                        {CURRENCY_FIELDS.includes(key as (typeof CURRENCY_FIELDS)[number]) && (
                                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#5e7282]">€</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowTotals(true)}
                            className="mt-6 cursor-pointer inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#173b5d] px-5 text-[15px] font-medium text-white transition hover:bg-[#122f4b]"
                        >
                            Calculer mon budget
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calculator h-4 w-4" aria-hidden="true"><rect width="16" height="20" x="4" y="2" rx="2"></rect><line x1="8" x2="16" y1="6" y2="6"></line><line x1="16" x2="16" y1="14" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>
                        </button>
                    </div>

                    <div className="p-10">
                        <h2 className="m-0 text-[27px] leading-[1.2] font-medium tracking-[-0.945px] text-[#102B43]">Trois totaux clairs.</h2>
                        <p className="mt-3 m-0 text-[15px] leading-[1.75] text-[#5e7282]">
                            Installation (dépenses uniques), budget mensuel récurrent et coût annuel total — pour comparer deux villes ou deux programmes en un coup d&apos;œil.
                        </p>
                        {showTotals && (
                            <dl className="mt-6 grid gap-3 text-[13px] text-[#5e7282]">
                                <div className="flex items-center justify-between gap-5 border-b border-[#c6d9e7] pb-3">
                                    <dt>Installation et première année</dt>
                                    <dd className="m-0 font-semibold text-[#102B43]">{formatCurrency(installationTotal)}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-5 border-b border-[#c6d9e7] pb-3">
                                    <dt>Budget mensuel</dt>
                                    <dd className="m-0 font-semibold text-[#102B43]">{formatCurrency(monthlyTotal)}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-5 border-b border-[#c6d9e7] pb-3">
                                    <dt>Coût total sur {budget.duration} mois</dt>
                                    <dd className="m-0 font-semibold text-[#102B43]">{formatCurrency(projectTotal)}</dd>
                                </div>
                            </dl>
                        )}
                    </div>
                </div>
            </section>

        </MarketingShell>
    );
};

export default page;
