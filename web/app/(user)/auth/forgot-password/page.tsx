"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { differenceInMinutes } from "date-fns";
import useMailSetter from "@/hooks/store/auth/useMailSetter";
import LoadingState from "@/components/user/forgot-password/LoadingState";
import InvalidTokenState from "@/components/user/forgot-password/InvalidTokenState";
import ResetPasswordForm from "@/components/user/forgot-password/ResetPasswordForm";
import { ForgotPasswordTokenData } from "@/types";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? null; 
  const { email: storedEmail, clear } = useMailSetter();
  const [tokenData, setTokenData] = useState<ForgotPasswordTokenData | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      return;
    }

    try {
      const [otp, encodedCreatedDate] = token.split("X_X");
      if (!otp || !encodedCreatedDate) {
        setIsTokenValid(false);
        return;
      }

      const createdDate = decodeURIComponent(encodedCreatedDate);
      const linkCreatedAt = new Date(createdDate);
      const now = new Date();
      const minutesElapsed = differenceInMinutes(now, linkCreatedAt);
      const isValid = minutesElapsed < 5;

      setTokenData({ otp, createdDate });
      setIsTokenValid(isValid);
    } catch (error) {
      console.error("Error parsing token:", error);
      setIsTokenValid(false);
    }
  }, [token]);

  const handleBackToLogin = useCallback(() => {
    clear();
    router.push("/auth/signin");
  }, [clear, router]);

  if (isTokenValid === null) {
    return <LoadingState />;
  }

  if (!isTokenValid || !tokenData) {
    return <InvalidTokenState onBackToLogin={handleBackToLogin} />;
  }

  if (!storedEmail) {
    notFound();
  }

  return (
    <ResetPasswordForm
      email={storedEmail}
      tokenData={tokenData}
      onBackToLogin={handleBackToLogin}
      onSuccess={() => {
        clear();
        router.push("/auth");
      }}
    />
  );
};

export default memo(ForgotPasswordPage);
