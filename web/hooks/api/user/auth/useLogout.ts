import { useMutation } from "@tanstack/react-query";
import { DELETE } from "@/lib/api";
import { toast } from "sonner";
import { MessageResponse } from "@/types";
import { DeleteRoutes } from "@/types/api/DeleteRoutes";
import useAuthUser from "@/hooks/store/auth/useAuthUser";


const useVerifyOtpUser = () => {
    const { logout } = useAuthUser();
    return useMutation({
        mutationFn: async () => {
            const response = await DELETE<MessageResponse>({
                route: DeleteRoutes.LogoutUser,
            });
            return response;
        },
        onSuccess: () => {
            logout();
            toast.success("Logout Successful");
        },
    });
};

export default useVerifyOtpUser;
