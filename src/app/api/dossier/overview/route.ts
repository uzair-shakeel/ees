import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { progressPercent } from "@/lib/application-status";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";

export async function GET() {
  try {
    const session = await requireSession("CLIENT");
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    await connectDB();

    const applications = await ServiceApplication.find({
      userId: session.userId,
    }).lean();
    const services = await Service.find({
      _id: { $in: applications.map((a) => a.serviceId) },
    }).lean();

    const items = await Promise.all(
      applications.map(async (app) => {
        const service = services.find((s) => String(s._id) === String(app.serviceId));
        const submissions = await DocumentSubmission.find({
          applicationId: app._id,
        }).lean();
        const progress = service
          ? progressPercent(service.requirements, submissions)
          : 0;
        const pending = submissions.filter((s) => s.status === "pending").length;
        const rejected = submissions.filter((s) => s.status === "rejected").length;
        const approved = submissions.filter((s) => s.status === "approved").length;

        return {
          applicationId: String(app._id),
          status: app.status,
          progress,
          pending,
          rejected,
          approved,
          totalRequired: service?.requirements.filter((r) => r.required !== false).length ?? 0,
          service: service
            ? {
                slug: service.slug,
                title: service.title,
                description: service.description,
              }
            : null,
        };
      }),
    );

    const overall =
      items.length === 0
        ? 0
        : Math.round(items.reduce((sum, i) => sum + i.progress, 0) / items.length);

    return NextResponse.json({ items, overallProgress: overall });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
