import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { SERVER_URL } from "@/config";
import { UserRole } from "@/types";
import { StatusCode } from "@/types/api";
import { GetRoutes } from "@/types/api/GetRoutes";
import { clearAuthData, getTokenKey } from "../utils";
import { toast } from "sonner";

const createApiInstance = (role: UserRole): AxiosInstance => {
  const tokenKey = getTokenKey(role);

  const api = axios.create({
    baseURL: `${SERVER_URL}/api`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // eslint-disable-next-line
  const refreshAuthLogic = async (failedRequest: any) => {
    try {
      const response = await axios.get(`${SERVER_URL}/api${GetRoutes.RefreshToken}`, {
        withCredentials: true,
      });

      const { accessToken } = response.data;
      localStorage.setItem(tokenKey, accessToken);
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
      return Promise.resolve();
      //eslint-disable-next-line
    } catch (error: any) {
      const reason = error?.response?.data?.message || "Failed to refresh authentication token";
      clearAuthData(role, { reason });
      return Promise.reject(error);
    }
  };

  createAuthRefreshInterceptor(api, refreshAuthLogic, {
    statusCodes: [StatusCode.TokenExpired],
    retryInstance: api,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Unknown error occurred";

      if (status === StatusCode.Forbidden) {
        clearAuthData(role, { reason: message });
        setTimeout(() => {
          toast.error(message);
          console.log("HERE ");
        }, 2400);
      }

      return Promise.reject({ ...error, status, message });
    },
  );

  return api;
};

export const AdminAPI = createApiInstance(UserRole.Admin);
export const UserAPI = createApiInstance(UserRole.User);

export const getApiByRole = (role: UserRole = UserRole.User) =>
  role === UserRole.Admin ? AdminAPI : UserAPI;
