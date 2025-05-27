"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/forms/elements/CustomInput";
import SubmitButton from "@/components/forms/elements/SubmitButton";
import { signinSchema } from "@/lib/schema";
import { SigninFormData, SigninFormProps } from "@/types";
import Link from "next/link";

const SigninForm = ({
  onSubmit,
  isLoading = false,
  className = "",
  submitButtonText = "Sign In",
  showForgotPassword = true,
  forgotPasswordText = "Forgot your password?",
  forgotPasswordLink,
  onForgotPassword,
  showSignUp = true,
  signUpText = "Don't have an account?",
  signUpLinkText = "Sign up",
  signUpLink,
  defaultValues,
}: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
    defaultValues,
  });

  const handleFormSubmit = async (data: SigninFormData) => {
    onSubmit(data);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        <CustomInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />

        <div className="space-y-2">
          <CustomInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            autoComplete="current-password"
            {...register("password")}
          />

          {showForgotPassword && forgotPasswordLink && (
            <div className="flex justify-end">
              <Link
                className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                href={forgotPasswordLink}
                prefetch={false}
                onClick={(e) => {
                  if (onForgotPassword) {
                    e.preventDefault();
                    onForgotPassword();
                  }
                }}
              >
                {forgotPasswordText}
              </Link>
            </div>
          )}
        </div>

        <SubmitButton type="submit" isLoading={isLoading} className="w-full h-11">
          {submitButtonText}
        </SubmitButton>
      </form>

      {showSignUp && signUpLink && (
        <div className="text-center">
          <span className="text-sm text-muted-foreground">{signUpText} </span>
          <Link
            prefetch={false}
            href={signUpLink}
            className="text-sm font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            {signUpLinkText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default memo(SigninForm);
