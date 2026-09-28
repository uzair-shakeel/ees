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

const FORMATION_PATHS = [
    [
        "Licence",
        "Un parcours universitaire progressif permettant de construire des bases académiques solides.",
    ],
    [
        "Bachelor",
        "Des formations souvent plus spécialisées et professionnalisantes selon l'établissement. Le statut du diplôme et sa reconnaissance doivent être vérifiés.",
    ],
    [
        "Master",
        "Une spécialisation avancée après un premier cycle d'études supérieures, selon les conditions d'accès du programme.",
    ],
    [
        "Écoles de commerce",
        "Des cursus orientés management, finance, marketing, stratégie, entrepreneuriat et autres disciplines de gestion.",
    ],
    [
        "Écoles d'ingénieurs",
        "Des parcours scientifiques et techniques pouvant conduire à différentes spécialisations. Les conditions d'admission varient selon les écoles.",
    ],
] as const;

const FORMATION_CRITERIA = [
    "Contenu pédagogique",
    "Prérequis et niveau académique",
    "Langue d'enseignement",
    "Spécialisation",
    "Stages et expérience professionnelle",
    "Débouchés",
    "Établissement",
    "Budget et localisation",
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
                    <span className="">Formations</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
                    Formations
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[770px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Choisir une formation qui a du sens pour votre projet.
                    </h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            Un intitulé ne suffit pas. Nous regardons ce que vous allez
                            réellement apprendre, les prérequis, le niveau attendu et ce
                            que la formation peut vous permettre ensuite.
                        </p>
                        <a
                            href="mailto:hello@eef.fr"
                            className="mt-[25px] inline-flex h-[52px] w-fit shrink-0 items-center justify-center gap-[21px] whitespace-nowrap rounded-full bg-eef-navy px-[26px] text-[13px] font-medium text-white transition hover:bg-eef-ink"
                        >
                            Parler de ma formation{" "}
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
                        src="/assets/advisor.webp"
                        alt="Conseiller échangeant avec un étudiant sur son projet de formation"
                        className="h-[435px] min-h-[321px] w-full object-[center_45%] object-cover max-md:min-h-50"
                    />
                    <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[9px] bg-[#f5fafd] px-4.5 py-[13px] text-[9px] uppercase tracking-[1.17px] text-[#102B43]">
                        Comprendre. Comparer. Choisir.
                    </span>
                </div>
            </section>

            {/* Profile */}
            <section className={`${orientationWrap} py-[76px] sm:py-[88px]`}>
                <p className="m-0 mb-[23px] text-[10px] font-medium leading-[1.5] uppercase tracking-[1.6px] text-[#173b5d]">
                    Comprendre avant de choisir
                </p>
                <h2 className="m-0 max-w-[12em] text-[clamp(35px,5vw,58px)] font-medium leading-[1.1] tracking-[-2.565px] text-[#102b43]">
                    Comprendre les différents parcours.
                </h2>
                <div className="mt-[28px] sm:mt-11 grid border-t border-[#c6d9e7] md:grid-cols-3">
                    {FORMATION_PATHS.map(([title, description], index) => (
                        <article
                            key={title}
                            className="border-b border-eef-border py-5 md:border-r nth-[4n]:pl-0 pl-0 md:px-[36px] first:pl-0 md:py-[26px] md:nth-[3n]:border-r-0 nth-[4n]:border-b-0 nth-[5n]:border-b-0 last:border-b-0"
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
                            Notre approche
                        </p>
                        <h2 className="m-0 max-w-[11em] text-[clamp(40px,5.4vw,78px)] font-medium leading-[1.1] tracking-[-3.51px] text-[#102B43]">
                            Regarder au-delà de l&apos;intitulé.
                        </h2>
                    </div>
                    <div className="pt-[26px]">
                        <p className="m-0 max-w-[780px] text-[15px] sm:text-[17px] leading-[1.75] text-[#5e7282]">
                            Le contenu, la reconnaissance du diplôme et les prérequis
                            méritent autant d&apos;attention que le nom de l&apos;établissement. Les
                            structures et parcours varient : nous vérifions les informations
                            publiées pour chaque formation.
                        </p>
                        <Link
                            href="/methode"
                            className="mt-[22px] underline underline-offset-4 h-11 inline-flex items-center gap-[15px] text-[13px] font-medium text-[#102b43] transition hover:text-eef-navy"
                        >
                            Explorer les formations <IconArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className={`${orientationWrap} py-[88px]`}>
                <h2 className="m-0 max-w-[12em] text-[clamp(2.5rem,5vw,57px)] font-medium leading-[1.1] tracking-[-2.565px] text-[#102b43]">
                    Ce que nous regardons avant de recommander.
                </h2>
                <div className="mt-11 grid gap-x-[64px] md:grid-cols-2">
                    {FORMATION_CRITERIA.map((result, index) => (
                        <div
                            key={result}
                            className="flex items-center border-t border-[#c6d9e7] gap-5 py-[18px] text-[17px] text-[#102b43]"
                        >
                            <span className="text-[10px] font-medium tabular-nums text-[#63a8d8]">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            {result}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={`${orientationWrap} py-[60px]`}>
                <div className="relative grid min-h-[300px] overflow-hidden rounded-[28px] bg-eef-navy px-[26px] py-[34px] text-white max-md:rounded-[22px] md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-[60px] md:py-[56px]">
                    <div className="relative z-10 max-w-[560px]">
                        <h2 className="m-0 max-w-[18em] text-[28px] md:text-[40px] font-medium leading-[1.2] tracking-[-0.02em]">
                            Votre question mérite une vraie conversation.
                        </h2>
                        <p className="mt-4 m-0 text-[15px] leading-[1.6] text-white/70">
                            Commençons par comprendre où vous voulez aller.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3.5 max-md:flex-col max-md:items-stretch">
                            <a
                                href="mailto:hello@eef.fr"
                                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white px-[22px] text-[13px] font-medium text-eef-navy transition hover:bg-eef-mist max-md:w-full"
                            >
                                Parler à un conseiller <IconArrowRight />
                            </a>
                            <Link
                                href="/"
                                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/50 px-[22px] text-[13px] font-medium text-white transition hover:bg-white/10 max-md:w-full"
                            >
                                Découvrir Procédure EEF <IconArrowRight />
                            </Link>
                        </div>
                    </div>

                    <div
                        className="pointer-events-none absolute -right-20 top-1/2 hidden lg:flex size-[360px] -translate-y-1/2 items-center justify-center sm:-right-8 md:size-[480px]"
                        aria-hidden
                    >
                        <div className="absolute size-full rounded-full border border-white/10" />
                        <div className="absolute size-[78%] rounded-full border border-white/10" />
                        <div className="absolute size-[49%] rounded-full border border-white/10" />
                        <div className="relative flex size-[100px] items-center justify-center rounded-full border border-white/15 bg-white/[0.07]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={ASSETS.logoMark}
                                alt=""
                                className="absolute left-1/2 top-1/2 w-[80px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-90 brightness-0 invert"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </MarketingShell>
    );
};

export default page;
