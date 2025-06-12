import { useMutation } from "@tanstack/react-query";
import { PUT } from "@/lib/api";
import { toast } from "sonner";
import { IUser, MessageResponse } from "@/types";
import { onError } from "@/lib/utils";
import { PutRoutes } from "@/types/api/PutRoutes";

interface Response extends MessageResponse {
  user: IUser;
}

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (data: IUser) => {
      const response = await PUT<Response>({
        route: PutRoutes.UpdateProfile,
        body: data,
      });
      return response;
    },
    onSuccess: ({ message, user }) => {
      toast.success(message);
      return { user };
    },
    onError,
  });
};

export default useUpdateProfile;
