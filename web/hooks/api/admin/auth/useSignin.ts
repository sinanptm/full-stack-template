import { useMutation } from "@tanstack/react-query";
import { onError } from "@/lib/utils";
import { MessageResponse } from "@/types";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";

interface Payload {
  email: string;
  password: string;
}

interface Response extends MessageResponse {
  accessToken: string;
}

const useSigninAdmin = () => {
  const { setToken } = useAuthAdmin();
  return useMutation({
    mutationFn: async (body: Payload) => {
      const response = await POST<Response>({
        route: PostRoutes.AdminSignin,
        body,
      });
      toast.success(response.message);
      window.location.href = "/admin";
      setToken(response.accessToken);
    },
    onError,
  });
};

export default useSigninAdmin;
