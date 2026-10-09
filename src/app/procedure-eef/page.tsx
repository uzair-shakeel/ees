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
        "Comprendre votre situation",
        "Pays de résidence, niveau d'études, formation recherchée et calendrier.",
    ],
    [
        "Préparer vos documents",
        "Rassembler les pièces académiques et administratives demandées.",
    ],
    [
        "Construire vos choix",
        "Sélectionner les formations cohérentes avec votre projet.",
    ],
    [
        "Préparer votre dossier",
        "Structurer les éléments académiques et les motivations.",
    ],
    [
        "Effectuer les étapes applicables",
        "Suivre les démarches correspondant à votre situation.",
    ],
    [
        "Suivre les réponses",
        "Rester organisé pendant la période d'admission.",
    ],
    [
        "Préparer la suite",
        "Une fois admis, avancer vers les démarches nécessaires à votre arrivée en France.",
    ],
] as const;

const orientationWrap =
    "mx-auto w-[calc(100%-2.5rem)] max-w-[1350px] lg:w-[calc(100%-8rem)]";

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
                    <span className="">Procédure EEF</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium tracking-[1.6px] text-[#173b5d]">
                    Procédure EEF
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[800px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Études en France, étape par étape.
                    </h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            Une vue claire de la procédure afin de savoir quoi préparer, quand agir et quelle étape vient ensuite.
                        </p>
                        <a
                            href="mailto:hello@eef.fr"
                            className="mt-[25px] inline-flex h-[52px] w-fit shrink-0 items-center justify-center gap-[21px] whitespace-nowrap rounded-full bg-eef-navy px-[26px] text-[13px] font-medium text-white transition hover:bg-eef-ink"
                        >
                            Parler de ma procédure{" "}
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
                        alt="Étudiante cherchant un livre dans une bibliothèque"
                        className="h-[435px] min-h-[321px] w-full object-[center_45%] object-cover max-md:min-h-50"
                    />
                    <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[9px] bg-[#f5fafd] px-4.5 py-[13px] text-[9px] tracking-[1.17px] text-[#102B43]">
                        Comprendre. Choisir. Avancer.
                    </span>
                </div>
            </section>

            {/* Profile */}
            <section className={`${orientationWrap} py-[76px] sm:py-[88px]`}>
                <p className="m-0 mb-[23px] text-[10px] font-medium leading-[1.5] tracking-[1.6px] text-[#173b5d]">
                    Comprendre avant de choisir
                </p>
                <h2 className="m-0 max-w-[12em] text-[clamp(35px,5vw,58px)] font-medium leading-[1.1] tracking-[-2.565px] text-[#102b43]">
                    Une feuille de route, pas du jargon.
                </h2>
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
                        <p className="m-0 mb-[21px] sm:mb-[23px] text-[10px] leading-[1.5] font-medium tracking-[1.6px] text-[#173b5d]">
                            Notre approche
                        </p>
                        <h2 className="m-0 max-w-[12em] text-[clamp(40px,5.4vw,78px)] font-medium leading-[1.1] tracking-[-3.51px] text-[#102B43]">
                            Votre situation détermine votre parcours.
                        </h2>
                    </div>
                    <div className="pt-[26px]">
                        <p className="m-0 max-w-[780px] text-[15px] sm:text-[17px] leading-[1.75] text-[#5e7282]">
                            La procédure applicable dépend notamment de votre pays de résidence, du niveau visé et de l'établissement. Les règles et les calendriers évoluent : vérifiez toujours les exigences auprès des sources officielles.
                        </p>
                        <Link
                            href="/methode"
                            className="mt-[22px] inline-flex h-11 items-center gap-[15px] text-[13px] font-medium text-[#102b43] transition hover:text-eef-navy"
                        >
                            <span className="underline underline-offset-4 decoration-[#c6d9e7] hover:decoration-[#63a8d8]">
                                Identifier ma voie de candidature
                            </span>
                            <IconArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            <div className={`${orientationWrap} mt-10 lg:mt-[65px]`}>
                <div className="border-y border-[#c6d9e7] py-[26px] grid grid-cols-1 md:grid-cols-2 text-[#5e7282] gap-4.5 md:gap-[50px]">
                    <p className="text-[11px] sm:text-[12px] leading-[1.75]">Procédure EEF est un service d'accompagnement indépendant. Il ne s'agit pas de Campus France ni d'un organisme du gouvernement français.</p>
                    <p className="text-[11px] sm:text-[12px] leading-[1.75]">Les procédures, documents et calendriers peuvent varier selon le pays, l'établissement et l'année académique. Les exigences officielles doivent toujours être vérifiées auprès des organismes et établissements concernés.</p>
                </div>
            </div>

        </MarketingShell>
    );
};

export default page;
