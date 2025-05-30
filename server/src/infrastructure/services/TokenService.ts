import ITokenService, {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "@/domain/interfaces/services/ITokenService";
import { JwtPayload, TokenExpiredError, sign, verify, SignOptions } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/config";
import { CustomError, ForbiddenError } from "@/domain/entities/CustomErrors";

import { StatusCode } from "@/types";

export default class TokenService implements ITokenService {
  private signToken(payload: object, secret: string, options: SignOptions): string {
    return sign(payload, secret, { expiresIn: options.expiresIn });
  }
  private verifyToken(token: string, secret: string, type: "refresh" | "access"): JwtPayload {
    try {
      return verify(token, secret) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        if (type == "refresh") {
          throw new CustomError("Token expired", StatusCode.Forbidden);
        } else {
          throw new CustomError("Token expired", StatusCode.TokenExpired);
        }
      }
      throw new ForbiddenError("Invalid token");
    }
  }

  createRefreshToken({ email, id }: RefreshTokenPayload): string {
    return this.signToken({ email, id }, REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    const decoded = this.verifyToken(token, REFRESH_TOKEN_SECRET!, "refresh");
    return { email: decoded.email, id: decoded.id };
  }

  createAccessToken({ email, id, role }: AccessTokenPayload): string {
    return this.signToken({ email, id, role }, ACCESS_TOKEN_SECRET!, {
      expiresIn: "5m",
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const { email, id, role } = this.verifyToken(token, ACCESS_TOKEN_SECRET!, "access");
    return { email, id, role };
  }
}
