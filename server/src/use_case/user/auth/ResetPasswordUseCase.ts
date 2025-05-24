import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import IHashService from "@/domain/interfaces/services/IHashService";
import IMailService from "@/domain/interfaces/services/IMailService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { NotFoundError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import { inject, injectable } from "inversify";
import { generateOtp } from "@/utils";
import { differenceInMinutes } from "date-fns";
import { OTP_EXPIRATION_MINUTES } from "@/config";

interface Payload {
    email: string;
    password: string;
    otp: string;
}

@injectable()
export default class ResetPasswordUseCase {
    constructor(
        @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
        @inject(Repositories.OtpRepository) private readonly otpRepository: IOtpRepository,
        @inject(Services.HashService) private readonly hashService: IHashService,
        @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
        @inject(Services.MailService) private readonly mailService: IMailService,
    ) { }

    async initiate({ email }: { email: string; }) {
        const otp = generateOtp();

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError("User Not Found");
        }
        await this.otpRepository.deleteMany(email);
        await this.otpRepository.create(otp, email);

        await this.mailService.sendOtpMail({
            email,
            otp,
            name: user.name!,
            type: "password-reset",
        });
    }

    async exec({ email, password, otp }: Payload) {
        this.validatorService.validateEmailFormat(email);
        this.validatorService.validatePassword(password);
        this.validatorService.validateRequiredFields({ email, password, otp });

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError("User not found");
        }


        const storedOtp = await this.otpRepository.findOne(+otp, email);
        if (!storedOtp) {
            throw new UnauthorizedError("Invalid or expired OTP");
        }

        const otpCreatedAt = new Date(storedOtp.createdAt!);
        const now = new Date();

        if (differenceInMinutes(now, otpCreatedAt) > OTP_EXPIRATION_MINUTES) {
            throw new UnauthorizedError("OTP expired");
        }

        const hashedPassword = await this.hashService.hash(password);
        await this.userRepository.update(user._id!, { password: hashedPassword });

        await this.otpRepository.deleteMany(email);
    }
}
