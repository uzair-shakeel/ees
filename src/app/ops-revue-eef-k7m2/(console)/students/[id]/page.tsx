import Link from "next/link";
import { notFound } from "next/navigation";
import { ADMIN_APP_PATH } from "@/lib/admin-path";
import { getStudentDetail } from "@/lib/admin-students";
import { StatusBadge } from "@/components/StatusBadge";

type Props = { params: Promise<{ id: string }> };

export default async function StudentDetailPage({ params }: Props) {
  const { id } = await params;
  const student = await getStudentDetail(id);
  if (!student) notFound();

  return (
    <div>
      <Link
        href={ADMIN_APP_PATH}
        className="text-sm text-eef-secondary hover:text-eef-navy"
      >
        ← Étudiants
      </Link>

      <header className="mt-4 mb-10 border-b border-eef-soft pb-8">
        <p className="eef-kicker">Fiche</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none text-eef-navy">
              {student.name}
            </h1>
            <p className="mt-3 text-eef-secondary">{student.email}</p>
          </div>
          <div>
            <p className="eef-kicker mb-1">Global</p>
            <p className="font-display text-4xl text-eef-navy">{student.overallProgress}%</p>
            {student.pendingTotal > 0 && (
              <p className="mt-1 text-sm text-eef-deep">
                {student.pendingTotal} document(s) en revue
              </p>
            )}
          </div>
        </div>
        <div className="eef-progress mt-6 max-w-sm">
          <span style={{ width: `${student.overallProgress}%` }} />
        </div>
      </header>

      <h2 className="mb-4 font-display text-2xl text-eef-navy">Dossiers</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        {student.services.map((svc) => (
          <Link
            key={svc.slug}
            href={`${ADMIN_APP_PATH}/students/${student.id}/services/${svc.slug}`}
            className="eef-panel flex flex-col gap-5 p-6 hover:border-eef-border"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl text-eef-navy">{svc.title}</h3>
                <p className="mt-2 text-sm text-eef-secondary">
                  {svc.slug === "visa"
                    ? "Passeport, ressources, hébergement, admission…"
                    : "Diplômes, notes, motivation, identité…"}
                </p>
              </div>
              <StatusBadge status={svc.status} />
            </div>

            <div className="eef-progress">
              <span style={{ width: `${svc.progress}%` }} />
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-eef-secondary">
              <span>
                <span className="text-eef-navy">{svc.missing}</span> manquant
              </span>
              <span>
                <span className="text-eef-deep">{svc.pending}</span> en revue
              </span>
              <span>
                <span className="text-eef-navy">{svc.approved}</span> ok
              </span>
              <span>
                <span className="text-eef-ink">{svc.rejected}</span> refusé
              </span>
            </div>

            <span className="text-sm text-eef-blue">Ouvrir les documents →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
