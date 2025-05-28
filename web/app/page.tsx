"use client";

import AuthButton from "@/components/user/AuthButton";
import Profile from "@/components/user/Profile";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import { Skeleton } from "@/components/ui/skeleton"

const Page = () => {
  const { isAuthenticated, isHydrated } = useAuthUser();

  // Show loading state until hydration is complete
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
      <AuthButton isAuthenticated={isAuthenticated} />
      {isAuthenticated && <Profile />}
    </div>
  );
}

export default Page;
