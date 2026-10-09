import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getModuleOverview } from "@/lib/dossier-overview";
import { DossierHeader } from "@/components/DossierHeader";

export default async function AccueilPage({
  searchParams,
}: {
  searchParams: Promise<{ proceeded?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  const sp = await searchParams;
  const overview = await getModuleOverview(session.userId);
  const firstName = session.name.split(" ")[0] || session.name;

  return (
    <div>
      <DossierHeader
        name={session.name}
        progress={overview.overall}
        modeLabel="MON DOSSIER"
        subtitle={`Bonjour ${firstName} — de la candidature à l’arrivée en France.`}
      />

      {sp.proceeded === "1" && (
        <div className="mb-6 rounded-[var(--eef-radius)] border border-eef-blue/30 bg-white px-5 py-4">
          <p className="font-medium text-eef-navy">Étape documents enregistrée</p>
          <p className="mt-1 text-sm text-eef-secondary">
            Continuez avec une autre section ou ouvrez Mes documents.
          </p>
        </div>
      )}

      <div className="mb-8 rounded-[var(--eef-radius)] border-l-4 border-eef-blue bg-white px-5 py-4 text-sm text-eef-secondary">
        <strong className="text-eef-navy">Une seule fois.</strong> Ajoutez un document
        dans une section ou dans Mes documents : son statut est réutilisé partout où la
        même pièce est demandée.
      </div>

      {overview.nextTask && (
        <section className="eef-step-panel mb-8">
          <p className="eef-kicker">À faire aujourd’hui</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl text-eef-navy">
                {overview.nextTask.title}
              </h2>
              <p className="mt-2 text-sm text-eef-secondary">
                {overview.nextTask.description}
              </p>
            </div>
            <Link
              href={overview.nextTask.href}
              className="eef-btn-navy inline-flex h-11 shrink-0 items-center px-5"
            >
              {overview.nextTask.cta}
            </Link>
          </div>
        </section>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {overview.homeCards.map((card) => (
          <Link
            key={card.slug}
            href={card.href}
            className="group rounded-[var(--eef-radius)] border border-eef-soft bg-white p-6 transition hover:border-eef-blue/40 hover:shadow-[0_8px_22px_rgba(10,50,80,0.07)]"
          >
            <p className="eef-kicker">{card.eyebrow}</p>
            <h3 className="mt-2 font-display text-xl text-eef-navy">{card.title}</h3>
            <p className="mt-2 text-sm text-eef-secondary">{card.blurb}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="eef-btn-navy inline-flex h-9 items-center px-3 text-xs group-hover:bg-eef-deep">
                Ouvrir →
              </span>
              <span className="text-sm text-eef-secondary">{card.progress}%</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
