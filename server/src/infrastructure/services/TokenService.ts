import ITokenService, {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "@/domain/interfaces/services/ITokenService";
import { JwtPayload, TokenExpiredError, sign, verify, SignOptions } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, NODE_ENV, REFRESH_TOKEN_SECRET } from "@/config";
import { ForbiddenError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import { injectable } from "inversify";

@injectable()
export default class TokenService implements ITokenService {
  private signToken(payload: object, secret: string, options: SignOptions): string {
    return sign(payload, secret, { expiresIn: options.expiresIn });
  }
  private verifyToken(token: string, secret: string): JwtPayload {
    try {
      return verify(token, secret) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError("Token Expired");
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
    const decoded = this.verifyToken(token, REFRESH_TOKEN_SECRET!);
    return { email: decoded.email, id: decoded.id };
  }

  createAccessToken({ email, id, role }: AccessTokenPayload): string {
    return this.signToken({ email, id, role }, ACCESS_TOKEN_SECRET!, {
      expiresIn: NODE_ENV !== "production" ? "10d" : "15m",
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const { email, id, role } = this.verifyToken(token, ACCESS_TOKEN_SECRET!);
    return { email, id, role };
  }
}
