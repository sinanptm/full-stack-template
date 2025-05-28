"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import CustomInput from "@/components/forms/elements/CustomInput";
import SubmitButton from "@/components/forms/elements/SubmitButton";
import useResetPasswordUser from "@/hooks/api/user/auth/useResetPassword";
import { resetPasswordSchema } from "@/lib/schema";
import type { ResetPasswordFormData, ResetPasswordFormProps } from "@/types";

const ResetPasswordForm = ({ email, tokenData, onBackToLogin, onSuccess }: ResetPasswordFormProps) => {
  const { mutate: resetPassword, isPending } = useResetPasswordUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data: ResetPasswordFormData) => {
    resetPassword(
      {
        email,
        password: data.password,
        otp: +tokenData.otp,
        createdDate: tokenData.createdDate,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully!");
          onSuccess();
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-xl">Reset Your Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
            <CustomInput
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              error={errors.password?.message}
              autoComplete="new-password"
              disabled={isPending}
              {...register("password")}
            />

            <CustomInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              disabled={isPending}
              {...register("confirmPassword")}
            />

            <div className="space-y-2">
              <SubmitButton type="submit" isLoading={isPending} disabled={!isValid} className="w-full h-11">
                Reset Password
              </SubmitButton>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={onBackToLogin}
                disabled={isPending}
              >
                Back to Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(ResetPasswordForm);
