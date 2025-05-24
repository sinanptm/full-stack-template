import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import useAuthUser from "@/hooks/store/useAuthUser";
import { useRouter } from "next/navigation";

interface ForgotPasswordData {
    email: string;
    otp: number;
}

interface Response {
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
        onSuccess: ({ accessToken, user }: Response) => {
            setToken(accessToken);
            setUser(user);
            router.push("/");
            toast.success("Otp verification success");
        },
    });
};

export default useVerifyOtpUser;
