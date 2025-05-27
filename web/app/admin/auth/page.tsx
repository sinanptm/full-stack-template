'use client';
import SigninForm from "@/components/forms/SigninForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <SigninForm
                        onSubmit={() => { }}
                        showSignUp
                        signUpLinkText="Login as User"
                        signUpLink="/auth"
                        signUpText="Not an admin"
                    />
                </CardContent>
            </Card>
        </div>
    );
};
export default LoginPage;
