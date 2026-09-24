import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export type DocumentStatus = "missing" | "pending" | "approved" | "rejected";

const DocumentSubmissionSchema = new Schema(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "ServiceApplication",
      required: true,
      index: true,
    },
    requirementKey: { type: String, required: true },
    status: {
      type: String,
      enum: ["missing", "pending", "approved", "rejected"],
      default: "missing",
    },
    cloudinaryUrl: { type: String, default: null },
    cloudinaryPublicId: { type: String, default: null },
    originalFilename: { type: String, default: null },
    adminComment: { type: String, default: null },
    reviewedAt: { type: Date, default: null },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

DocumentSubmissionSchema.index(
  { applicationId: 1, requirementKey: 1 },
  { unique: true },
);

export type IDocumentSubmission = InferSchemaType<typeof DocumentSubmissionSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const DocumentSubmission: Model<IDocumentSubmission> =
  mongoose.models.DocumentSubmission ||
  mongoose.model<IDocumentSubmission>("DocumentSubmission", DocumentSubmissionSchema);
