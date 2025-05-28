'use client';
import AuthButton from "@/components/user/AuthButton";
import Profile from "@/components/user/Profile";
import useAuthUser from "@/hooks/store/auth/useAuthUser";

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
