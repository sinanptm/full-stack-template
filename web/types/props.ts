import { ReactNode } from "react";
import { loginFormSchema } from "./schema";
import { string, z } from "zod";

export interface WrapperProps {
  children: ReactNode;
}


export type LoginFormData = z.infer<typeof loginFormSchema>;

export interface LoginFormProps {
  className?: string;
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  onGoogleLogin?: () => void;
  isLoading?: boolean;
  showGoogleLogin?: boolean;
  showForgotPassword?: boolean;
  showSignUpLink?: boolean;
  title?: string;
  description?: string;
  submitButtonText?: string;
  googleButtonText?: string;
  forgotPasswordText?: string;
  signUpText?: string;
  defaultValues?: Partial<LoginFormData>;
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

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void> | void;
  isLoading?: boolean;
  className?: string;
  submitButtonText?: string;

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
