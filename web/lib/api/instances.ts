import axios, { AxiosInstance } from "axios";
import { SERVER_URL } from "@/config";
import { UserRole } from "@/types";

const createApiInstance = (role: UserRole): AxiosInstance => {
    const api = axios.create({
        baseURL: `${SERVER_URL}/api`,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    api.interceptors.request.use((config) => {
        const tokenKey = role === "Admin" ? "adminToken" : "userToken";
        const token = localStorage.getItem(tokenKey);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            error.statusCode = error.response?.status;
            error.userMessage = error.response?.data?.message || "An error occurred";
            return Promise.reject(error);
        },
    );

    return api;
};

export const AdminAPI = createApiInstance(UserRole.Admin);
export const UserAPI = createApiInstance(UserRole.User);
