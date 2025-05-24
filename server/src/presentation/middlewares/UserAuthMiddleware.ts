import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode, UserRole } from "@/types";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import { inject } from "inversify";
import { Services } from "@/di/services";

export default class UserAuthMiddleware {
    constructor(
        @inject(Services.TokenService) private readonly tokenService: ITokenService
    ) {
        this.exec = this.exec.bind(this);
    }

    exec(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                res.status(StatusCode.Unauthorized).json({
                    message: "Authentication failed: Missing or invalid Bearer token",
                });
                return;
            }

            const tokenString = authHeader.split(" ")[1];
            const { email, id, role } = this.tokenService.verifyAccessToken(tokenString);

            if (!id || !email || !role) {
                res.status(StatusCode.Unauthorized).json({
                    message: "Authentication failed: Incomplete user data in token",
                });
                return;
            }

            if (role !== UserRole.User) {
                res.status(StatusCode.Forbidden).json({
                    message: "Access denied: User role required",
                });
                return;
            }

            req.user = { email, id };
            next();
        } catch (error: any) {
            let message = "Authentication failed: Invalid access token";
            if (error.message === "Token Expired") {
                message = "Authentication failed: Access token has expired";
            }
            res.status(StatusCode.Unauthorized).json({ message });
        }
    }
}