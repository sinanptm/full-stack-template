"use client";

import useAuthUser from "@/hooks/store/auth/useAuthUser";
import { WrapperProps } from "@/types";
import { notFound } from "next/navigation";

const AuthLayout = ({ children }: WrapperProps) => {
  const { isAuthenticated } = useAuthUser();

  if (isAuthenticated) {
    notFound();
  } else {
    return children;
  }
};
export default AuthLayout;
