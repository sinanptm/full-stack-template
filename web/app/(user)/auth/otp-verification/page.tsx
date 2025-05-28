import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import OtpVerificationClient from "@/components/user/auth/OtpVerificationClient";

const VerifyOtp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We&apos;ve sent a verification code to your email address. Please enter the 6-digit code below to
            continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OtpVerificationClient />
        </CardContent>
      </Card>
    </div>
  );
};
export default memo(VerifyOtp);
