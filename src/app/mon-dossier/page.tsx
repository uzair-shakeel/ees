import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getModuleOverview } from "@/lib/dossier-overview";
import { DossierHeader } from "@/components/DossierHeader";
import { StatusBadge } from "@/components/StatusBadge";

export default async function ApercuPage({
  searchParams,
}: {
  searchParams: Promise<{ proceeded?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  const sp = await searchParams;
  const overview = await getModuleOverview(session.userId);

  return (
    <div>
      <DossierHeader
        name={session.name}
        progress={overview.overall}
        modeLabel="MON DOSSIER"
        subtitle="Votre projet d’études en France"
      />

      {sp.proceeded === "1" && (
        <div className="mb-6 rounded-[var(--eef-radius)] border border-eef-blue/30 bg-white px-5 py-4">
          <p className="font-medium text-eef-navy">Étape documents enregistrée</p>
          <p className="mt-1 text-sm text-eef-secondary">
            Continuez avec le visa, l’installation ou vos candidatures.
          </p>
        </div>
      )}

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

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Candidatures",
            value: overview.stats.candidatures,
            href: "/mon-dossier/candidatures",
          },
          {
            label: "Documents",
            value: overview.stats.documents,
            href: "/mon-dossier/documents",
          },
          {
            label: "Visa",
            value: `${overview.stats.visaProgress}%`,
            href: "/mon-dossier/visa",
          },
          {
            label: "Sauvegardés",
            value: overview.stats.saved,
            href: "/mon-dossier/sauvegardes",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-[var(--eef-radius)] border border-eef-soft bg-white px-4 py-4 transition hover:border-eef-blue/40"
          >
            <p className="font-display text-2xl text-eef-navy">{stat.value}</p>
            <p className="mt-1 text-xs text-eef-secondary">{stat.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 font-display text-xl text-eef-navy">Dossiers documents</h2>
      <div className="eef-panel mb-8 overflow-hidden">
        {overview.journey.map((step) => (
          <Link
            key={step.slug}
            href={`/mon-dossier/services/${step.slug}`}
            className="eef-row flex items-center justify-between gap-4 px-5 py-4"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-medium text-eef-navy">{step.title}</h3>
                <StatusBadge
                  status={
                    step.status === "locked" ? "in_progress" : step.status
                  }
                />
              </div>
              <p className="mt-1 text-xs text-eef-secondary">{step.progress}% validés</p>
            </div>
            <span className="text-eef-blue">→</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/mon-dossier/installation" className="text-eef-deep hover:underline">
          Installation ({overview.stats.installDone}/{overview.stats.installTotal})
        </Link>
        <span className="text-eef-border">·</span>
        <Link href="/mon-dossier/visa" className="text-eef-deep hover:underline">
          Visa ({overview.stats.visaDone}/{overview.stats.visaTotal})
        </Link>
      </div>
    </div>
  );
}
