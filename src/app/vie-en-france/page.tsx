import { MarketingShell } from "@/components/marketing/MarketingShell";
import Link from "next/link";

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
        "Votre recherche",
        "Comprendre les quartiers, les trajets et les solutions de logement adaptées à votre vie étudiante.",
    ],
    [
        "Votre budget",
        "Anticiper le loyer, les charges, les dépenses initiales et les garanties éventuellement demandées.",
    ],
    [
        "Votre dossier locatif",
        "Préparer les justificatifs demandés, vérifier vos interlocuteurs et protéger vos informations personnelles.",
    ],
    [
        "Avant l'arrivée",
        "Clarifier les conditions du bail, les garanties et l'assurance avant de vous engager.",
    ],
] as const;

const ARRIVAL_TIMELINE = [
    ["J-30", "Avant le départ", ["Garant / caution locative", "Assurance habitation", "CVEC réglée avant l'inscription"]],
    ["J-7", "Dernière semaine", ["Compte bancaire préparé", "SIM / eSIM française commandée", "Documents en double (papier + numérique)"]],
    ["J+7", "Première semaine", ["État des lieux photographié", "Électricité et internet activés", "Abonnement transport"]],
    ["J+30", "Premier mois", ["Sécurité sociale étudiante", "Validation du visa long séjour", "Équipement et repères de quartier"]],
] as const;

const orientationWrap =
    "mx-auto w-[calc(100%-2.5rem)] max-w-[1350px] lg:w-[calc(100%-8rem)]";

