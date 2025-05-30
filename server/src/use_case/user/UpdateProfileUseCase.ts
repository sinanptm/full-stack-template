import { Repositories } from "@/di/repositories";
import { NotFoundError } from "@/domain/entities/CustomErrors";
import { IUserProfile } from "@/domain/entities/IUser";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import { inject } from "inversify";

export default class UpdateProfileUseCase {
    constructor(
        @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    ) { }

    async exec({ name, _id }: IUserProfile) {
        const user = await this.userRepository.update(_id!, { name });

        if (!user) {
            throw new NotFoundError("User Not Found");
        }

        const { password, token, updatedAt, isBlocked, createdAt, isOAuthUser, ...rest } = user;

        return rest;
    }
}