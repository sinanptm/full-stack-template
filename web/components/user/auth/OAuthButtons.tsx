"use client";

import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import useOAuthSignIn from "@/hooks/api/user/auth/useOAuthSignIn";
import { toast } from "sonner";
import Image from "next/image";

const OAuthButtons = ({ className = "" }: { className?: string }) => {
  const auth = getAuth();
  const { mutate } = useOAuthSignIn();

  const handleOAuthSignIn = useCallback(
    async (provider: GithubAuthProvider | GoogleAuthProvider) => {
      try {
        const result = await signInWithPopup(auth, provider);

        if (!result.user.email) {
          toast.error("Unable to get email from provider");
          return;
        }

        const firebaseIdToken = await result.user.getIdToken();

        const serverPayload = {
          name: result.user.displayName || "User",
          email: result.user.email,
          profile: result.user.photoURL,
          accessToken: firebaseIdToken,
        };

        mutate(serverPayload);
      } catch (error) {
        console.log(error);
      }
    },
    [mutate, auth],
  );

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <Button
        variant="outline"
        type="button"
        onClick={() => handleOAuthSignIn(new GithubAuthProvider())}
        className="flex items-center gap-2 h-11"
      >
        <Github size={18} />
        <span>Continue with GitHub</span>
      </Button>

      <Button
        variant="outline"
        type="button"
        onClick={() => handleOAuthSignIn(new GoogleAuthProvider())}
        className="flex items-center gap-2 h-11"
      >
        <Image alt="Google" src="/assets/google.svg" width={18} height={18} />
        <span>Continue with Google</span>
      </Button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
    </div>
  );
};

export default memo(OAuthButtons);
