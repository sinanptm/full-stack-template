import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IUser from "@/domain/entities/IUser";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IHashService from "@/domain/interfaces/services/IHashService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { ConflictError } from "@/domain/entities/CustomErrors";
import { inject } from "inversify";

export default class SignupUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
    @inject(Services.HashService) private readonly hashService: IHashService,
  ) {}

  async exec(data: IUser) {
    const { email, name, password } = this.validate(data)
    const existingUser = await this.userRepository.findByEmail(email!);
    if (existingUser) {
      throw new ConflictError("User with this email already exists");
    }

    const hashedPassword = await this.hashService.hash(password!);

    await this.userRepository.create({
      password: hashedPassword,
      email,
      name,
    });
  }

  private validate({ email, name, password }: IUser) {
    this.validatorService.validateRequiredFields({ email, name, password });
    this.validatorService.validateEmailFormat(email!);
    this.validatorService.validatePassword(password!);
    this.validatorService.validateLength(name!, 2, 50);

    return { email, name, password };
  }
}
