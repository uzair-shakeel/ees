import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { progressPercent } from "@/lib/application-status";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
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

    let application = await ServiceApplication.findOne({
      userId: session.userId,
      serviceId: service._id,
    });

    if (!application) {
      application = await ServiceApplication.create({
        userId: session.userId,
        serviceId: service._id,
        status: "in_progress",
      });
      await DocumentSubmission.insertMany(
        service.requirements.map((req) => ({
          applicationId: application!._id,
          requirementKey: req.key,
          status: "missing",
        })),
      );
    }

    const submissions = await DocumentSubmission.find({
      applicationId: application._id,
    }).lean();

    const slots = service.requirements.map((req) => {
      const sub = submissions.find((s) => s.requirementKey === req.key);
      return {
        key: req.key,
        label: req.label,
        description: req.description,
        required: req.required !== false,
        status: sub?.status ?? "missing",
        cloudinaryUrl: sub?.cloudinaryUrl ?? null,
        originalFilename: sub?.originalFilename ?? null,
        adminComment: sub?.adminComment ?? null,
        submissionId: sub?._id ? String(sub._id) : null,
      };
    });

    return NextResponse.json({
      service: {
        id: String(service._id),
        slug: service.slug,
        title: service.title,
        description: service.description,
      },
      application: {
        id: String(application._id),
        status: application.status,
        progress: progressPercent(service.requirements, submissions),
      },
      slots,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
