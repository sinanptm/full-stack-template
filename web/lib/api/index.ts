import axios from "axios";
import { SERVER_URL } from "@/config";
import { DeleteParams, GetParams, PatchParams, PostParams, PutParams, Params } from "@/types";

const api = axios.create({
    baseURL: `${SERVER_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
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

export default api;

export const GET = async <T>({ route, params, url }: GetParams) => {
    const response = await api.get<T>(getRequestUrl(route, params, url));
    return response.data;
};

export const POST = async <T>({ route, params, body, url }: PostParams) => {
    const response = await api.post<T>(getRequestUrl(route, params, url), body);
    return response.data;
};

export const PUT = async <T>({ route, params, body, url }: PutParams) => {
    const response = await api.put<T>(getRequestUrl(route, params, url), body);
    return response.data;
};

export const DELETE = async <T>({ route, params, url }: DeleteParams) => {
    const response = await api.delete<T>(getRequestUrl(route, params, url));
    return response.data;
};

export const PATCH = async <T>({ route, params, url }: PatchParams) => {
    const response = await api.patch<T>(getRequestUrl(route, params, url));
    return response.data;
};

const getRequestUrl = (route: string, params?: Params, url?: string) => {
    return url ? url : params ? `${route}/${params.id}` : route;
};
