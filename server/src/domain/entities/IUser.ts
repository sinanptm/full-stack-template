import { DateString } from "@/types";

export interface IUserProfile {
  readonly _id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly profile?: string;
}

export default interface IUser extends IUserProfile {
  readonly isOAuthUser?: boolean;
  readonly isBlocked?: boolean;
  readonly password?: string;
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
  readonly token?: string;
}

export type UserProfilePromise = Promise<IUserProfile | null>;
export type UserPromise = Promise<IUser | null>;
