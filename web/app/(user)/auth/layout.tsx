"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import useHydrated from "@/hooks/useHydrated";
import { WrapperProps } from "@/types";
import { notFound } from "next/navigation";

const AuthLayout = ({ children }: WrapperProps) => {
  const { isAuthenticated } = useAuthUser();
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <LoadingOverlay loading />;
  }

  if (isAuthenticated) {
    notFound();
  }

  return children;
};

export default AuthLayout;