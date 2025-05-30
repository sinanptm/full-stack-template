import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import IHashService from "@/domain/interfaces/services/IHashService";
import IMailService from "@/domain/interfaces/services/IMailService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { NotFoundError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import { inject } from "inversify";
import { generateOtp } from "@/utils";
import { differenceInMinutes } from "date-fns";
import { CLIENT_URL, RESET_LINK_EXPIRATION_MINUTES } from "@/config";

interface ResetPasswordPayload {
  email: string;
  password: string;
  otp: string;
  createdDate: string;
}

export default class ResetPasswordUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Repositories.OtpRepository) private readonly otpRepository: IOtpRepository,
    @inject(Services.HashService) private readonly hashService: IHashService,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
    @inject(Services.MailService) private readonly mailService: IMailService,
  ) {}

  async forgotPassword({ email }: { email: string }) {
    const otp = generateOtp();
    const createdDate = new Date().toISOString();

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("User Not Found");
    }
    await this.otpRepository.deleteMany(email);
    await this.otpRepository.create(otp, email);

    const resetLink = `${CLIENT_URL}/auth/forgot-password/?token=${otp}X_X${encodeURIComponent(createdDate)}`;
    await this.mailService.sendPasswordResetLink({
      email,
      resetLink,
      name: user.name!,
    });
  }

  async exec({ email, password, otp, createdDate }: ResetPasswordPayload) {
    this.validatorService.validateEmailFormat(email);
    this.validatorService.validatePassword(password);
    this.validatorService.validateRequiredFields({ email, password, otp, createdDate });

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Verify the OTP exists in the database
    const storedOtp = await this.otpRepository.findOne(+otp, email);
    if (!storedOtp) {
      throw new UnauthorizedError("Invalid or expired reset link");
    }

    // Check if the link has expired (5 minutes)
    const linkCreatedAt = new Date(decodeURIComponent(createdDate));
    const now = new Date();

    if (differenceInMinutes(now, linkCreatedAt) > RESET_LINK_EXPIRATION_MINUTES) {
      // Clean up expired OTP
      await this.otpRepository.deleteMany(email);
      throw new UnauthorizedError("Reset link has expired");
    }

    // Verify the OTP from the database matches the creation time
    const otpCreatedAt = new Date(storedOtp.createdAt!);
    const timeDifferenceSeconds = Math.abs(linkCreatedAt.getTime() - otpCreatedAt.getTime()) / 1000;

    if (timeDifferenceSeconds > 10) {
      throw new UnauthorizedError("Invalid reset link");
    }

    // Update the password
    const hashedPassword = await this.hashService.hash(password);
    await this.userRepository.update(user._id!, { password: hashedPassword });

    // Clean up the used OTP
    await this.otpRepository.deleteMany(email);
  }
}
