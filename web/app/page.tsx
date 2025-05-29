"use client";

import Profile from "@/components/user/Profile";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { isAuthenticated, isHydrated } = useAuthUser();

  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center min-h-screen space-y-5 justify-center gap-4">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen space-y-5 justify-center gap-4">
      {!isAuthenticated && (
        <div className="flex gap-4">
          <Link href="/auth" prefetch={false}>
            <Button>Sign In</Button>
          </Link>
          <Link href="/auth/signup" prefetch={false}>
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
      {isAuthenticated && <Profile />}
    </div>
  );
};

export default Page;
