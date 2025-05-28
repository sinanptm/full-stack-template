"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useLogout from "@/hooks/api/user/auth/useLogout";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import useHydrated from "@/hooks/useHydrated";

const AuthButton = () => {
  const { mutate } = useLogout();
  const { isAuthenticated } = useAuthUser();
  const isHydrated = useHydrated();

  const handleLogout = () => {
    mutate();
  };

  if (!isHydrated) {
    return (
      <div className="flex gap-4">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <Button variant="destructive" onClick={handleLogout}>
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