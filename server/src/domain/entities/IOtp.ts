export default interface IOtp {
  readonly _id?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly email?: string;
  otp?: number;
}
