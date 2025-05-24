import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import { MessageResponse } from "@/types";

interface ResetPasswordData {
    email: string;
    password: string;
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
        onSuccess: ({ message }: MessageResponse) => {
            toast.success(message);
        },
    });
};

export default useResetPasswordUser;
