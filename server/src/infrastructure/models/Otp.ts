import IOtp from "@/domain/entities/IOtp";
import { model, Schema } from "mongoose";

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const OtpModel = model<IOtp>("Otp", otpSchema);
export default OtpModel;