const page = () => {
    return (
        <MarketingShell>
            {/* Hero */}
            <section className={`${orientationWrap} pt-[32px] lg:pt-[53px]`}>
                <nav className="mb-[35px] lg:mb-[55px] text-[10px] leading-[15.5px] text-[#5e7282]" aria-label="Fil d'Ariane">
                    <Link href="/" className="transition">Accueil</Link>
                    <span className="mx-3">/</span>
                    <span>Vie en France</span>
                </nav>
                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium uppercase tracking-[1.6px] text-[#173b5d]">Vie en France</p>
                <div className="flex flex-wrap items-end gap-[28px] md:gap-16 lg:flex-nowrap lg:gap-20">
                    <h1 className="max-w-[800px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">Préparer la France avant d&apos;y arriver.</h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">Une admission règle la question académique. Il reste ensuite à organiser la vie réelle.</p>
                        <Link href="/mon-dossier/installation" className="sm:w-fit w-full mt-[25px] inline-flex h-[52px] w-fit shrink-0 items-center justify-center gap-[16px] whitespace-nowrap rounded-full bg-eef-navy px-[26px] text-[15px] font-medium text-white transition hover:bg-eef-ink">
                            Ouvrir ma checklist d&apos;installation <IconArrowRight />
                        </Link>
                    </div>
                </div>
                <div className="relative mt-[65px] overflow-hidden rounded-[28px] bg-eef-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/city.webp" alt="Immeuble parisien dans une rue de France" className="h-[435px] min-h-[321px] w-full object-[center_45%] object-cover max-md:min-h-50" />
                    <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[9px] bg-[#f5fafd] px-4.5 py-[13px] text-[9px] uppercase tracking-[1.17px] text-[#102B43]">COMPRENDRE. CHOISIR. AVANCER.</span>
                </div>
            </section>

            {/* Profile */}
            <section className={`${orientationWrap} py-[76px] sm:py-[88px]`}>
                <p className="m-0 mb-[23px] text-[10px] font-medium leading-[1.5] uppercase tracking-[1.6px] text-[#173b5d]">
                    Le logement
                </p>
                <h2 className="m-0 max-w-[12em] text-[clamp(35px,5vw,57px)] font-medium leading-[1.1] tracking-[-2.565px] text-[#102b43]">
                    Trouver un logement sans commencer de zéro.
                </h2>
                <p className="mt-5 m-0 text-[11px] leading-[1.6] text-[#5e7282]">
                    L&apos;accompagnement ne garantit pas l&apos;attribution d&apos;un logement.
                </p>
                <Link
                    href="/mon-dossier/installation"
                    className="inline-flex items-center gap-[15px] text-[13px] h-11 font-medium text-[#102b43] transition hover:text-eef-navy"
                >
                    <span className="underline underline-offset-4 decoration-[#c6d9e7] hover:decoration-[#63a8d8]">
                        Préparer ma recherche de logement
                    </span>
                    <IconArrowRight />
                </Link>
                <div className="eef-rule-grid mt-[28px] sm:mt-11">
                    {PROFILE_ITEMS.map(([title, description], index) => (
                        <article key={title}>
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
                            Les démarches
                        </p>
                        <h2 className="m-0 max-w-[12em] text-[clamp(40px,5.4vw,78px)] font-medium leading-[1.1] tracking-[-3.51px] text-[#102B43]">
                            Les démarches, dans le bon ordre.
                        </h2>
                    </div>
                    <div className="pt-[26px]">
                        <p className="m-0 max-w-[780px] text-[15px] sm:text-[17px] leading-[1.75] text-[#5e7282]">
                            Visa lorsque applicable, assurance, compte bancaire, téléphone, transport, documents importants et démarches après arrivée. Nous vous aidons à identifier les formalités correspondant à votre situation.
                        </p>
                        <Link
                            href="/methode"
                            className="mt-[22px] inline-flex h-11 items-center gap-[15px] text-[13px] font-medium text-[#102b43] transition hover:text-eef-navy"
                        >
                            <span className="underline underline-offset-4 decoration-[#c6d9e7] hover:decoration-[#63a8d8]">
                                Comprendre les démarches de visa
                            </span>
                            <IconArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Budget */}
            <section className={`${orientationWrap} pt-[72px] pb-[88px]`}>
                <div className="grid items-end gap-8 md:grid-cols-2 md:gap-16">
                    <div>
                        <p className="m-0 mb-[22px] text-[10px] font-medium uppercase tracking-[1.6px] text-[#173b5d]">Le budget</p>
                        <h2 className="m-0 max-w-[12em] text-[clamp(35px,5vw,57px)] font-medium leading-[1.1] tracking-[-2.565px] text-[#102b43]">Comprendre le coût réel de votre projet.</h2>
                    </div>
                    <div className="pt-2 md:pt-8">
                        <p className="m-0 text-[19px] sm:text-[21px] leading-[1.55] text-[#102b43]">Logement, transport, alimentation, assurance, scolarité : votre budget ne s&apos;arrête pas aux frais de formation.</p>
                        <p className="mt-5 m-0 text-[11px] leading-[1.7] text-[#5e7282]">Distinguez les dépenses initiales du budget mensuel. Les montants dépendent de votre ville, de votre formation et de votre mode de vie.</p>
                         <Link
                            href="/mon-dossier/installation"
                            className="inline-flex h-11 items-center gap-[15px] text-[13px] font-medium text-[#102b43] transition hover:text-eef-navy"
                        >
                            <span className="underline underline-offset-4 decoration-[#c6d9e7] hover:decoration-[#63a8d8]">
                                 Construire mon budget étudiant
                            </span>
                            <IconArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Arrival calendar */}
            <section className={`${orientationWrap}`}>
                <p className="m-0 mb-[22px] text-[10px] font-medium uppercase tracking-[1.6px] text-[#173b5d]">Le calendrier</p>
                <h2 className="m-0 text-[clamp(40px,5.4vw,60px)] font-medium leading-[1.08] tracking-[-3px] text-[#102B43]">De J-30 à J+30.</h2>
                <p className="mt-4 m-0 max-w-[600px] text-[17px] leading-[1.7] text-[#5e7282]">Chaque élément devient une tâche cochable dans Mon Dossier, activée au bon moment.</p>
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {ARRIVAL_TIMELINE.map(([date, title, tasks], index) => (
                        <article key={date} className={`rounded-[26px] border border-[#c6d9e7] p-7 ${index % 2 === 0 ? "bg-[#f5fafd]" : "bg-white"}`}>
                            <span className="inline-flex rounded-full bg-[#e4eff6] px-[11px] py-[5px] text-[11.5px] font-semibold text-[#173b5d]">{date}</span>
                            <h3 className="mt-4 m-0 text-[18px] font-medium text-[#102b43]">{title}</h3>
                            <ul className="mt-4 grid gap-2 p-0 text-[14px] leading-[1.55] text-[#5e7282]">
                                {tasks.map((task) => <li key={task}>· {task}</li>)}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>

        </MarketingShell>
    );
};

export default page;
