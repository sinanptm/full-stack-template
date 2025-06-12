"use client";

import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";
import { WrapperProps } from "@/types";
import { notFound } from "next/navigation";

const AuthLayout = ({ children }: WrapperProps) => {
  const { isAuthenticated } = useAuthAdmin();

  if (isAuthenticated) {
    notFound();
  }
  return children;
};
export default AuthLayout;
