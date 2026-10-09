import { MarketingShell } from "@/components/marketing/MarketingShell";
import Link from "next/link";

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

const VISA_STEPS = [
    ["Admission", "L'acceptation officielle d'un établissement : le point de départ de toute demande."],
    ["EEF / pré-consulaire", "Si votre pays applique la procédure « Études en France », le dossier pré-consulaire précède France-Visas."],
    ["Passeport", "Validité couvrant toute la durée prévue du séjour."],
    ["Justificatifs financiers", "Preuves de ressources récentes, lisibles et traçables — relues avant dépôt."],
    ["Hébergement", "Attestation de logement ou d'hébergeant pour vos premières semaines."],
    ["France-Visas", "Formulaire officiel et génération de la liste de pièces propre à votre situation."],
    ["Rendez-vous", "Dossier physique classé dans l'ordre officiel, questions classiques préparées."],
    ["Revue finale", "Contrôle de cohérence : mêmes dates, mêmes montants, même projet partout."],
    ["Voyage", "Billets, assurance, documents en cabine, checklist d'arrivée."],
    ["Validation à l'arrivée", "Validation en ligne du visa long séjour dans le délai indiqué."],
] as const;

const APPOINTMENT_PREP = [
    "Pack documentaire personnalisé",
    "Revue des preuves financières",
    "Revue de la preuve d'hébergement",
    "Contrôle de cohérence entre formulaires",
    "Questions-réponses d'entraînement",
] as const;

const AFTER_APPROVAL = [
    "Checklist de voyage",
    "Rappel de validation après l'arrivée",
    "Assurance et santé",
    "Installation et première semaine",
    "Rappels de renouvellement de séjour",
] as const;

const page = () => {
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
                    <span className="">Visa</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium tracking-[1.6px] text-[#173b5d]">
                    Visa
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[800px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Un processus maîtrisé, pas mystérieux.
                    </h1>
                    <div className="max-w-[480px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            Dix étapes claires, adaptées à votre profil, avec revue des pièces et préparation du rendez-vous. Sans jamais promettre une décision qui appartient aux autorités consulaires.
                        </p>
                        <a
                            href="mailto:hello@eef.fr"
                            className="mt-[25px] inline-flex h-[52px] w-fit shrink-0 items-center justify-center gap-[21px] whitespace-nowrap rounded-full bg-eef-navy px-[26px] text-[15px] font-medium text-white transition hover:bg-eef-ink"
                        >
                            Ouvrir mon centre visa{" "}
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
                        src="/assets/city.webp"
                        alt="Étudiante cherchant un livre dans une bibliothèque"
                        className="h-[435px] min-h-[321px] w-full object-[center_45%] object-cover max-md:min-h-50"
                    />
                    <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[9px] bg-[#f5fafd] px-4.5 py-[13px] text-[9px] tracking-[1.17px] text-[#102B43]">
                        Comprendre. Choisir. Avancer.
                    </span>
                </div>
            </section>

            {/* Visa journey */}
            <section className={`${orientationWrap} pb-10 pt-[70px]`}>
                <p className="m-0 mb-4 text-[11px] font-medium tracking-[1.76px] text-[#173b5d]">Le parcours</p>
                <h2 className="m-0 max-w-[12em] text-[clamp(35px,5vw,60px)] font-medium leading-[1.12] tracking-[-2.7px] text-[#102b43]">Les 10 étapes du visa étudiant.</h2>
                <p className="mt-4 m-0 max-w-[672px] text-[17px] leading-[1.75] text-[#5e7282]">Dans Mon Dossier, chaque étape devient une case à cocher suivie, avec vos documents rattachés.</p>

                <ol className="mt-12 max-w-[760px] border-l-2 border-[#c6d9e7] ml-2">
                    {VISA_STEPS.map(([title, description], index) => (
                        <li key={title} className="relative list-none pb-7 pl-6 last:pb-0 sm:pl-8">
                            <span className="absolute -left-[13px] top-0 flex size-6 items-center justify-center rounded-full bg-[#63a8d8] text-[10px] font-extrabold text-white">{index + 1}</span>
                            <h3 className="m-0 text-[27px] font-medium leading-[1.2] tracking-[-0.945px] text-[#102b43]">{title}</h3>
                            <p className="mt-1 m-0 max-w-[600px] text-[14px] leading-[1.75] text-[#5e7282]">{description}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-5 flex max-w-3xl p-[28px] sm:flex-row flex-col items-start gap-4 text-[14px] leading-[1.75] text-[#5e7282]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-alert h-6 w-6 shrink-0" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
                    <p className="m-0"><strong className="font-semibold text-[#405b70]">Règle de confiance :</strong> Procédure EEF améliore votre préparation et réduit les erreurs administratives, mais ne garantit jamais la délivrance d&apos;un visa et n&apos;a aucune autorité sur les décisions consulaires.</p>
                </div>
            </section>

            {/* Appointment and after approval */}
            <section className={`${orientationWrap} pb-[88px]`}>
                <div className="grid gap-5 md:grid-cols-2">
                    <article className="rounded-[22px] border border-[#c6d9e7] bg-white p-8">
                        <h2 className="m-0 text-[27px] leading-[1.2] font-medium tracking-[-0.945px] text-[#102b43]">Préparation du rendez-vous</h2>
                        <ul className="mt-4 grid gap-2 p-0 text-[15px] leading-[23.25px] text-[#5e7282]">
                            {APPOINTMENT_PREP.map((item) => <li key={item}>· {item}</li>)}
                        </ul>
                    </article>

                    <article className="rounded-[22px] border border-[#c6d9e7] bg-white p-8">
                        <h2 className="m-0 text-[27px] leading-[1.2] font-medium tracking-[-0.945px] text-[#102b43]">Après l&apos;approbation</h2>
                        <ul className="mt-4 grid gap-2 p-0 text-[15px] leading-[23.25px] text-[#5e7282]">
                            {AFTER_APPROVAL.map((item) => <li key={item}>· {item}</li>)}
                        </ul>
                    </article>
                </div>
                <Link href="/faq" className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#173b5d] px-[26px] text-[15px] font-medium text-[#173b5d] transition hover:bg-[#173b5d] hover:text-white">
                    Lire le guide : préparer son rendez-vous visa
                </Link>
            </section>

        </MarketingShell>
    );
};

export default page;
