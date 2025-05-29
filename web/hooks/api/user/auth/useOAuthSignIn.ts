"use client";

import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import type { TokenUserResponse } from "@/types";
import { onError } from "@/lib/utils";

interface OAuthData {
    name: string;
    email: string;
    accessToken: string;
    profile: string | null;
}

const useOAuthSignIn = () => {
    return useMutation({
        mutationFn: async (data: OAuthData) => {
            const response = await POST<TokenUserResponse>({
                route: PostRoutes.OAuthSignIn,
                body: data,
            });
            return response;
        },
        onSuccess: ({ message }: TokenUserResponse) => {
            toast.success(message);
        },
        onError,
    });
};

export default useOAuthSignIn;
