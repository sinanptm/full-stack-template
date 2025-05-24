import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import { NotFoundError, UnauthorizedError, ValidationError } from "@/domain/entities/CustomErrors";
import mockUserRepository from "../../__mocks__/repositories/mockUserRepository";
import mockOtpRepository from "../../__mocks__/repositories/mockOtpRepository";
import mockValidatorService from "../../__mocks__/services/mockValidatorService";
import mockMailService from "../../__mocks__/services/mockMailService";
import mockTokenService from "../../__mocks__/services/mockTokenService";
import { OTP_EXPIRATION_MINUTES } from "@/config";

jest.mock("@/utils", () => ({
    generateOtp: jest.fn(() => "123456"),
}));

describe("OtpUseCase", () => {
    let otpUseCase: OtpUseCase;
    const validPayload = {
        email: "john@example.com",
        otp: "123456",
    };

    beforeEach(() => {
        otpUseCase = new OtpUseCase(
            mockUserRepository,
            mockTokenService,
            mockValidatorService,
            mockOtpRepository,
            mockMailService
        );
        jest.clearAllMocks();
        mockValidatorService.validateEmailFormat.mockReturnValue(true);
        mockValidatorService.validateLength.mockReturnValue(true);
        mockValidatorService.validateRequiredFields.mockReturnValue(undefined);
    });

    describe("exec", () => {
        it("should verify OTP and return tokens successfully", async () => {
            const user = { _id: "user123", email: validPayload.email, name: "John" };
            mockUserRepository.findByEmail.mockResolvedValue(user);
            mockOtpRepository.findOne.mockResolvedValue({ createdAt: new Date() });
            mockOtpRepository.deleteMany.mockResolvedValue(undefined);
            mockTokenService.createAccessToken.mockReturnValue("accessToken");
            mockTokenService.createRefreshToken.mockReturnValue("refreshToken");

            const result = await otpUseCase.exec(validPayload);

            expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith(validPayload);
            expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
            expect(mockValidatorService.validateLength).toHaveBeenCalledWith(validPayload.otp, 6, 6);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
            expect(mockOtpRepository.findOne).toHaveBeenCalledWith(123456, validPayload.email);
            expect(mockTokenService.createAccessToken).toHaveBeenCalledWith({
                email: user.email,
                id: user._id.toString(),
                role: "User",
            });
            expect(mockTokenService.createRefreshToken).toHaveBeenCalledWith({
                email: user.email,
                id: user._id.toString(),
            });
            expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
            expect(result).toEqual({
                accessToken: "accessToken",
                refreshToken: "refreshToken",
                user: { id: user._id, email: user.email, name: user.name },
            });
        });

        it("should throw ValidationError for invalid fields", async () => {
            mockValidatorService.validateRequiredFields.mockImplementation(() => {
                throw new ValidationError("Missing required fields");
            });

            await expect(otpUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
        });

        it("should throw NotFoundError if user not found", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(null);

            await expect(otpUseCase.exec(validPayload)).rejects.toThrow(NotFoundError);
        });

        it("should throw UnauthorizedError for invalid OTP", async () => {
            mockUserRepository.findByEmail.mockResolvedValue({ _id: "user123", email: validPayload.email });
            mockOtpRepository.findOne.mockResolvedValue(null);

            await expect(otpUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
        });

        it("should throw UnauthorizedError for expired OTP", async () => {
            const expiredDate = new Date(Date.now() - (OTP_EXPIRATION_MINUTES + 1) * 60 * 1000);
            mockUserRepository.findByEmail.mockResolvedValue({ _id: "user123", email: validPayload.email });
            mockOtpRepository.findOne.mockResolvedValue({ createdAt: expiredDate });

            await expect(otpUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
        });
    });

    describe("resendOtp", () => {
        it("should resend OTP successfully", async () => {
            const user = { _id: "user123", name: "John", email: validPayload.email };
            mockUserRepository.findByEmail.mockResolvedValue(user);
            mockOtpRepository.deleteMany.mockResolvedValue(undefined);
            mockOtpRepository.create.mockResolvedValue(undefined);
            mockMailService.sendOtpMail.mockResolvedValue(undefined);

            await otpUseCase.resendOtp({ email: validPayload.email });

            expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
            expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
            expect(require("@/utils").generateOtp).toHaveBeenCalled();
            expect(mockOtpRepository.create).toHaveBeenCalledWith("123456", validPayload.email);
            expect(mockMailService.sendOtpMail).toHaveBeenCalledWith({
                email: validPayload.email,
                name: user.name,
                otp: "123456",
                type: "verification",
            });
        });

        it("should throw NotFoundError if user not found", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(null);

            await expect(otpUseCase.resendOtp({ email: validPayload.email })).rejects.toThrow(NotFoundError);
        });
    });
});