"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/api/user/auth/useLogout";
import useAuthUser from "@/hooks/store/auth/useAuthUser";

const AuthButton = () => {
  const { isAuthenticated } = useAuthUser();
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-4">
      {isAuthenticated ? (
        <Button variant={"destructive"} onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <div className="flex gap-4">
          <Link href="/auth" prefetch={false}>
            <Button>Sign In</Button>
          </Link>
          <Link href="/auth/signup" prefetch={false}>
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
