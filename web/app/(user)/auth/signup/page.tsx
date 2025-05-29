import { memo } from "react";
import SignupForm from "@/components/forms/SignupForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import OAuthButtons from "@/components/user/auth/OAuthButtons";

export const metadata: Metadata = {
  title: "Signup",
};

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <OAuthButtons className="mb-4" />
          <SignupForm showSignIn={true} signInLink="/auth" />
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(Signup);
