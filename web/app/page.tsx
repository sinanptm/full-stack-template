"use client";

import dynamic from "next/dynamic";

const AuthButton = dynamic(() => import("@/components/AuthButton"), { ssr: false });

const Page = () => {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-4">
      <AuthButton />
    </div>
  );
};

export default Page;
