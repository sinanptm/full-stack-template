import { useMutation } from "@tanstack/react-query";
import { DELETE } from "@/lib/api";
import { toast } from "sonner";
import { MessageResponse } from "@/types";
import { DeleteRoutes } from "@/types/api/DeleteRoutes";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import { onError } from "@/lib/utils";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const { logout } = useAuthUser();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await DELETE<MessageResponse>({
        route: DeleteRoutes.LogoutUser,
      });
      return response;
    },
    onSuccess: ({ message }) => {
      logout();
      router.push("/auth");
      toast.success(message);
    },
    onError,
  });
};

export default useLogout;
