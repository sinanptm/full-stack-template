"use client";

import { memo, useCallback } from "react";
import { notFound, useRouter } from "next/navigation";
import useMailSetter from "@/hooks/store/auth/useMailSetter";
import InvalidTokenState from "@/components/user/forgot-password/InvalidTokenState";
import ResetPasswordForm from "@/components/user/forgot-password/ResetPasswordForm";
import { ForgotPasswordTokenData } from "@/types";

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