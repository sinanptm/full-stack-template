"use client";

import { memo, useCallback } from "react";
import { notFound, useRouter } from "next/navigation";
import useMailSetter from "@/hooks/store/auth/useMailSetter";
import { ForgotPasswordTokenData } from "@/types";
import InvalidTokenState from "./InvalidTokenState";
import ResetPasswordForm from "./ResetPasswordForm";

interface ForgotPasswordClientProps {
  isTokenValid: boolean;
  tokenData: ForgotPasswordTokenData | null;
}

const ForgotPasswordClient = ({ isTokenValid, tokenData }: ForgotPasswordClientProps) => {
  const router = useRouter();
  const { email: storedEmail, clear } = useMailSetter();

  const handleBackToLogin = useCallback(() => {
    clear();
    router.push("/auth");
  }, [clear, router]);

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
        setTimeout(() => {
          router.push("/auth");
        }, 1);
      }}
    />
  );
};

export default memo(ForgotPasswordClient);
