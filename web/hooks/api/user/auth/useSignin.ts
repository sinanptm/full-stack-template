import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MessageResponse } from "@/types";

interface SigninData {
    email: string;
    password: string;
}

const useSigninUser = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: SigninData) => {
            const response = await POST<MessageResponse>({
                route: PostRoutes.SigninUser,
                body: data,
            });
            return response;
        },
        onSuccess: ({ message }: MessageResponse) => {
            toast.success(message);
            setTimeout(() => {
                router.push("/otp-verification");
            }, 1000);
        },
    });
};

export default useSigninUser;
