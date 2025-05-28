"use client";

import Profile from "@/components/user/Profile";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import dynamic from "next/dynamic";

const AuthButton = dynamic(() => import("@/components/AuthButton"), { ssr: false });

const Page = () => {
  const { isAuthenticated } = useAuthUser();
  return (
    <div className="flex flex-col items-center min-h-screen space-y-5 justify-center gap-4">
      <AuthButton isAuthenticated={isAuthenticated} />
      {isAuthenticated && <Profile />}
    </div>
  );
};

export default Page;
