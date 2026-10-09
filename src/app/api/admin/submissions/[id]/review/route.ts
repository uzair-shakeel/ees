import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { syncRequirementAcrossUser } from "@/lib/document-vault";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { ServiceApplication } from "@/models/ServiceApplication";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const session = await requireSession("ADMIN");
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const decision = String(body.decision || "");
    const comment = String(body.comment || "").trim();

    if (decision !== "approve" && decision !== "reject") {
      return NextResponse.json({ error: "Décision invalide." }, { status: 400 });
    }

    if (decision === "reject" && !comment) {
      return NextResponse.json(
        { error: "Un commentaire est obligatoire en cas de refus." },
        { status: 400 },
      );
    }

    await connectDB();

    const submission = await DocumentSubmission.findById(id);
    if (!submission) {
      return NextResponse.json({ error: "Soumission introuvable." }, { status: 404 });
    }

    if (
      submission.status !== "pending" &&
      submission.status !== "approved" &&
      submission.status !== "rejected"
    ) {
      return NextResponse.json({ error: "Ce document n'est pas en revue." }, { status: 400 });
    }

    const application = await ServiceApplication.findById(submission.applicationId);
    if (!application) {
      return NextResponse.json({ error: "Dossier introuvable." }, { status: 404 });
    }

    const status = decision === "approve" ? "approved" : "rejected";
    const adminComment = decision === "reject" ? comment : null;
    const reviewedAt = new Date();
    const reviewedBy = new mongoose.Types.ObjectId(session.userId);

    await syncRequirementAcrossUser(application.userId, submission.requirementKey, {
      status,
      cloudinaryUrl: submission.cloudinaryUrl,
      cloudinaryPublicId: submission.cloudinaryPublicId,
      originalFilename: submission.originalFilename,
      adminComment,
      reviewedAt,
      reviewedBy,
    });

    const updated = await DocumentSubmission.findById(id);

    return NextResponse.json({
      submission: {
        id: String(submission._id),
        status: updated?.status ?? status,
        adminComment: updated?.adminComment ?? adminComment,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
