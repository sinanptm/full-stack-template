import { useMutation } from "@tanstack/react-query";
import { PUT } from "@/lib/api";
import { toast } from "sonner";
import { IUser, MessageResponse, UserRole } from "@/types";
import { onError } from "@/lib/utils";
import { PutRoutesWithParams } from "@/types/api/PutRoutes";

interface Response extends MessageResponse {
  user: IUser;
}

const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ _id, ...data }: IUser) => {
      const response = await PUT<Response>({
        route: PutRoutesWithParams.UpdateUser,
        body: data,
        params: {
          id: _id!,
        },
        role: UserRole.Admin,
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

export default useUpdateUser;
