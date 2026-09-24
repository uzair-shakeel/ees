import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const CandidatureSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    etablissement: { type: String, required: true, trim: true },
    programme: { type: String, required: true, trim: true },
    ville: { type: String, default: "", trim: true },
    niveau: { type: String, default: "", trim: true },
    voie: { type: String, default: "", trim: true },
    dateLimite: { type: Date, default: null },
    status: {
      type: String,
      enum: [
        "interesse",
        "en_preparation",
        "deposee",
        "en_attente",
        "acceptee",
        "refusee",
        "inscrit",
      ],
      default: "interesse",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export type ICandidature = InferSchemaType<typeof CandidatureSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Candidature: Model<ICandidature> =
  mongoose.models.Candidature || mongoose.model<ICandidature>("Candidature", CandidatureSchema);
