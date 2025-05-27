"use client";

import { memo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import useVerifyOtpUser from "@/hooks/api/user/auth/useVerifyOtp";
import useMailSetter from "@/hooks/store/auth/useMailSetter";
import useResendOtpUser from "@/hooks/api/user/auth/useResendOtp";
import dynamic from "next/dynamic";
const OtpVerificationForm = dynamic(() => import("@/components/forms/OtpVerificationForm"), { ssr: false });

const VerifyOtp = () => {
  const { email } = useMailSetter();
  const { mutate: handleVerifyOtp, isPending: isVerifying } = useVerifyOtpUser();
  const { mutate: handleResendOtp, isPending: isResending } = useResendOtpUser();
  const handleSubmit = useCallback((otp: number) => handleVerifyOtp({ otp, email }), [handleVerifyOtp]);
  const handleResend = useCallback(() => handleResendOtp({ email }), [handleResendOtp]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification code to your email address. Please enter the 6-digit code below to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OtpVerificationForm
            email={email}
            onSubmit={handleSubmit}
            onResendOtp={handleResend}
            isLoading={isVerifying}
            isResending={isResending}
            resendTimerDuration={60}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default memo(VerifyOtp);
