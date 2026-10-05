import { BoursesExplorer } from "@/components/marketing/BoursesExplorer";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { getBourses, todayISO } from "@/lib/bourses";
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

const PROFILE_ITEMS = [
    [
        "Parcours académique",
        "Diplômes, résultats, matières étudiées et progression.",
    ],
    [
        "Centres d'intérêt",
        "Ce que vous aimez réellement apprendre et approfondir.",
    ],
    [
        "Forces",
        "Matières, compétences et environnements dans lesquels vous êtes le plus à l'aise.",
    ],
    [
        "Projet professionnel",
        "Secteurs, métiers ou trajectoires que vous souhaitez explorer.",
    ],
    [
        "Préférences",
        "Ville, environnement universitaire, langue et style d'études.",
    ],
    [
        "Contraintes",
        "Budget, calendrier, niveau d'études et conditions particulières.",
    ],
] as const;

const ORIENTATION_RESULTS = [
    "Domaines recommandés",
    "Types de diplômes",
    "Critères prioritaires",
    "Premières formations à explorer",
    "Prochaines étapes",
    "Feuille de route personnalisée",
] as const;

const orientationWrap =
    "mx-auto w-[calc(100%-2.5rem)] max-w-[1350px] lg:w-[calc(100%-8rem)]";

const page = async () => {
    const bourses = await getBourses();

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
                    <span className="">Bourses</span>
                </nav>

                <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium uppercase tracking-[1.6px] text-[#173b5d]">
                    Bourses
                </p>
                <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
                    <h1 className="max-w-[770px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
                        Financer votre projet avec les bons repères.
                    </h1>
                    <div className="max-w-[453px] md:justify-self-end">
                        <p className="text-[16px] leading-[1.65] text-eef-secondary">
                            Nationalité, niveau, domaine et calendrier : comprendre les
                            critères d&apos;éligibilité est la première étape. Les dispositifs
                            sont affichés uniquement après vérification à la source.
                        </p>
                    </div>
                </div>

                <div className="relative mt-[65px] overflow-hidden rounded-[28px] bg-eef-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/assets/campus.webp"
                        alt="Étudiante cherchant un livre dans une bibliothèque"
                        className="h-[435px] min-h-[321px] w-full object-[center_45%] object-cover max-md:min-h-50"
                    />
                    <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[9px] bg-[#f5fafd] px-4.5 py-[13px] text-[9px] uppercase tracking-[1.17px] text-[#102B43]">
                        COMPRENDRE. CHOISIR. AVANCER.
                    </span>
                </div>
            </section>

            {/* Scholarship explorer */}
            <section className={`${orientationWrap} pt-[45px] md:pt-[70px]`}>
                <BoursesExplorer bourses={bourses} initialToday={todayISO()} />

                <p className="mt-6 m-0 text-[12px] leading-[1.75] text-[#5e7282]">
                    Procédure EEF n&apos;affiche que des informations vérifiées à la
                    source (statuts VÉRIFIÉ / EN REVUE / MANQUANT). Aucune donnée
                    n&apos;est inventée.
                </p>
            </section>

            {/* Financing method */}
            <section className={`${orientationWrap}`}>
                <p className="mt-2 mb-[16px] text-[11px] font-medium uppercase tracking-[1.76px] text-[#173b5d]">
                    Méthode
                </p>
                <h2 className="m-0 max-w-[11em] text-[clamp(35px,4.3vw,60px)] font-medium leading-[1.12] tracking-[-2.7px] text-[#102B43]">
                    Les bourses ne sont qu&apos;une pièce du financement.
                </h2>
                <p className="mt-4 m-0 max-w-[670px] text-[17px] leading-[1.75] text-[#5e7282]">
                    Le vrai calcul : coût total de chaque scénario (frais + ville +
                    logement) moins les aides. Notre planificateur de budget fait
                    l&apos;addition.
                </p>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    <div className="p-[28px]">
                        <h3 className="m-0 text-[18px] font-medium tracking-[-0.63px] leading-[28px] text-[#102B43]">
                            Coût total
                        </h3>
                        <p className="mt-2 m-0 text-[14px] leading-[1.75] text-[#5e7282]">
                            Frais de scolarité + loyer + dépôt + assurance + transport + vie
                            courante + arrivée.
                        </p>
                    </div>
                    <div className="p-[28px]">
                        <h3 className="m-0 text-[18px] font-medium tracking-[-0.63px] leading-[28px] text-[#102B43]">
                            Comparaison d&apos;offres
                        </h3>
                        <p className="mt-2 m-0 text-[14px] leading-[1.75] text-[#5e7282]">
                            Le vrai coût de chaque admission après bourses et dépenses de la
                            ville.
                        </p>
                    </div>
                    <div className="p-[28px]">
                        <h3 className="m-0 text-[18px] font-medium tracking-[-0.63px] leading-[28px] text-[#102B43]">
                            Anticiper les échéances
                        </h3>
                        <p className="mt-2 m-0 text-[14px] leading-[1.75] text-[#5e7282]">
                            Repérez les dates officielles, les pièces demandées et le temps
                            nécessaire à leur préparation.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="mb-[96px] mt-8 inline-flex cursor-pointer h-[50px] items-center justify-center rounded-full bg-eef-navy px-[26px] text-[15px] font-medium text-white transition hover:bg-eef-ink"
                >
                    Ouvrir le planificateur de budget
                </button>
            </section>
        </MarketingShell>
    );
};

export default page;
