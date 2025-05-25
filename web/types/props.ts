import { ReactNode } from "react";
import { signinSchema, signupSchema } from "@/lib/schema";
import { string, z } from "zod";

export interface WrapperProps {
  children: ReactNode;
}


export type LoginFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>

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
