import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ clerkId: 1, email: 1 }, { unique: true });

export default mongoose.models.User || model<IUser>("User", UserSchema);
