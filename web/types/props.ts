import { ReactNode } from "react";
import { forgotPasswordSchema, otpVerificationSchema, resetPasswordSchema, signinSchema, signupSchema } from "@/lib/schema";
import { z } from "zod";

export interface WrapperProps {
  children: ReactNode;
}

export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type OtpVerificationFormData = z.infer<typeof otpVerificationSchema>;

export interface SigninFormProps {
  onSubmit: (data: SigninFormData) => void;
  isLoading?: boolean;
  className?: string;
  submitButtonText?: string;

  onForgotPassword?: () => void;
  showForgotPassword?: boolean;
  forgotPasswordText?: string;
  forgotPasswordLink?: string;

  showSignUp?: boolean;
  signUpText?: string;
  signUpLinkText?: string;
  signUpLink?: string;

  defaultValues?: {
    email?: string;
    password?: string;
  };
}
export interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  className?: string;
  onSubmit?: () => void;
}
export interface SignupFormProps {
  className?: string;
  submitButtonText?: string;
  showSignIn?: boolean;
  signInText?: string;
  signInLinkText?: string;
  signInLink?: string;
  defaultValues?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
}
export interface BaseFormFieldProps {
  label?: string;
  hint?: string;
  required?: boolean;
  showHint?: boolean;
  description?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}
export interface FormFieldWrapperProps extends BaseFormFieldProps {
  children: (id: string, describedBy: string | undefined) => React.ReactNode;
}
export interface ForgotPasswordTokenData {
  otp: string;
  createdDate: string;
}
export interface ResetPasswordFormProps {
  email: string;
  tokenData: ForgotPasswordTokenData;
  onBackToLogin: () => void;
  onSuccess: () => void;
}
export interface OtpVerificationFormProps {
  onSubmit: (otp: number) => void;
  onResendOtp: () => void;
  isLoading?: boolean;
  isResending?: boolean;
  className?: string;
  submitButtonText?: string;
  resendTimerDuration?: number;
  email: string;
}
