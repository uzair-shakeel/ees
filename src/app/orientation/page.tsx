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
          <span className="">Orientation</span>
        </nav>

        <p className="m-0 mb-[23px] text-[10px] leading-[1.5] font-medium tracking-[1.6px] text-[#173b5d]">
          Orientation
        </p>
        <div className="flex flex-wrap lg:flex-nowrap items-end gap-[28px] md:gap-16 lg:gap-20">
          <h1 className="max-w-[770px] text-[clamp(45px,6.7vw,78px)] font-medium leading-[1.055] tracking-[-3.4992px] text-[#102B43]">
            Trouver une direction avant de chercher une université.
          </h1>
          <div className="max-w-[453px] md:justify-self-end">
            <p className="text-[16px] leading-[1.65] text-eef-secondary">
              Le premier choix n&apos;est pas celui de l&apos;établissement.
              C&apos;est celui de la direction que vous voulez donner à vos
              études.
            </p>
            <a
              href="mailto:hello@eef.fr"
              className="mt-[25px] inline-flex h-[52px] w-fit shrink-0 items-center justify-center gap-[21px] whitespace-nowrap rounded-full bg-eef-navy px-[26px] text-[13px] font-medium text-white transition hover:bg-eef-ink"
            >
              Commencer mon orientation{" "}
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
            src="/assets/library.webp"
            alt="Étudiante cherchant un livre dans une bibliothèque"
            className="h-[435px] min-h-[321px] w-full object-[center_45%] object-cover max-md:min-h-50"
          />
          <span className="absolute bottom-5 left-5 inline-flex items-center rounded-[9px] bg-[#f5fafd] px-4.5 py-[13px] text-[9px] tracking-[1.17px] text-[#102B43]">
            Comprendre. Choisir. S&apos;avancer.
          </span>
        </div>
      </section>

      {/* Profile */}
      <section className={`${orientationWrap} py-[76px] sm:py-[88px]`}>
        <p className="m-0 mb-[23px] text-[10px] font-medium leading-[1.5] tracking-[1.6px] text-[#173b5d]">
          Comprendre avant de choisir
        </p>
        <h2 className="m-0 max-w-[12em] text-[clamp(35px,5vw,58px)] font-medium leading-[1.1] tracking-[-2.565px] text-[#102b43]">
          Votre profil dans son ensemble.
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
            <h2 className="m-0 max-w-[11em] text-[clamp(40px,5.4vw,78px)] font-medium leading-[1.1] tracking-[-3.51px] text-[#102B43]">
              Du profil à une direction claire.
            </h2>
          </div>
          <div className="pt-[26px]">
            <p className="m-0 max-w-[780px] text-[15px] sm:text-[17px] leading-[1.75] text-[#5e7282]">
              Votre conseiller confronte vos objectifs à la réalité des
              formations disponibles afin de faire émerger plusieurs pistes
              cohérentes. L&apos;objectif n&apos;est pas de décider à votre
              place, mais de vous donner suffisamment de contexte pour prendre
              une décision éclairée.
            </p>
            <Link
              href="/methode"
              className="mt-[22px] underline underline-offset-4 h-11 inline-flex items-center gap-[15px] text-[13px] font-medium text-[#102b43] transition hover:text-eef-navy"
            >
              Comprendre les formations <IconArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className={`${orientationWrap} py-[88px]`}>
        <h2 className="m-0 max-w-[12em] text-[clamp(2.5rem,5vw,57px)] font-medium leading-[1.1] tracking-[-2.565px] text-[#102b43]">
          À la fin, vous savez quoi chercher.
        </h2>
        <div className="mt-11 grid gap-x-[64px] md:grid-cols-2">
          {ORIENTATION_RESULTS.map((result, index) => (
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

    </MarketingShell>
  );
};

export default page;
