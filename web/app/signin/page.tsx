"use client";

import { memo } from "react";
import LoginForm from "@/components/forms/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSigninUser from "@/hooks/api/user/auth/useSignin";

const Signin = () => {
  const { mutate, isPending } = useSigninUser();

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm
            onSubmit={mutate}
            isLoading={isPending}
            showForgotPassword={true}
            signUpLink="/signup"
            forgotPasswordLink="forgotPasswordLink"
            showSignUp={true}
            defaultValues={{
              email: "demouse@gamail.com",
              password: "fjfjfj"
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(Signin);