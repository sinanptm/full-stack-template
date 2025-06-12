import {
  signinSchema,
  signupSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
  otpVerificationSchema,
} from "@/lib/schema";
import { z } from "zod";

export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type OtpVerificationFormData = z.infer<typeof otpVerificationSchema>;

export interface ForgotPasswordTokenData {
  otp: string;
  createdDate: string;
}
