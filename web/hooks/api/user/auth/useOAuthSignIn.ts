"use client";

import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import type { TokenUserResponse } from "@/types";
import { onError } from "@/lib/utils";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import useLoading from "@/hooks/store/useLoading";
import { useRouter } from "next/navigation";

interface OAuthData {
  name: string;
  email: string;
  accessToken: string;
  profile: string | null;
}

const useOAuthSignIn = () => {
  const { setToken, setUser } = useAuthUser();
  const { setLoading } = useLoading();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: OAuthData) => {
      setLoading(true);
      const response = await POST<TokenUserResponse>({
        route: PostRoutes.OAuthSignIn,
        body: data,
      });
      return response;
    },
    onSuccess: ({ accessToken, user, message }: TokenUserResponse) => {
      toast.success(message, { icon: "🎉" });
      setToken(accessToken);
      setUser(user);

      setTimeout(() => {
        router.push("/");
        setLoading(false);
      }, 1000);
    },
    onError: (e) => {
      setTimeout(() => {
        onError(e);
        setLoading(false);
      }, 400);
    },
  });
};

export default useOAuthSignIn;
