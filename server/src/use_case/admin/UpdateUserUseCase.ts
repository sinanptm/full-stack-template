import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import { NotFoundError } from "@/domain/entities/CustomErrors";
import IUser, { IUserProfile } from "@/domain/entities/IUser";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { inject } from "inversify";

export default class UpdateUserUseCase {
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

    return this.filterUser(user);
  }
  async blockUer(id: string) {
    this.validatorService.validateIdFormat(id);

    const user = await this.userRepository.findByIdWithCredentials(id);
    if (!user) {
      throw new NotFoundError("User Not Found");
    }

    await this.userRepository.update(id, { isBlocked: !user.isBlocked });
  }

  private validate(name: string, _id: string) {
    this.validatorService.validateIdFormat(_id!);
    this.validatorService.validateRequiredFields({ name });
    this.validatorService.validateLength(name!, 2, 50);
  }

  private filterUser(user: IUser) {
    const { password, token, updatedAt, isBlocked, createdAt, isOAuthUser, ...rest } = user;

    return rest;
  }
}
