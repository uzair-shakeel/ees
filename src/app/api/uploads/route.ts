import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { uploadDocument } from "@/lib/cloudinary";
import { refreshApplicationStatus } from "@/lib/application-status";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";

export async function POST(request: Request) {
  try {
    const session = await requireSession("CLIENT");
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get("file");
    const applicationId = String(form.get("applicationId") || "");
    const requirementKey = String(form.get("requirementKey") || "");

    if (!(file instanceof File) || !applicationId || !requirementKey) {
      return NextResponse.json({ error: "Fichier et champs requis manquants." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)." }, { status: 400 });
    }

    await connectDB();

    const application = await ServiceApplication.findOne({
      _id: applicationId,
      userId: session.userId,
    });
    if (!application) {
      return NextResponse.json({ error: "Dossier introuvable." }, { status: 404 });
    }

    const service = await Service.findById(application.serviceId);
    if (!service) {
      return NextResponse.json({ error: "Service introuvable." }, { status: 404 });
    }

    const requirement = service.requirements.find((r) => r.key === requirementKey);
    if (!requirement) {
      return NextResponse.json({ error: "Document non requis pour ce service." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadDocument(buffer, file.name, file.type || "application/octet-stream");

    const submission = await DocumentSubmission.findOneAndUpdate(
      { applicationId: application._id, requirementKey },
      {
        status: "pending",
        cloudinaryUrl: uploaded.url,
        cloudinaryPublicId: uploaded.publicId,
        originalFilename: file.name,
        adminComment: null,
        reviewedAt: null,
        reviewedBy: null,
      },
      { upsert: true, new: true },
    );

    await refreshApplicationStatus(String(application._id), service.requirements);

    return NextResponse.json({
      submission: {
        id: String(submission._id),
        requirementKey: submission.requirementKey,
        status: submission.status,
        cloudinaryUrl: submission.cloudinaryUrl,
        originalFilename: submission.originalFilename,
        adminComment: submission.adminComment,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Échec du téléversement." }, { status: 500 });
  }
}
