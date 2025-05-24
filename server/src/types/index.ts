import { Request } from "express";

export enum UserRole {
  Admin = "Admin",
  User = "User",
}

export enum Cookies {
  User = "user_token",
  Admin = "admin_token",
}

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
  RateLimitExceeded = 429
}

export type DateString = Date | string;

export interface CustomRequest extends Request {
  user?: {
    email: string;
    id: string;
  };
  admin?: {
    email: string;
    id: string;
  };
}
