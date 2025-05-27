"use client";

import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTimer } from "react-timer-hook";
import CustomOTPInput from "@/components/forms/elements/OtpInput";
import SubmitButton from "@/components/forms/elements/SubmitButton";
import { Button } from "@/components/ui/button";
import { otpVerificationSchema } from "@/lib/schema";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { OtpVerificationFormData, OtpVerificationFormProps } from "@/types";

const OtpVerificationForm = ({
  onSubmit,
  onResendOtp,
  isLoading = false,
  isResending = false,
  className = "",
  submitButtonText = "Verify OTP",
  resendTimerDuration = 30,
  email,
}: OtpVerificationFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<OtpVerificationFormData>({
    resolver: zodResolver(otpVerificationSchema),
    mode: "all",
    defaultValues: {
      otp: "",
    },
  });
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + resendTimerDuration);

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp,
    autoStart: true,
  });

  const handleFormSubmit = ({ otp }: OtpVerificationFormData) => {
    onSubmit(+otp);
  };

  const handleResendOtp = useCallback(() => {
    if (email && !isRunning && !isResending) {
      onResendOtp();
      const newExpiryTime = new Date();
      newExpiryTime.setSeconds(newExpiryTime.getSeconds() + resendTimerDuration);
      restart(newExpiryTime, true);
    }
  }, [email, isRunning, isResending, onResendOtp, restart, resendTimerDuration]);

  const canResend = !isRunning && !isResending && email;

  const formatTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className={`space-y-6 ${className}`}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <CustomOTPInput
            label="Verification Code"
            description="Enter the 6-digit code sent to your email"
            maxLength={6}
            error={errors.otp?.message}
            disabled={isLoading}
            className="space-y-3"
            {...register("otp")}
            onChange={(value) => setValue("otp", value)}
          />

          <div className="flex items-center justify-between text-sm pt-2">
            <span className="text-muted-foreground">{"Didn't receive the code?"}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResendOtp}
              disabled={!canResend}
              className={cn(
                "h-auto p-0 font-medium",
                canResend
                  ? "text-primary hover:text-primary/80 hover:underline"
                  : "text-muted-foreground cursor-not-allowed",
              )}
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : isRunning ? (
                `Resend in ${formatTime}`
              ) : (
                "Resend Code"
              )}
            </Button>
          </div>
        </div>

        <SubmitButton isLoading={isLoading} className="w-full h-12 text-base">
          {submitButtonText}
        </SubmitButton>
      </form>
    </div>
  );
};

export default memo(OtpVerificationForm);
