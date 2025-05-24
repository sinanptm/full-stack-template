import { UserRole } from "@/types";

export interface RefreshTokenPayload {
  email: string;
  id: string;
}

export interface AccessTokenPayload extends RefreshTokenPayload {
  role: UserRole;
}

export default interface ITokenService {
  createRefreshToken(payload: RefreshTokenPayload): string;
  verifyRefreshToken(token: string): RefreshTokenPayload;
  createAccessToken(payload: AccessTokenPayload): string;
  verifyAccessToken(token: string): AccessTokenPayload;
}
