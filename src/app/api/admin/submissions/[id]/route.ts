import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { refreshApplicationStatus } from "@/lib/application-status";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { ServiceApplication } from "@/models/ServiceApplication";
import { Service } from "@/models/Service";
import { User } from "@/models/User";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const session = await requireSession("ADMIN");
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const submission = await DocumentSubmission.findById(id).lean();
    if (!submission) {
      return NextResponse.json({ error: "Soumission introuvable." }, { status: 404 });
    }

    const application = await ServiceApplication.findById(submission.applicationId).lean();
    const service = application
      ? await Service.findById(application.serviceId).lean()
      : null;
    const client = application ? await User.findById(application.userId).lean() : null;
    const requirement = service?.requirements.find(
      (r) => r.key === submission.requirementKey,
    );

    return NextResponse.json({
      submission: {
        id: String(submission._id),
        requirementKey: submission.requirementKey,
        label: requirement?.label ?? submission.requirementKey,
        description: requirement?.description ?? "",
        status: submission.status,
        cloudinaryUrl: submission.cloudinaryUrl,
        originalFilename: submission.originalFilename,
        adminComment: submission.adminComment,
        updatedAt: submission.updatedAt,
      },
      client: client
        ? { id: String(client._id), name: client.name, email: client.email }
        : null,
      service: service
        ? { id: String(service._id), slug: service.slug, title: service.title }
        : null,
      application: application
        ? { id: String(application._id), status: application.status }
        : null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
