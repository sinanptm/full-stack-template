import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import { MessageResponse } from "@/types";
import { onError } from "@/lib/utils";

interface ForgotPasswordData {
    email: string;
}

const useForgotPasswordUser = () => {
    return useMutation({
        mutationFn: async (data: ForgotPasswordData) => {
            const response = await POST<MessageResponse>({
                route: PostRoutes.ForgotPasswordUser,
                body: data,
            });
            return response;
        },
        onSuccess: ({ message }: MessageResponse) => {
            toast.success(message);
        },
        onError
    });
};

export default useForgotPasswordUser;
