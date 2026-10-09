import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { uploadDocument } from "@/lib/cloudinary";
import { syncRequirementAcrossUser } from "@/lib/document-vault";
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
    let applicationId = String(form.get("applicationId") || "");
    const requirementKey = String(form.get("requirementKey") || "");

    if (!(file instanceof File) || !requirementKey) {
      return NextResponse.json({ error: "Fichier et champs requis manquants." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)." }, { status: 400 });
    }

    await connectDB();

    let application = applicationId
      ? await ServiceApplication.findOne({
          _id: applicationId,
          userId: session.userId,
        })
      : null;

    if (!application) {
      const apps = await ServiceApplication.find({ userId: session.userId }).lean();
      const services = await Service.find({
        _id: { $in: apps.map((a) => a.serviceId) },
      }).lean();
      for (const app of apps) {
        const service = services.find((s) => String(s._id) === String(app.serviceId));
        if (service?.requirements.some((r) => r.key === requirementKey)) {
          application = await ServiceApplication.findById(app._id);
          applicationId = String(app._id);
          break;
        }
      }
    }

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

    await syncRequirementAcrossUser(session.userId, requirementKey, {
      status: "pending",
      cloudinaryUrl: uploaded.url,
      cloudinaryPublicId: uploaded.publicId,
      originalFilename: file.name,
      adminComment: null,
      reviewedAt: null,
      reviewedBy: null,
    });

    const submission = await DocumentSubmission.findOne({
      applicationId: application._id,
      requirementKey,
    });

    return NextResponse.json({
      submission: {
        id: submission ? String(submission._id) : null,
        requirementKey,
        status: "pending",
        cloudinaryUrl: uploaded.url,
        originalFilename: file.name,
        adminComment: null,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Échec du téléversement." }, { status: 500 });
  }
}
