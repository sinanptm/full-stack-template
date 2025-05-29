import { PostRoutes, PostRoutesWithParams } from "./PostRoutes";
import { GetRoutes, GetRoutesWithParams } from "./GetRoutes";
import { PutRoutes, PutRoutesWithParams } from "./PutRoutes";
import { DeleteRoutes, DeleteRoutesWithParams } from "./DeleteRoutes";
import { PatchRoutes, PatchRoutesWithParams } from "./PatchRoutes";
import { UserRole } from "..";

export enum StatusCode {
  Success = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentError = 402,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  RateLimitExceeded = 429,
  TokenExpired = 498,
}

export type Params = Record<string, string>;
export type Body = Record<string, any>;

interface Role {
  role?: UserRole;
}

export interface PostParams extends Role {
  route: PostRoutes | PostRoutesWithParams;
  params?: Params;
  body?: Body;
  url?: string;
}

export interface GetParams extends Role {
  route: GetRoutes | GetRoutesWithParams;
  params?: Params;
  url?: string;
}

export interface PutParams extends Role {
  route: PutRoutes | PutRoutesWithParams;
  params?: Params;
  body?: Body;
  url?: string;
}

export interface DeleteParams extends Role {
  route: DeleteRoutes | DeleteRoutesWithParams;
  params?: Params;
  body?: Body;
  url?: string;
}

export interface PatchParams extends Role {
  route: PatchRoutes | PatchRoutesWithParams;
  params?: Params;
  body?: Body;
  url?: string;
}

export interface MessageResponse {
  message: string;
}

export interface TokenUserResponse extends MessageResponse {
  accessToken: string;
  user: {
    name: string;
    id: string;
    profile: string;
  };
}
