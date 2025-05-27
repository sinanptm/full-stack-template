import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IHashService from "@/domain/interfaces/services/IHashService";
import IMailService from "@/domain/interfaces/services/IMailService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import { inject, injectable } from "inversify";
import { generateOtp } from "@/utils";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import { UserRole } from "@/types";

interface Payload {
  email: string;
  password: string;
}

@injectable()
export default class SigninUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
    @inject(Repositories.OtpRepository) private readonly otpRepository: IOtpRepository,
    @inject(Services.MailService) private readonly mailService: IMailService,
    @inject(Services.HashService) private readonly hashService: IHashService,
    @inject(Services.TokenService) private readonly tokenService: ITokenService,
  ) {}

  async exec({ email, password }: Payload) {
    this.validatorService.validateRequiredFields({ email, password });
    this.validatorService.validateEmailFormat(email);
    this.validatorService.validatePassword(password);

    const user = await this.userRepository.findByEmailWithCredentials(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await this.hashService.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    await this.sendMail(email, user.name!);

    return { email };
  }

  private async sendMail(email: string, name: string) {
    const otp = generateOtp();

    await this.otpRepository.deleteMany(email);

    await this.otpRepository.create(otp, email);

    await this.mailService.sendOtpMail({
      email,
      name,
      otp,
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; }> {
    if (!refreshToken) {
      throw new ForbiddenError("Unauthenticated");
    }
    const { id, email } = this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findById(id);
    if (!user) throw new UnauthorizedError("Unauthorized");

    if (user.isBlocked) throw new ForbiddenError("Account is blocked");

    const accessToken = this.tokenService.createAccessToken({ email, id, role: UserRole.User });

    return { accessToken };
  }
}
