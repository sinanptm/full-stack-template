"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSigninUser from "@/hooks/api/user/auth/useSignin";
import { LoginFormData } from "@/types";
import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  const router = useRouter();
  const { mutate: signUser, isPending } = useSigninUser();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await signUser(data);
    } catch (error: any) {
      toast.error(error.userMessage || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/auth/signup");
  };

  const handleGoogleLogin = () => {
    toast.info("Google login not implemented yet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
          onSignUp={handleSignUp}
          onGoogleLogin={handleGoogleLogin}
          isLoading={isPending}
          showGoogleLogin={true}
          showForgotPassword={true}
          showSignUpLink={true}
          title="Welcome back"
          description="Sign in to your account to continue"
          submitButtonText="Sign In"
          defaultValues={{
            email: "test@example.com",
            password: "",
          }}
        />
      </div>
    </div>
  );
};


export default memo(LoginPage);