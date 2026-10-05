import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import {
  PERIOD_LABEL,
  STATUS_LABEL,
  daysBetween,
  formatDateFR,
  formatNumber,
  getBourse,
  getBourses,
  safeUrl,
  todayISO,
  type Statut,
} from "@/lib/bourses";

const wrap = "mx-auto w-[calc(100%-2.5rem)] max-w-[860px] lg:w-[calc(100%-8rem)]";

const STATUS_CLASS: Record<Statut, string> = {
  VERIFIE: "bg-[#e3f3ea] text-[#17703f]",
  EN_REVUE: "bg-[#fcf0d6] text-[#8a5a00]",
  MANQUANT: "bg-[#eceff3] text-[#5f6773]",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const bourses = await getBourses();
  return bourses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bourse = await getBourse(slug);
  if (!bourse) return { title: "Bourse introuvable | Procédure EEF" };
  const bits = [
    bourse.organisme,
    bourse.niveaux.join(", "),
    bourse.dateLimite ? `date limite le ${formatDateFR(bourse.dateLimite)}` : null,
  ].filter(Boolean);
  return {
    title: `${bourse.nom} | Procédure EEF`,
    description: `${bourse.nom} : ${bits.join(" · ")}. Montant, éligibilité et pièces vérifiés à la source.`,
  };
}

export default async function BoursePage({ params }: Props) {
  const { slug } = await params;
  const bourse = await getBourse(slug);
  if (!bourse) notFound();

  const days = bourse.dateLimite ? daysBetween(todayISO(), bourse.dateLimite) : null;
  const url = safeUrl(bourse.source);

  return (
    <MarketingShell>
      <article className={`${wrap} pt-8 pb-24 lg:pt-14`}>
        <nav className="mb-8 text-[10px] leading-[15.5px] text-[#5e7282]" aria-label="Fil d'Ariane">
          <Link href="/">Accueil</Link>
          <span className="mx-3">/</span>
          <Link href="/bourses">Bourses</Link>
          <span className="mx-3">/</span>
          <span>{bourse.nom}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`inline-flex rounded-[6px] px-2 py-[3px] text-[10.5px] font-bold tracking-[0.05em] ${STATUS_CLASS[bourse.statut]}`}>
            {STATUS_LABEL[bourse.statut]}
          </span>
          {bourse.niveaux.map((level) => (
            <span key={level} className="inline-flex whitespace-nowrap rounded-[6px] bg-[#f1f5f9] px-2 py-[3px] text-[11.5px] font-medium text-[#5d6b7e]">
              {level}
            </span>
          ))}
        </div>

        <h1 className="mt-4 mb-2 text-[clamp(2rem,4vw,44px)] leading-[1.12] font-medium tracking-[-0.03em] text-[#102B43]">
          {bourse.nom}
        </h1>
        <p className="m-0 text-[16px] text-[#5d6b7e]">
          {bourse.organisme}
          {bourse.domaine && <span className="mt-1 block text-[14px] text-[#7b8798]">{bourse.domaine}</span>}
        </p>

        <dl className="mt-8 grid gap-5 border-y border-[#e6ecf3] py-6 sm:grid-cols-3">
          <div>
            <dt className="text-[12px] text-[#5d6b7e]">Montant</dt>
            <dd className="m-0 mt-1 text-[18px] font-semibold text-[#15263d]">
              {bourse.montant ? (
                <>
                  {formatNumber(bourse.montant.valeur)} €{" "}
                  <span className="text-[13px] font-medium text-[#5d6b7e]">{PERIOD_LABEL[bourse.montant.periode]}</span>
                </>
              ) : (
                "Manquant"
              )}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] text-[#5d6b7e]">Date limite</dt>
            <dd className="m-0 mt-1 text-[18px] font-semibold text-[#15263d]">
              {bourse.dateLimite && days !== null
                ? `${formatDateFR(bourse.dateLimite)}${days < 0 ? " · Clôturée" : ` · J-${days}`}`
                : "Manquant"}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] text-[#5d6b7e]">Dernière vérification</dt>
            <dd className="m-0 mt-1 text-[16px] font-semibold text-[#17703f]">
              {bourse.statut === "VERIFIE" && bourse.verifieLe ? `Vérifié le ${formatDateFR(bourse.verifieLe)}` : STATUS_LABEL[bourse.statut]}
            </dd>
          </div>
        </dl>

        <section className="mt-8">
          <h2 className="m-0 text-[20px] font-medium text-[#102B43]">Éligibilité</h2>
          <p className="mt-2 mb-0 text-[15px] leading-[1.7] text-[#33445c]">{bourse.eligibilite ?? "Manquant"}</p>
        </section>

        <section className="mt-8">
          <h2 className="m-0 text-[20px] font-medium text-[#102B43]">Pièces demandées</h2>
          {bourse.pieces?.length ? (
            <ul className="mt-2 mb-0 list-disc pl-5 text-[15px] leading-[1.7] text-[#33445c]">
              {bourse.pieces.map((piece) => (
                <li key={piece}>{piece}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 mb-0 text-[15px] text-[#33445c]">Manquant</p>
          )}
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full bg-[#173b5d] px-5 text-[14px] font-medium text-white">
              Consulter la source officielle
            </a>
          )}
          <Link href="/bourses" className="inline-flex h-11 items-center rounded-full border border-[#c6d9e7] px-5 text-[14px] font-medium text-[#173b5d]">
            Toutes les bourses
          </Link>
        </div>
      </article>
    </MarketingShell>
  );
}
