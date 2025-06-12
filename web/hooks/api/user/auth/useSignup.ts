import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import { MessageResponse } from "@/types";
import { onError } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const useSignUpUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await POST<MessageResponse>({
        route: PostRoutes.SignupUser,
        body: data,
      });
      return response;
    },
    onSuccess: ({ message }: MessageResponse) => {
      toast.success(message, { duration: 2000 });
      router.push("/auth");
    },
    onError,
  });
};

export default useSignUpUser;
