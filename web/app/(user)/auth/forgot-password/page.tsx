import { differenceInMinutes } from "date-fns";
import ForgotPasswordClient from "@/components/user/auth/forgot-password/ForgotPasswordClient";
import { ForgotPasswordTokenData } from "@/types";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ForgotPasswordPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : null;

  if (!token) {
    return <ForgotPasswordClient isTokenValid={false} tokenData={null} />;
  }

  let tokenData: ForgotPasswordTokenData | null = null;
  let isTokenValid = false;

  try {
    const [otp, encodedCreatedDate] = token.split("X_X");
    if (!otp || !encodedCreatedDate) {
      return <ForgotPasswordClient isTokenValid={false} tokenData={null} />;
    }

    const createdDate = decodeURIComponent(encodedCreatedDate);
    const linkCreatedAt = new Date(createdDate);
    const now = new Date();
    const minutesElapsed = differenceInMinutes(now, linkCreatedAt);
    isTokenValid = minutesElapsed < 5;

    tokenData = { otp, createdDate };
  } catch (error) {
    console.error("Error parsing token:", error);
    return <ForgotPasswordClient isTokenValid={false} tokenData={null} />;
  }

  return <ForgotPasswordClient isTokenValid={isTokenValid} tokenData={tokenData} />;
};

export default ForgotPasswordPage;
