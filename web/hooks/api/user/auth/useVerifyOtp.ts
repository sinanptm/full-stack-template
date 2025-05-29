import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import { onError } from "@/lib/utils";
import { TokenUserResponse } from "@/types";
import useMailSetter from "@/hooks/store/auth/useMailSetter";
import useLoading from "@/hooks/store/useLoading";
import { useRouter } from "next/navigation";

interface ForgotPasswordData {
  email: string;
  otp: number;
}

const useVerifyOtpUser = () => {
  const { setToken, setUser } = useAuthUser();
  const { clear } = useMailSetter();
  const { setLoading } = useLoading();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      setLoading(true);
      const response = await POST<TokenUserResponse>({
        route: PostRoutes.VerifyOtpUser,
        body: data,
      });
      return response;
    },
    onSuccess: ({ accessToken, user, message }: TokenUserResponse) => {
      toast.success(message, { icon: "🎉" });
      setToken(accessToken);
      setUser(user);
      clear();
      setTimeout(() => {
        router.push("/");
        setLoading(false);
      }, 1000);
    },
    onError: (e) => {
      // for making the ui loading better
      setTimeout(() => {
        onError(e);
        setLoading(false);
      }, 400);
    },
  });
};

export default useVerifyOtpUser;
