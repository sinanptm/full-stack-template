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

const useSignin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: SigninData) => {
            const response = await POST<MessageResponse>({
                route: PostRoutes.SignIn,
                body: data,
            });
            return response;
        },
        onSuccess: ({ message }: MessageResponse) => {
            toast.success(message, {
                icon: "🔑",
                duration: 3000,
                position: "top-center",
            });
            setTimeout(() => {
                router.push("/applications");
            }, 0);
        },
    });
};

export default useSignin;
