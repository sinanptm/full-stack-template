import { ReactNode } from "react";
import { ForgotPasswordTokenData, SigninFormData } from "./form";

export interface WrapperProps {
  children: ReactNode;
}
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
