import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import { NotFoundError } from "@/domain/entities/CustomErrors";
import { IUserProfile } from "@/domain/entities/IUser";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { inject } from "inversify";

export default class UpdateProfileUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
  ) {}

  async exec({ name, _id }: IUserProfile) {
    this.validate(name!, _id!);

    const user = await this.userRepository.update(_id!, { name });

    if (!user) {
      throw new NotFoundError("User Not Found");
    }

    const { password, token, updatedAt, isBlocked, createdAt, isOAuthUser, ...rest } = user;

    return rest;
  }

  private validate(name: string, _id: string) {
    this.validatorService.validateIdFormat(_id!);
    this.validatorService.validateRequiredFields({ name });
    this.validatorService.validateLength(name!, 2, 50);
  }
}
