import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";
import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import { NotFoundError, UnauthorizedError, ValidationError } from "@/domain/entities/CustomErrors";
import mockUserRepository from "../../__mocks__/repositories/mockUserRepository";
import mockOtpRepository from "../../__mocks__/repositories/mockOtpRepository";
import mockHashService from "../../__mocks__/services/mockHashService";
import mockValidatorService from "../../__mocks__/services/mockValidatorService";
import mockMailService from "../../__mocks__/services/mockMailService";
import mockTokenService from "../../__mocks__/services/mockTokenService";
import { generateOtp } from "@/utils";
import { OTP_EXPIRATION_MINUTES } from "@/config";

jest.mock("@/utils", () => ({
    generateOtp: jest.fn(() => "123456"),
}));

describe("ResetPasswordUseCase", () => {
    let resetPasswordUseCase: ResetPasswordUseCase;
    const validPayload = {
        email: "john@example.com",
        password: "newPassword123",
        otp: "123456",
    };

    beforeEach(() => {
        resetPasswordUseCase = new ResetPasswordUseCase(
            mockUserRepository,
            mockOtpRepository,
            mockHashService,
            mockValidatorService,
            mockMailService
        );
        jest.clearAllMocks();
        mockValidatorService.validateEmailFormat.mockReturnValue(true);
        mockValidatorService.validatePassword.mockReturnValue(true);
        mockValidatorService.validateRequiredFields.mockReturnValue(undefined);
    });

    describe("initiate", () => {
        it("should initiate password reset successfully", async () => {
            mockUserRepository.findByEmail.mockResolvedValue({ _id: "user123", name: "John", email: validPayload.email });
            mockOtpRepository.create.mockResolvedValue(undefined);
            mockOtpRepository.deleteMany.mockResolvedValue(undefined);
            mockMailService.sendOtpMail.mockResolvedValue(undefined);

            await resetPasswordUseCase.initiate({ email: validPayload.email });

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
            expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
            expect(mockOtpRepository.create).toHaveBeenCalledWith("123456", validPayload.email);
            expect(mockMailService.sendOtpMail).toHaveBeenCalledWith({
                email: validPayload.email,
                otp: "123456",
                name: "John",
                type: "password-reset",
            });
        });

        it("should throw NotFoundError if user not found", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(null);

            await expect(resetPasswordUseCase.initiate({ email: validPayload.email })).rejects.toThrow(NotFoundError);
        });
    });

    describe("exec", () => {
        it("should reset password successfully", async () => {
            const hashedPassword = "hashedNewPassword";
            mockUserRepository.findByEmail.mockResolvedValue({ _id: "user123", email: validPayload.email });
            mockOtpRepository.findOne.mockResolvedValue({ createdAt: new Date() });
            mockHashService.hash.mockResolvedValue(hashedPassword);
            mockUserRepository.update.mockResolvedValue({});
            mockOtpRepository.deleteMany.mockResolvedValue();

            await resetPasswordUseCase.exec(validPayload);

            expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith(validPayload);
            expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
            expect(mockValidatorService.validatePassword).toHaveBeenCalledWith(validPayload.password);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
            expect(mockOtpRepository.findOne).toHaveBeenCalledWith(123456, validPayload.email);
            expect(mockHashService.hash).toHaveBeenCalledWith(validPayload.password);
            expect(mockUserRepository.update).toHaveBeenCalledWith("user123", { password: hashedPassword });
            expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
        });

        it("should throw ValidationError for invalid fields", async () => {
            mockValidatorService.validateRequiredFields.mockImplementation(() => {
                throw new ValidationError("Missing required fields");
            });

            await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
        });

        it("should throw NotFoundError if user not found", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(null);

            await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(NotFoundError);
        });

        it("should throw UnauthorizedError for invalid OTP", async () => {
            mockUserRepository.findByEmail.mockResolvedValue({ _id: "user123", email: validPayload.email });
            mockOtpRepository.findOne.mockResolvedValue(null);

            await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
        });

        it("should throw UnauthorizedError for expired OTP", async () => {
            const expiredDate = new Date(Date.now() - (OTP_EXPIRATION_MINUTES + 1) * 60 * 1000);
            mockUserRepository.findByEmail.mockResolvedValue({ _id: "user123", email: validPayload.email });
            mockOtpRepository.findOne.mockResolvedValue({ createdAt: expiredDate });

            await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
        });
    });
});