"use client";
import { memo, useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { differenceInMinutes } from "date-fns";
import useForgotPassword from "@/hooks/store/auth/useForgetPassword";
import LoadingState from "@/components/user/forgot-password/LoadingState";
import InvalidTokenState from "@/components/user/forgot-password/InvalidTokenState";
import ResetPasswordForm from "@/components/user/forgot-password/ResetPasswordForm";

interface TokenData {
  otp: string;
  createdDate: string;
}

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [token] = useQueryState("token");
  const { email: storedEmail, clear } = useForgotPassword();
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!storedEmail) {
      router.push("/signin");
    }
  }, [storedEmail, router]);

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

  const handleBackToLogin = () => {
    clear();
    router.push("/signin");
  };

  if (isTokenValid === null) {
    return <LoadingState />;
  }

  if (!isTokenValid || !tokenData) {
    return <InvalidTokenState onBackToLogin={handleBackToLogin} />;
  }

  return (
    <ResetPasswordForm
      email={storedEmail}
      tokenData={tokenData}
      onBackToLogin={handleBackToLogin}
      onSuccess={() => {
        clear();
        router.push("/signin");
      }}
    />
  );
};

export default memo(ForgotPasswordPage);