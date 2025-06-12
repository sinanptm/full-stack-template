"use client";

import { memo, useCallback, useState } from "react";
import SigninForm from "@/components/forms/SigninForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSigninUser from "@/hooks/api/user/auth/useSignin";
import ForgotPasswordDialog from "@/components/dialogs/ForgotPasswordDialog";
import useAuthRedirectToast from "@/hooks/store/useAuthRedirectToast";
import OAuthButtons from "./OAuthButtons";

const SigninClient = () => {
  const { mutate: handleSignin, isPending: isSigninPending } = useSigninUser();
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  useAuthRedirectToast();

  const handleOpenForgotPassword = useCallback(() => {
    setShowForgotPasswordDialog(true);
  }, []);

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <OAuthButtons className="mb-4" />
          <SigninForm
            onSubmit={handleSignin}
            isLoading={isSigninPending}
            showForgotPassword
            signUpLink="/auth/signup"
            forgotPasswordLink="/auth/forgot-password"
            showSignUp
            onForgotPassword={handleOpenForgotPassword}
          />
        </CardContent>
      </Card>
      <ForgotPasswordDialog open={showForgotPasswordDialog} onOpenChange={setShowForgotPasswordDialog} />
    </>
  );
};

export default memo(SigninClient);
