import { PostRoutes, PostRoutesWithParams } from "./PostRoutes";
import { GetRoutes, GetRoutesWithParams } from "./GetRoutes";
import { PutRoutes, PutRoutesWithParams } from "./PutRoutes";
import { DeleteRoutes, DeleteRoutesWithParams } from "./DeleteRoutes";
import { PatchRoutes, PatchRoutesWithParams } from "./PatchRoutes";

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
    TokenExpired = 498
}

export type Params = Record<string, string>;
export type Body = Record<string, any>;

export interface PostParams {
    route: PostRoutes | PostRoutesWithParams;
    params?: Params;
    body?: Body;
    url?: string;
}

export interface GetParams {
    route: GetRoutes | GetRoutesWithParams;
    params?: Params;
    url?: string;
}

export interface PutParams {
    route: PutRoutes | PutRoutesWithParams;
    params?: Params;
    body?: Body;
    url?: string;
}

export interface DeleteParams {
    route: DeleteRoutes | DeleteRoutesWithParams;
    params?: Params;
    body?: Body;
    url?: string;
}

export interface PatchParams {
    route: PatchRoutes | PatchRoutesWithParams;
    params?: Params;
    body?: Body;
    url?: string;
}

export interface MessageResponse {
    message: string;
}
