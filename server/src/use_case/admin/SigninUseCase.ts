import { ADMIN_MAIL, ADMIN_PASSWORD } from "@/config";
import { Services } from "@/di/services";
import { ForbiddenError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import { UserRole } from "@/types";
import { inject } from "inversify";

// TODO: Need Store the admin details in db

interface Payload {
    email: string;
    password: string;
}

export default class AdminSigninUseCase {
    constructor(
        @inject(Services.TokenService) private readonly tokenService: ITokenService
    ) { }
    exec({ email, password }: Payload) {
        if (email !== ADMIN_MAIL || password !== ADMIN_PASSWORD) {
            throw new UnauthorizedError("Invalid email or password provided");
        };

        const { accessToken, refreshToken } = this.createToken(email);

        return { accessToken, refreshToken };
    }

    private createToken(email: string) {
        const accessToken = this.tokenService.createAccessToken({
            email,
            id: email,
            role: UserRole.Admin,
        });

        const refreshToken = this.tokenService.createRefreshToken({
            email,
            id: email,
        });

        return { refreshToken, accessToken };
    }

    async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; }> {
        if (!refreshToken) {
            throw new ForbiddenError("Unauthenticated");
        }
        const { id, email } = this.tokenService.verifyRefreshToken(refreshToken);

        const accessToken = this.tokenService.createAccessToken({ email, id, role: UserRole.Admin });

        return { accessToken };
    };
}