import { DateString } from "@/types";

export default interface IUser {
  readonly _id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
}
