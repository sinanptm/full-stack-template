import { DeleteParams, GetParams, PatchParams, PostParams, PutParams, Params } from "@/types";
import { getApiByRole } from "./instances";

export const GET = async <T>({ route, params, url, role }: GetParams) => {
  const api = getApiByRole(role);
  const response = await api.get<T>(getRequestUrl(route, params, url));
  return response.data;
};

export const POST = async <T>({ route, params, body, url, role }: PostParams) => {
  const api = getApiByRole(role);
  const response = await api.post<T>(getRequestUrl(route, params, url), body);
  return response.data;
};

export const PUT = async <T>({ route, params, body, url, role }: PutParams) => {
  const api = getApiByRole(role);
  const response = await api.put<T>(getRequestUrl(route, params, url), body);
  return response.data;
};

export const DELETE = async <T>({ route, params, url, role }: DeleteParams) => {
  const api = getApiByRole(role);
  const response = await api.delete<T>(getRequestUrl(route, params, url));
  return response.data;
};

export const PATCH = async <T>({ route, params, url, role }: PatchParams) => {
  const api = getApiByRole(role);
  const response = await api.patch<T>(getRequestUrl(route, params, url));
  return response.data;
};

const getRequestUrl = (route: string, params?: Params, url?: string) => {
  return url ? url : params ? `${route}/${params.id}` : route;
};
