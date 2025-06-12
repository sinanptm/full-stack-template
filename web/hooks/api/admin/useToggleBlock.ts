import { useMutation } from "@tanstack/react-query";
import { PATCH } from "@/lib/api";
import { toast } from "sonner";
import { IUser, MessageResponse, UserRole } from "@/types";
import { onError } from "@/lib/utils";
import { PatchRoutesWithParams } from "@/types/api/PatchRoutes";

const useToggleBlock = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await PATCH<MessageResponse>({
        route: PatchRoutesWithParams.ToggleBlock,
        params: {
          id,
        },
        role: UserRole.Admin,
      });
      return response;
    },
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError,
  });
};

export default useToggleBlock;
