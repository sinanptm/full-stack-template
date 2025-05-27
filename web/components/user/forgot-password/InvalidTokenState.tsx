"use client";

import { memo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import ForgotPasswordDialog from "@/components/dialogs/ForgotPasswordDialog";

interface InvalidTokenStateProps {
  onBackToLogin: () => void;
}

const InvalidTokenState = ({ onBackToLogin }: InvalidTokenStateProps) => {
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl">Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired. Please request a new one.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={() => setShowForgotPasswordDialog(true)} className="w-full">
              Request New Reset Link
            </Button>
            <Button variant="ghost" onClick={onBackToLogin} className="w-full">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>

      <ForgotPasswordDialog
        open={showForgotPasswordDialog}
        onOpenChange={setShowForgotPasswordDialog}
        title="Request New Reset Link"
        onSubmit={() => setShowForgotPasswordDialog(false)}
        description="Enter your email address to receive a new password reset link."
      />
    </>
  );
};

export default memo(InvalidTokenState);
