import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { syncRequirementAcrossUser } from "@/lib/document-vault";
import { User } from "@/models/User";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";

type Params = { params: Promise<{ id: string; slug: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const session = await requireSession("ADMIN");
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { id, slug } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Étudiant introuvable." }, { status: 404 });
    }

    const body = await request.json();
    const requirementKey = String(body.requirementKey || "");
    const decision = String(body.decision || "");
    const comment = String(body.comment || "").trim();

    if (decision !== "pending" && decision !== "approve" && decision !== "reject") {
      return NextResponse.json({ error: "Décision invalide." }, { status: 400 });
    }
    if (decision === "reject" && !comment) {
      return NextResponse.json(
        { error: "Un commentaire est obligatoire en cas de refus." },
        { status: 400 },
      );
    }

    await connectDB();

    const student = await User.findOne({ _id: id, role: "CLIENT" });
    if (!student) {
      return NextResponse.json({ error: "Étudiant introuvable." }, { status: 404 });
    }

    const service = await Service.findOne({ slug });
    if (!service) {
      return NextResponse.json({ error: "Section introuvable." }, { status: 404 });
    }

    const requirement = service.requirements.find((req) => req.key === requirementKey);
    if (!requirement) {
      return NextResponse.json(
        { error: "Ce document ne fait pas partie de la section." },
        { status: 400 },
      );
    }

    let application = await ServiceApplication.findOne({
      userId: student._id,
      serviceId: service._id,
    });
    if (!application) {
      application = await ServiceApplication.create({
        userId: student._id,
        serviceId: service._id,
        status: "in_progress",
      });
    }

    let submission = await DocumentSubmission.findOne({
      applicationId: application._id,
      requirementKey,
    });
    if (!submission) {
      submission = new DocumentSubmission({
        applicationId: application._id,
        requirementKey,
        status: "missing",
      });
      await submission.save();
    }

    const hasFile = Boolean(submission.cloudinaryUrl);
    const reviewedBy = new mongoose.Types.ObjectId(session.userId);
    const reviewedAt = new Date();

    let status: "missing" | "pending" | "approved" | "rejected";
    let adminComment: string | null = null;

    if (decision === "pending") {
      status = hasFile ? "pending" : "missing";
    } else if (decision === "approve") {
      status = "approved";
    } else {
      status = "rejected";
      adminComment = comment;
    }

    await syncRequirementAcrossUser(student._id, requirementKey, {
      status,
      cloudinaryUrl: submission.cloudinaryUrl,
      cloudinaryPublicId: submission.cloudinaryPublicId,
      originalFilename: submission.originalFilename,
      adminComment,
      reviewedAt: decision === "pending" ? null : reviewedAt,
      reviewedBy: decision === "pending" ? null : reviewedBy,
    });

    const updated = await DocumentSubmission.findOne({
      applicationId: application._id,
      requirementKey,
    });

    return NextResponse.json({
      submission: {
        id: updated ? String(updated._id) : String(submission._id),
        status: updated?.status ?? status,
        adminComment: updated?.adminComment ?? adminComment,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
