import { DateString } from "@/types";

export interface IUserProfile {
  readonly _id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly isBlocked?: boolean;
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
}

export default interface IUser extends IUserProfile {
  readonly password?: string;
  readonly token?: string;
}

export type UserProfilePromise = Promise<IUserProfile | null>;
export type UserPromise = Promise<IUser | null>;