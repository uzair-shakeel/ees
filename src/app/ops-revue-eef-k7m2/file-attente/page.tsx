import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { ADMIN_APP_PATH } from "@/lib/admin-path";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { ServiceApplication } from "@/models/ServiceApplication";
import { Service } from "@/models/Service";
import { User } from "@/models/User";
import { StatusBadge } from "@/components/StatusBadge";

export default async function PendingQueuePage() {
  await connectDB();

  const pending = await DocumentSubmission.find({ status: "pending" })
    .sort({ updatedAt: -1 })
    .lean();

  const applicationIds = [...new Set(pending.map((p) => String(p.applicationId)))];
  const applications = await ServiceApplication.find({
    _id: { $in: applicationIds },
  }).lean();
  const [services, users] = await Promise.all([
    Service.find({
      _id: { $in: applications.map((a) => a.serviceId) },
    }).lean(),
    User.find({
      _id: { $in: applications.map((a) => a.userId) },
    }).lean(),
  ]);

  const items = pending.map((sub) => {
    const app = applications.find((a) => String(a._id) === String(sub.applicationId));
    const service = services.find((s) => String(s._id) === String(app?.serviceId));
    const user = users.find((u) => String(u._id) === String(app?.userId));
    const requirement = service?.requirements.find((r) => r.key === sub.requirementKey);
    return {
      id: String(sub._id),
      label: requirement?.label ?? sub.requirementKey,
      filename: sub.originalFilename,
      serviceTitle: service?.title ?? "—",
      serviceSlug: service?.slug ?? "",
      clientId: user ? String(user._id) : null,
      clientName: user?.name ?? "—",
      clientEmail: user?.email ?? "",
    };
  });

  return (
    <div>
      <header className="mb-10 border-b border-eef-soft pb-8">
        <p className="eef-kicker">Revue</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none text-eef-navy">
          File d&apos;attente
        </h1>
        <p className="mt-3 max-w-lg text-eef-secondary">
          Documents en attente — tous étudiants. {items.length} pièce(s).
        </p>
      </header>

      {items.length === 0 ? (
        <div className="eef-panel px-6 py-16 text-center text-eef-secondary">
          Rien en attente pour le moment.
        </div>
      ) : (
        <div className="eef-panel overflow-hidden">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="eef-row flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex gap-4">
                <span className="mt-1 font-mono text-xs text-eef-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-medium text-eef-navy">{item.label}</h2>
                    <StatusBadge status="pending" />
                  </div>
                  <p className="mt-1 text-sm text-eef-secondary">
                    {item.serviceTitle} · {item.clientName}
                  </p>
                  {item.filename && (
                    <p className="mt-1 text-xs text-eef-secondary">{item.filename}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:pl-4">
                {item.clientId && item.serviceSlug && (
                  <Link
                    href={`${ADMIN_APP_PATH}/students/${item.clientId}/services/${item.serviceSlug}`}
                    className="eef-btn-ghost px-3 py-2 text-sm"
                  >
                    Dossier
                  </Link>
                )}
                <Link
                  href={`${ADMIN_APP_PATH}/submissions/${item.id}`}
                  className="eef-btn-primary px-4 py-2 text-sm"
                >
                  Réviser
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
