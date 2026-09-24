import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export type UserRole = "CLIENT" | "ADMIN";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["CLIENT", "ADMIN"], required: true },
  },
  { timestamps: true },
);

export type IUser = InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
