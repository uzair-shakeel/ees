import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { isApplicationReady } from "@/lib/application-status";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";

type Params = { params: Promise<{ slug: string }> };

const SERVICE_ORDER = ["visa", "university"] as const;

export async function POST(_request: Request, { params }: Params) {
  try {
    const session = await requireSession("CLIENT");
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { slug } = await params;
    await connectDB();

    const service = await Service.findOne({ slug });
    if (!service) {
      return NextResponse.json({ error: "Service introuvable." }, { status: 404 });
    }

    const application = await ServiceApplication.findOne({
      userId: session.userId,
      serviceId: service._id,
    });
    if (!application) {
      return NextResponse.json({ error: "Dossier introuvable." }, { status: 404 });
    }

    // Already continued — still tell the client where to go next
    if (application.status !== "proceeded") {
      const submissions = await DocumentSubmission.find({
        applicationId: application._id,
      }).lean();

      if (!isApplicationReady(service.requirements, submissions)) {
        return NextResponse.json(
          { error: "Tous les documents obligatoires doivent être approuvés." },
          { status: 400 },
        );
      }

      await ServiceApplication.updateOne(
        { _id: application._id },
        { $set: { status: "proceeded", proceededAt: new Date() } },
      );
    }

    const apps = await ServiceApplication.find({ userId: session.userId }).lean();
    const services = await Service.find({
      slug: { $in: [...SERVICE_ORDER] },
    }).lean();
    const bySlug = new Map(services.map((s) => [s.slug, s]));

    let nextSlug: string | null = null;
    for (const ordered of SERVICE_ORDER) {
      if (ordered === slug) continue;
      const svc = bySlug.get(ordered);
      if (!svc) continue;
      const app = apps.find((a) => String(a.serviceId) === String(svc._id));
      // Treat the one we just proceeded as done for next-step calc
      const status =
        ordered === slug ? "proceeded" : app?.status ?? "in_progress";
      if (status !== "proceeded") {
        nextSlug = ordered;
        break;
      }
    }

    return NextResponse.json({
      ok: true,
      status: "proceeded",
      nextSlug,
      allDone: nextSlug === null,
    });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error && error.name === "ValidationError"
        ? "Statut dossier invalide — rechargez la page et réessayez."
        : "Erreur serveur.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
