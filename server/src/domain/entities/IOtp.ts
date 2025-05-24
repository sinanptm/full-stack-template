import { DateString } from "@/types";

export default interface IOtp {
  readonly _id?: string;
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
  readonly email?: string;
  otp?: number;
}
