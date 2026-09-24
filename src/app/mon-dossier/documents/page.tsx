import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { progressPercent } from "@/lib/application-status";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { StatusBadge } from "@/components/StatusBadge";

export default async function DocumentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  await connectDB();
  const apps = await ServiceApplication.find({ userId: session.userId }).lean();
  const services = await Service.find({
    _id: { $in: apps.map((a) => a.serviceId) },
  }).lean();

  const vault = await Promise.all(
    apps.map(async (app) => {
      const service = services.find((s) => String(s._id) === String(app.serviceId));
      const submissions = await DocumentSubmission.find({
        applicationId: app._id,
      }).lean();
      const approved = submissions.filter((s) => s.status === "approved").length;
      const pending = submissions.filter((s) => s.status === "pending").length;
      const rejected = submissions.filter((s) => s.status === "rejected").length;
      const missing = submissions.filter((s) => s.status === "missing").length;
      return {
        slug: service?.slug ?? "",
        title: service?.title ?? "Service",
        description: service?.description ?? "",
        status: app.status as "in_progress" | "ready" | "proceeded",
        progress: service ? progressPercent(service.requirements, submissions) : 0,
        approved,
        pending,
        rejected,
        missing,
        total: submissions.length,
      };
    }),
  );

  const totalFiles = vault.reduce((s, v) => s + (v.total - v.missing), 0);

  return (
    <div>
      <div className="mb-8">
        <p className="eef-kicker">Coffre-fort</p>
        <h1 className="mt-2 font-display text-3xl text-eef-navy">Documents</h1>
        <p className="mt-1.5 max-w-xl text-eef-secondary">
          Vos pièces par dossier. Téléversez une fois — elles servent au visa et aux
          candidatures universitaires.
        </p>
        <p className="mt-3 text-sm text-eef-secondary">
          <strong className="text-eef-navy">{totalFiles}</strong> fichiers déposés
        </p>
      </div>

      <div className="eef-panel overflow-hidden">
        {vault.map((item) => (
          <Link
            key={item.slug}
            href={`/mon-dossier/services/${item.slug}`}
            className="eef-row flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-xl text-eef-navy">{item.title}</h2>
                <StatusBadge status={item.status} />
              </div>
              <p className="mt-1 text-sm text-eef-secondary line-clamp-1">
                {item.description}
              </p>
              <p className="mt-2 text-xs text-eef-secondary">
                {item.approved} validé · {item.pending} en revue · {item.rejected} refusé ·{" "}
                {item.missing} manquant
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-display text-2xl text-eef-navy">{item.progress}%</p>
              <span className="text-eef-blue">→</span>
            </div>
          </Link>
        ))}
        {vault.length === 0 && (
          <p className="px-5 py-10 text-center text-eef-secondary">
            Aucun dossier documents. Reconnectez-vous pour initialiser Visa et Université.
          </p>
        )}
      </div>
    </div>
  );
}
