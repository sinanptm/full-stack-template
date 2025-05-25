import { ReactNode } from "react";
import { forgotPasswordSchema, signinSchema, signupSchema } from "@/lib/schema";
import { string, z } from "zod";

export interface WrapperProps {
  children: ReactNode;
}


export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;


export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;


export interface SigninFormProps {
  onSubmit: (data: SigninFormData) => Promise<void> | void;
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
  onSubmit: (data: ForgotPasswordData) => void | Promise<void>;
  isLoading?: boolean;
  title?: string;
  description?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  className?: string;
}


export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void | Promise<void>;
  isLoading?: boolean;
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