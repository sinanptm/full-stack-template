"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import { WrapperProps } from "@/types";
import { notFound } from "next/navigation";

const AuthLayout = ({ children }: WrapperProps) => {
  const { isAuthenticated, isHydrated } = useAuthUser();

  if (!isHydrated) {
    return <LoadingOverlay loading />;
  }

  if (isAuthenticated) {
    notFound();
  }

  return children;
};

export default AuthLayout;
