import { DeleteParams, GetParams, PatchParams, PostParams, PutParams, Params } from "@/types";
import createApiInstance from "./createApiInstance";

export const GET = async <T>({ route, params, url, role }: GetParams) => {
  const api = createApiInstance(role);
  const response = await api.get<T>(getRequestUrl(route, params, url));
  return response.data;
};

export const POST = async <T>({ route, params, body, url, role }: PostParams) => {
  const api = createApiInstance(role);
  const response = await api.post<T>(getRequestUrl(route, params, url), body);
  return response.data;
};

export const PUT = async <T>({ route, params, body, url, role }: PutParams) => {
  const api = createApiInstance(role);
  const response = await api.put<T>(getRequestUrl(route, params, url), body);
  return response.data;
};

export const DELETE = async <T>({ route, params, url, role }: DeleteParams) => {
  const api = createApiInstance(role);
  const response = await api.delete<T>(getRequestUrl(route, params, url));
  return response.data;
};

export const PATCH = async <T>({ route, params, url, role }: PatchParams) => {
  const api = createApiInstance(role);
  const response = await api.patch<T>(getRequestUrl(route, params, url));
  return response.data;
};

/**
 * Constructs a final request URL based on the provided route and parameters.
 *
 * @param route - A route string possibly containing parameter placeholders (e.g., "/users/:id").
 * @param params - An optional object mapping parameter names to their values.
 * @param url - An optional fully qualified custom URL to override route and params.
 * @returns The final request URL with placeholders replaced, or the custom URL if provided.
 */
const getRequestUrl = (route: string, params?: Params, url?: string): string => {
  if (url) {
    return url;
  }

  if (!params) {
    return route;
  }

  let finalUrl = route;

  Object.entries(params).forEach(([key, value]) => {
    const placeholder = `:${key}`;
    if (finalUrl.includes(placeholder)) {
      finalUrl = finalUrl.replace(placeholder, value);
    }
  });

  const unreplacedParams = finalUrl.match(/:\w+/g);
  if (unreplacedParams) {
    console.error(`Warning: Unreplaced parameters found in URL: ${unreplacedParams.join(", ")}`);
  }

  return finalUrl;
};
