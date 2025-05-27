import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import { MessageResponse } from "@/types";
import { onError } from "@/lib/utils";

interface ResendOtpUser {
  email: string;
}

const useResendOtpUser = () => {
  return useMutation({
    mutationFn: async (data: ResendOtpUser) => {
      const response = await POST<MessageResponse>({
        route: PostRoutes.ResendOtpUser,
        body: data,
      });
      return response;
    },
    onSuccess: ({ message }: MessageResponse) => {
      toast.success(message);
    },
    onError,
  });
};

export default useResendOtpUser;
