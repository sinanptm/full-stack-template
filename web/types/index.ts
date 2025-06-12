export * from "./props";
export * from "./api";
export * from "./state";
export * from "./form";

export enum UserRole {
  Admin = "Admin",
  User = "User",
}
export enum Tokens {
  User = "user_token",
  Admin = "admin_token",
}

export type DateString = Date | string;
export interface IUser {
  readonly _id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly isBlocked?: boolean;
  readonly createdAt?: DateString;
  readonly profile?: string;
}
