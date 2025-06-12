"use client";

import SigninForm from "@/components/forms/SigninForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSigninAdmin from "@/hooks/api/admin/auth/useSignin";
import useAuthRedirectToast from "@/hooks/store/useAuthRedirectToast";

const SigninPage = () => {
  const { mutate, isPending } = useSigninAdmin();
  useAuthRedirectToast();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Sign In As admin</CardTitle>
        </CardHeader>
        <CardContent>
          <SigninForm
            onSubmit={mutate}
            showSignUp
            signUpLinkText="Login as User"
            signUpLink="/auth"
            isLoading={isPending}
            signUpText="Not an admin"
            defaultValues={{
              email: "admin@gmail.com",
              password: "fjfjfj",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default SigninPage;
