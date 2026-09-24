import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ModuleChecklistSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    module: {
      type: String,
      enum: ["visa", "installation"],
      required: true,
    },
    stepKey: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },
  },
  { timestamps: true },
);

ModuleChecklistSchema.index({ userId: 1, module: 1, stepKey: 1 }, { unique: true });

export type IModuleChecklist = InferSchemaType<typeof ModuleChecklistSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ModuleChecklist: Model<IModuleChecklist> =
  mongoose.models.ModuleChecklist ||
  mongoose.model<IModuleChecklist>("ModuleChecklist", ModuleChecklistSchema);
