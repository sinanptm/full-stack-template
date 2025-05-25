"use client";

import { memo, useCallback, useState } from "react";
import LoginForm from "@/components/forms/SigninForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSigninUser from "@/hooks/api/user/auth/useSignin";
import ForgotPasswordDialog from "@/components/dialogs/ForgotPasswordDialog";
import useForgotPasswordUser from "@/hooks/api/user/auth/useForgotPassword";

const Signin = () => {
  const { mutate: handleSignin, isPending: isSigninPending } = useSigninUser();
  const { mutate: handleForgotPassword, isPending: isForgotPasswordPending } = useForgotPasswordUser();
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);

  const handleOpenForgotPassword = useCallback(() => {
    setShowForgotPasswordDialog(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm
            onSubmit={handleSignin}
            isLoading={isSigninPending}
            showForgotPassword={true}
            signUpLink="/signup"
            forgotPasswordLink="/forgot-password"
            showSignUp={true}
            onForgotPassword={handleOpenForgotPassword}
            defaultValues={{
              email: "demouser@gmail.com",
              password: "fjfjfj"
            }}
          />
        </CardContent>
      </Card>
      <ForgotPasswordDialog
        open={showForgotPasswordDialog}
        onOpenChange={setShowForgotPasswordDialog}
        onSubmit={handleForgotPassword}
        isLoading={isForgotPasswordPending}
      />
    </div>
  );
};

export default memo(Signin);