import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";
import { DELETE } from "@/lib/api";
import { MessageResponse } from "@/types";
import { DeleteRoutes } from "@/types/api/DeleteRoutes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { onError } from "@/lib/utils";


const useLogoutAdmin = () => {
    const { logout } = useAuthAdmin();
    return useMutation({
        mutationFn: async () => {
            const response = await DELETE<MessageResponse>({
                route: DeleteRoutes.LogoutAdmin,
            });
            return response;
        },
        onSuccess: ({ message }) => {
            logout();
            toast.success(message);
        },
        onError
    });
};

export default useLogoutAdmin;