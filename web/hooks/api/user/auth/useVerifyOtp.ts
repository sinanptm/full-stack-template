import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import { useRouter } from "next/navigation";
import { onError } from "@/lib/utils";
import { MessageResponse } from "@/types";


interface ForgotPasswordData {
    email: string;
    otp: number;
}

interface Response extends MessageResponse {
    accessToken: string;
    user: {
        name: string;
        id: string;
    };
}

const useVerifyOtpUser = () => {
    const { setToken, setUser } = useAuthUser();
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: ForgotPasswordData) => {
            const response = await POST<Response>({
                route: PostRoutes.VerifyOtpUser,
                body: data,
            });
            return response;
        },
        onSuccess: ({ accessToken, user, message }: Response) => {
            setToken(accessToken);
            setUser(user);
            router.push("/");
            toast.success(message, { icon: '🎉' });
        },
        onError
    });
};

export default useVerifyOtpUser;
