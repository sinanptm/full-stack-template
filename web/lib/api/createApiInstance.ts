import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { SERVER_URL } from "@/config";
import { UserRole } from "@/types";
import { StatusCode } from "@/types/api";
import { clearAuthData, getTokenKey } from "../utils";
import { PostRoutes } from "@/types/api/PostRoutes";

const createApiInstance = (role: UserRole = UserRole.User): AxiosInstance => {
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
      const route = `${SERVER_URL}/api${role === UserRole.Admin ? PostRoutes.AdminRefresh : PostRoutes.UserRefresh}`;

      const response = await axios.post(
        route,
        {},
        {
          withCredentials: true,
        },
      );

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
      }

      return Promise.reject({ ...error, status, message });
    },
  );

  return api;
};

export default createApiInstance;
