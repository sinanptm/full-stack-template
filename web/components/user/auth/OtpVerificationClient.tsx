"use client";

import { useCallback } from "react";
import useVerifyOtpUser from "@/hooks/api/user/auth/useVerifyOtp";
import useMailSetter from "@/hooks/store/auth/useMailSetter";
import useResendOtpUser from "@/hooks/api/user/auth/useResendOtp";
import OtpVerificationForm from "@/components/forms/OtpVerificationForm";

const OtpVerificationClient = () => {
  const { email } = useMailSetter();
  const { mutate: handleVerifyOtp, isPending: isVerifying } = useVerifyOtpUser();
  const { mutate: handleResendOtp, isPending: isResending } = useResendOtpUser();
  const handleSubmit = useCallback(
    (otp: number) => handleVerifyOtp({ otp, email }),
    [handleVerifyOtp, email],
  );
  const handleResend = useCallback(() => handleResendOtp({ email }), [handleResendOtp, email]);

  return (
    <OtpVerificationForm
      email={email}
      onSubmit={handleSubmit}
      onResendOtp={handleResend}
      isLoading={isVerifying}
      isResending={isResending}
      resendTimerDuration={60}
    />
  );
};
export default OtpVerificationClient;
