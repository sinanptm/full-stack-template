import AuthButton from "@/components/user/AuthButton";
import Profile from "@/components/user/Profile";

const Page = () => {
  return (
    <div className="flex flex-col items-center min-h-screen space-y-5 justify-center gap-4">
      <AuthButton />
      <Profile />
    </div>
  );
};

export default Page;
