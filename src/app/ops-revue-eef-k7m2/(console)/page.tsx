import Link from "next/link";
import { ADMIN_APP_PATH } from "@/lib/admin-path";
import { getStudentsOverview } from "@/lib/admin-students";

export default async function StudentsListPage() {
  const students = await getStudentsOverview();
  const needingReview = students.filter((s) => s.pendingTotal > 0).length;

  return (
    <div>
      <header className="mb-10 border-b border-eef-soft pb-8">
        <p className="eef-kicker">Console</p>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-eef-navy">
              Étudiants
            </h1>
            <p className="mt-3 max-w-lg text-eef-secondary">
              Ouvrez une fiche pour accéder aux dossiers Visa ou Université.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-eef-secondary">
            <p>
              <span className="font-medium text-eef-navy">{students.length}</span> inscrits
            </p>
            <p>
              <span className="font-medium text-eef-navy">{needingReview}</span> avec docs en
              revue
            </p>
          </div>
        </div>
      </header>

      {students.length === 0 ? (
        <div className="eef-panel px-6 py-16 text-center text-eef-secondary">
          Aucun étudiant inscrit pour le moment.
        </div>
      ) : (
        <div className="eef-panel overflow-hidden">
          {students.map((student, i) => (
            <Link
              key={student.id}
              href={`${ADMIN_APP_PATH}/students/${student.id}`}
              className="eef-row flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex min-w-0 items-start gap-4">
                <span className="mt-1 font-mono text-xs text-eef-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-xl text-eef-navy">{student.name}</p>
                  <p className="text-sm text-eef-secondary">{student.email}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-eef-secondary">
                    {student.services.map((svc) => (
                      <span key={svc.slug}>
                        {svc.slug === "visa"
                          ? "Visa"
                          : svc.slug === "university"
                            ? "Université"
                            : svc.title}{" "}
                        <span className="text-eef-navy">{svc.progress}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 sm:pl-4">
                {student.pendingTotal > 0 ? (
                  <span className="text-sm text-eef-deep">
                    {student.pendingTotal} en revue
                  </span>
                ) : (
                  <span className="text-sm text-eef-secondary">À jour</span>
                )}
                <div className="w-16 text-right">
                  <p className="font-display text-2xl text-eef-navy">
                    {student.overallProgress}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-eef-secondary">
                    %
                  </p>
                </div>
                <span className="text-eef-blue">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
