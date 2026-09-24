import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const SavedItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: {
      type: String,
      enum: ["formation", "bourse", "logement"],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "", trim: true },
    url: { type: String, default: "", trim: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export type ISavedItem = InferSchemaType<typeof SavedItemSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SavedItem: Model<ISavedItem> =
  mongoose.models.SavedItem || mongoose.model<ISavedItem>("SavedItem", SavedItemSchema);
