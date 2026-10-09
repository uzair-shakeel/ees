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
                    <span className="">Accompagnement dossier</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium tracking-[1.6px] text-[#173b5d]">
                    Accompagnement dossier
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[800px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Un bon dossier raconte un projet cohérent.
                    </h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            Les documents ne doivent pas simplement exister. Ils doivent permettre à l'établissement de comprendre votre parcours, votre choix et votre objectif.
                        </p>
                        <a
                            href="mailto:hello@eef.fr"
                            className="mt-[25px] inline-flex h-[52px] w-fit shrink-0 items-center justify-center gap-[21px] whitespace-nowrap rounded-full bg-eef-navy px-[26px] text-[13px] font-medium text-white transition hover:bg-eef-ink"
                        >
                            Préparer mon dossier{" "}
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
                        src="/assets/student.webp"
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
                    Des documents qui se répondent.
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
                            Vous restez l'auteur de votre dossier.
                        </h2>
                    </div>
                    <div className="pt-[26px]">
                        <p className="m-0 max-w-[780px] text-[15px] sm:text-[17px] leading-[1.75] text-[#5e7282]">
                            Notre rôle est de vous guider, de vous aider à structurer vos idées, d'identifier les incohérences et de rendre votre présentation plus claire. Nous ne remplaçons jamais votre histoire par un texte générique.
                        </p>
                        <Link
                            href="/methode"
                            className="mt-[22px] inline-flex h-11 items-center gap-[15px] text-[13px] font-medium text-[#102b43] transition hover:text-eef-navy"
                        >
                            <span className="underline underline-offset-4 decoration-[#c6d9e7] hover:decoration-[#63a8d8]">
                                Comprendre la procédure Études en France
                            </span>
                            <IconArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

        </MarketingShell>
    );
};

export default page;
