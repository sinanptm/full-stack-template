"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomInput from "@/components/forms/elements/CustomInput";
import SubmitButton from "@/components/forms/elements/SubmitButton";
import { signupSchema } from "@/lib/schema";
import { SignupFormProps } from "@/types";
import Link from "next/link";

export type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = ({
    onSubmit,
    isLoading = false,
    className = "",
    submitButtonText = "Sign Up",

    showSignIn = true,
    signInText = "Already have an account?",
    signInLinkText = "Sign in",
    signInLink,

    defaultValues

}: SignupFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
        defaultValues,
    });

    const handleFormSubmit = async (data: SignupFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error("Signup form submission error:", error);
        }
    };

    const isFormLoading = isLoading || isSubmitting;

    return (
        <div className={`space-y-6 ${className}`}>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4"
                noValidate
            >
                <CustomInput
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    error={errors.name?.message}
                    autoComplete="name"
                    {...register("name")}
                />

                <CustomInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    autoComplete="email"
                    {...register("email")}
                />

                <CustomInput
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    autoComplete="new-password"
                    {...register("password")}
                />

                <CustomInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    error={errors.confirmPassword?.message}
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                />

                <SubmitButton
                    type="submit"
                    isLoading={isFormLoading}
                    disabled={isFormLoading}
                    className="w-full h-11"
                >
                    {submitButtonText}
                </SubmitButton>
            </form>

            {showSignIn && signInLink && (
                <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                        {signInText}{" "}
                    </span>
                    <Link
                        prefetch={false}
                        href={signInLink}
                        className="text-sm font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                        {signInLinkText}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default memo(SignupForm);