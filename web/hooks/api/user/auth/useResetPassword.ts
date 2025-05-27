import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { onError } from "@/lib/utils";
import { MessageResponse } from "@/types";

interface ResetPasswordData {
  email: string;
  password: string;
  createdDate: string;
  otp: number;
}

const useResetPasswordUser = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await POST<MessageResponse>({
        route: PostRoutes.ResetPasswordUser,
        body: data,
      });
      return response;
    },
    onError,
  });
};

export default useResetPasswordUser;
