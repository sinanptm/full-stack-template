"use client";

import useMailSetter from "@/hooks/store/auth/useMailSetter";
import { WrapperProps } from "@/types";
import { notFound } from "next/navigation";

const OtpVerificationLayout = ({ children }: WrapperProps) => {
  const { email } = useMailSetter();

  if (!email) {
    notFound();
  } else {
    return children;
  }
};
export default OtpVerificationLayout;
