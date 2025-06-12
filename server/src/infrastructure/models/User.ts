import IUser from "@/domain/entities/IUser";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    token: { type: String },
    isBlocked: { type: Boolean, default: false },
    isOAuthUser: { type: Boolean, default: false },
    profile: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
