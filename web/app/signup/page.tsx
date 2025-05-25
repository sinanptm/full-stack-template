"use client";

import { memo } from "react";
import SignupForm from "@/components/forms/SignupForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSignupUser from "@/hooks/api/user/auth/useSignup";

const Signup = () => {
    const { mutate, isPending } = useSignupUser();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignupForm
                        onSubmit={mutate}
                        isLoading={isPending}
                        showSignIn={true}
                        signInLink="/signin"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(Signup);