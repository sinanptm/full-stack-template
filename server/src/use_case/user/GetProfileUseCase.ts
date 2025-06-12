import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { inject } from "inversify";

interface Params {
  userId: string;
}

export default class GetProfileUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
  ) {}

  async exec({ userId }: Params) {
    this.validatorService.validateIdFormat(userId);

    const user = await this.userRepository.findById(userId);

    return user;
  }
}
