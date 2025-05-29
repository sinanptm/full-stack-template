import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import IFirebaseService from "@/domain/interfaces/services/IFirebaseService";
import { UnauthorizedError } from "@/domain/entities/CustomErrors";
import { inject, injectable } from "inversify";
import { UserRole } from "@/types";
import { IUserProfile } from "@/domain/entities/IUser";

interface OAuthPayload {
    name: string;
    email: string;
    accessToken: string;
    profile: string | null;
}

@injectable()
export default class OAuthUseCase {
    constructor(
        @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
        @inject(Services.TokenService) private readonly tokenService: ITokenService,
        @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
        @inject(Services.FirebaseService) private readonly firebaseService: IFirebaseService,
    ) { }

    async exec({ name, email, accessToken, profile }: OAuthPayload) {
        this.validatorService.validateRequiredFields({ name, email, accessToken });
        this.validatorService.validateEmailFormat(email);

        const firebaseUser = await this.firebaseService.verifyAccessToken(accessToken);

        if (!firebaseUser || firebaseUser.email !== email) {
            throw new UnauthorizedError("Invalid Firebase token");
        }

        let user = await this.userRepository.findByEmail(email);

        if (!user) {
            user = await this.userRepository.create({
                name,
                email,
                isOAuthUser: true,
                profile: profile!
            });
        }

        if (user.isBlocked) {
            throw new UnauthorizedError("Account is blocked");
        }

        const { accessToken: jwtAccessToken, refreshToken } = await this.createTokens(user);

        return {
            accessToken: jwtAccessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profile: user.profile,
            },
        };
    }

    private async createTokens(user: IUserProfile) {
        const accessToken = this.tokenService.createAccessToken({
            email: user.email!,
            id: user._id!.toString(),
            role: UserRole.User,
        });

        const refreshToken = this.tokenService.createRefreshToken({
            email: user.email!,
            id: user._id!.toString(),
        });

        await this.userRepository.update(user._id!, { token: refreshToken });

        return { accessToken, refreshToken };
    }
}