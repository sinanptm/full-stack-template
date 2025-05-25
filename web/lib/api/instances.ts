import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "@/config";
import { Tokens, UserRole } from "@/types";
import { StatusCode } from "@/types/api";

interface QueuedRequest {
    resolve: (value: AxiosRequestConfig) => void;
    //eslint-disable-next-line
    reject: (reason: any) => void;
}

const createApiInstance = (role: UserRole): AxiosInstance => {
    const api = axios.create({
        baseURL: `${SERVER_URL}/api`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    // Store for queuing requests during token refresh
    let isRefreshing = false;
    let failedRequestQueue: QueuedRequest[] = [];

    // Process queued requests after token refresh
    // eslint-disable-next-line
    const processQueue = (error: any, token: string | null = null) => {
        failedRequestQueue.forEach(({ resolve, reject }) => {
            if (error) {
                reject(error);
            } else {
                resolve({ headers: { Authorization: `Bearer ${token}` } });
            }
        });
        failedRequestQueue = [];
    };

    // Request interceptor to attach token
    api.interceptors.request.use((config) => {
        const tokenKey = role === UserRole.Admin ? Tokens.Admin : Tokens.User;
        const token = localStorage.getItem(tokenKey);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    // Response interceptor to handle token refresh
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Check if error is due to token expiration (498) and not a retry attempt
            if (
                error.response?.status === StatusCode.TokenExpired &&
                error.response?.data?.message === "Token expired" &&
                !originalRequest._retry
            ) {
                if (isRefreshing) {
                    // If a refresh is already in progress, queue the request
                    return new Promise((resolve, reject) => {
                        failedRequestQueue.push({ resolve, reject });
                    })
                        .then((config) => {
                            //@ts-expect-error VALID TYPE
                            originalRequest.headers.Authorization = config.headers.Authorization;
                            return api(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;
                const tokenKey = role === UserRole.Admin ? Tokens.Admin : Tokens.User;

                try {
                    const response = await axios.get(`${SERVER_URL}/api/refresh-token`, {
                        withCredentials: true,
                    });
                    const { accessToken } = response.data;

                    localStorage.setItem(tokenKey, accessToken);

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    processQueue(null, accessToken);

                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem(tokenKey);
                    processQueue(refreshError);
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            error.status = error.response?.status;
            error.message = error.response?.data?.message || "An error occurred";
            return Promise.reject(error);
        },
    );

    return api;
};

export const AdminAPI = createApiInstance(UserRole.Admin);
export const UserAPI = createApiInstance(UserRole.User);

export const getApiByRole = (role: UserRole = UserRole.User) => {
    return role === UserRole.Admin ? AdminAPI : UserAPI;
};