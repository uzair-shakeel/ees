import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const DocumentRequirementSchema = new Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, required: true },
    required: { type: Boolean, default: true },
  },
  { _id: false },
);

const ServiceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [DocumentRequirementSchema], default: [] },
  },
  { timestamps: true },
);

export type IDocumentRequirement = InferSchemaType<typeof DocumentRequirementSchema>;
export type IService = InferSchemaType<typeof ServiceSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
