import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export type ApplicationStatus = "in_progress" | "ready" | "proceeded";

const STATUS_ENUM = ["in_progress", "ready", "proceeded"] as const;

const ServiceApplicationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true, index: true },
    status: {
      type: String,
      enum: [...STATUS_ENUM],
      default: "in_progress",
    },
    proceededAt: { type: Date, default: null },
  },
  { timestamps: true },
);

ServiceApplicationSchema.index({ userId: 1, serviceId: 1 }, { unique: true });

export type IServiceApplication = InferSchemaType<typeof ServiceApplicationSchema> & {
  _id: mongoose.Types.ObjectId;
};

function ensureStatusEnum(model: Model<IServiceApplication>) {
  const path = model.schema.path("status") as unknown as {
    enumValues?: string[];
    validators?: Array<{ type?: string; enumValues?: string[]; validator?: (v: string) => boolean }>;
    options?: { enum?: string[] };
  };

  if (!path) return;

  const current = path.enumValues ?? path.options?.enum ?? [];
  if (current.includes("proceeded")) return;

  path.enumValues = [...STATUS_ENUM];
  if (path.options) path.options.enum = [...STATUS_ENUM];

  // Replace enum validators so document.save() accepts "proceeded"
  path.validators = (path.validators ?? []).filter((v) => v.type !== "enum");
  path.validators.push({
    type: "enum",
    enumValues: [...STATUS_ENUM],
    validator(v: string) {
      return STATUS_ENUM.includes(v as (typeof STATUS_ENUM)[number]);
    },
  });
}

const existing = mongoose.models.ServiceApplication as
  | Model<IServiceApplication>
  | undefined;

export const ServiceApplication: Model<IServiceApplication> = existing
  ? (ensureStatusEnum(existing), existing)
  : mongoose.model<IServiceApplication>("ServiceApplication", ServiceApplicationSchema);
