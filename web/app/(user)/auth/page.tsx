import { memo } from "react";
import SigninClient from "@/components/user/auth/SigninClient";

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <SigninClient />
    </div>
  );
};

export default memo(Signin);
