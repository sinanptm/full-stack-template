import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MessageResponse } from "@/types";
import { onError } from "@/lib/utils";
import useMailSetter from "@/hooks/store/auth/useMailSetter";

interface SigninData {
  email: string;
  password: string;
}

interface Response extends MessageResponse {
  email: string;
}

const useSigninUser = () => {
  const router = useRouter();
  const { setEmail } = useMailSetter();
  return useMutation({
    mutationFn: async (data: SigninData) => {
      const response = await POST<Response>({
        route: PostRoutes.SigninUser,
        body: data,
      });
      return response;
    },
    onSuccess: ({ message, email }: Response) => {
      setEmail(email);
      toast.success(message);
      setTimeout(() => {
        router.push("/auth/otp-verification");
      }, 1000);
    },
    onError,
  });
};

export default useSigninUser;
