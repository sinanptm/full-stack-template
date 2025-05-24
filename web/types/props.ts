import { ReactNode } from "react";
import { loginFormSchema } from "./schema";
import { z } from "zod";

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