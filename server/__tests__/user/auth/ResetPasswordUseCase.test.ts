import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";
import { NotFoundError, UnauthorizedError, ValidationError } from "@/domain/entities/CustomErrors";
import mockUserRepository from "../../__mocks__/repositories/mockUserRepository";
import mockOtpRepository from "../../__mocks__/repositories/mockOtpRepository";
import mockHashService from "../../__mocks__/services/mockHashService";
import mockValidatorService from "../../__mocks__/services/mockValidatorService";
import mockMailService from "../../__mocks__/services/mockMailService";
import { CLIENT_URL } from "@/config";

jest.mock("@/utils", () => ({
  generateOtp: jest.fn(() => "123456"),
}));

jest.mock("date-fns", () => ({
  differenceInMinutes: jest.fn(),
}));

import { differenceInMinutes } from "date-fns";

describe("ResetPasswordUseCase", () => {
  let resetPasswordUseCase: ResetPasswordUseCase;
  const mockCreatedDate = new Date().toISOString();
  const validPayload = {
    email: "john@example.com",
    password: "newPassword123",
    otp: "123456",
    createdDate: mockCreatedDate,
  };

  beforeEach(() => {
    resetPasswordUseCase = new ResetPasswordUseCase(
      mockUserRepository,
      mockOtpRepository,
      mockHashService,
      mockValidatorService,
      mockMailService,
    );
    jest.clearAllMocks();
    mockValidatorService.validateEmailFormat.mockReturnValue(true);
    mockValidatorService.validatePassword.mockReturnValue(true);
    mockValidatorService.validateRequiredFields.mockReturnValue(undefined);
    (differenceInMinutes as jest.Mock).mockReturnValue(2);
  });

  describe("forgotPassword", () => {
    it("should initiate password reset successfully", async () => {
      const mockUser = { _id: "user123", name: "John", email: validPayload.email };
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockOtpRepository.create.mockResolvedValue(undefined);
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockMailService.sendPasswordResetLink.mockResolvedValue(undefined);

      await resetPasswordUseCase.forgotPassword({ email: validPayload.email });

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
      expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
      expect(mockOtpRepository.create).toHaveBeenCalledWith("123456", validPayload.email);
      expect(mockMailService.sendPasswordResetLink).toHaveBeenCalledWith({
        email: validPayload.email,
        resetLink: expect.stringContaining(`${CLIENT_URL}/auth/forgot-password/?token=123456X_X`),
        name: "John",
      });
    });

    it("should throw NotFoundError if user not found", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(resetPasswordUseCase.forgotPassword({ email: validPayload.email })).rejects.toThrow(
        NotFoundError,
      );
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
    });

    it("should generate reset link with correct format", async () => {
      const mockUser = { _id: "user123", name: "John", email: validPayload.email };
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockOtpRepository.create.mockResolvedValue(undefined);
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockMailService.sendPasswordResetLink.mockResolvedValue(undefined);

      await resetPasswordUseCase.forgotPassword({ email: validPayload.email });

      const expectedResetLinkPattern = new RegExp(
        `${CLIENT_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/auth/forgot-password/\\?token=123456X_X.+`,
      );
      expect(mockMailService.sendPasswordResetLink).toHaveBeenCalledWith(
        expect.objectContaining({
          resetLink: expect.stringMatching(expectedResetLinkPattern),
        }),
      );
    });
  });

  describe("exec", () => {
    it("should reset password successfully", async () => {
      const hashedPassword = "hashedNewPassword";
      const mockUser = { _id: "user123", email: validPayload.email };
      const mockOtp = { createdAt: new Date(mockCreatedDate) };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockOtpRepository.findOne.mockResolvedValue(mockOtp);
      mockHashService.hash.mockResolvedValue(hashedPassword);
      mockUserRepository.update.mockResolvedValue({});
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      (differenceInMinutes as jest.Mock).mockReturnValue(2); // Within 5 minute limit

      await resetPasswordUseCase.exec(validPayload);

      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
      expect(mockValidatorService.validatePassword).toHaveBeenCalledWith(validPayload.password);
      expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith(validPayload);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
      expect(mockOtpRepository.findOne).toHaveBeenCalledWith(123456, validPayload.email);
      expect(differenceInMinutes).toHaveBeenCalled();
      expect(mockHashService.hash).toHaveBeenCalledWith(validPayload.password);
      expect(mockUserRepository.update).toHaveBeenCalledWith("user123", { password: hashedPassword });
      expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
    });

    it("should throw ValidationError for invalid email format", async () => {
      mockValidatorService.validateEmailFormat.mockImplementation(() => {
        throw new ValidationError("Invalid email format");
      });

      await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
    });

    it("should throw ValidationError for invalid password", async () => {
      mockValidatorService.validatePassword.mockImplementation(() => {
        throw new ValidationError("Invalid password");
      });

      await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validatePassword).toHaveBeenCalledWith(validPayload.password);
    });

    it("should throw ValidationError for missing required fields", async () => {
      mockValidatorService.validateRequiredFields.mockImplementation(() => {
        throw new ValidationError("Missing required fields");
      });

      await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith(validPayload);
    });

    it("should throw NotFoundError if user not found", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(NotFoundError);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
    });

    it("should throw UnauthorizedError for invalid OTP", async () => {
      const mockUser = { _id: "user123", email: validPayload.email };
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockOtpRepository.findOne.mockResolvedValue(null);

      await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
      expect(mockOtpRepository.findOne).toHaveBeenCalledWith(123456, validPayload.email);
    });

    it("should throw UnauthorizedError for expired reset link (beyond 5 minutes)", async () => {
      const mockUser = { _id: "user123", email: validPayload.email };
      const mockOtp = { createdAt: new Date(mockCreatedDate) };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockOtpRepository.findOne.mockResolvedValue(mockOtp);
      (differenceInMinutes as jest.Mock).mockReturnValue(6); // Beyond 5 minute limit
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);

      await expect(resetPasswordUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
      expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
    });

    it("should throw UnauthorizedError for time mismatch between link and OTP creation", async () => {
      const mockUser = { _id: "user123", email: validPayload.email };
      const linkCreatedAt = new Date();
      const otpCreatedAt = new Date(linkCreatedAt.getTime() + 15000); // 15 seconds difference
      const mockOtp = { createdAt: otpCreatedAt };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockOtpRepository.findOne.mockResolvedValue(mockOtp);
      (differenceInMinutes as jest.Mock).mockReturnValue(2); // Within time limit

      const payloadWithTimeMismatch = {
        ...validPayload,
        createdDate: linkCreatedAt.toISOString(),
      };

      await expect(resetPasswordUseCase.exec(payloadWithTimeMismatch)).rejects.toThrow(UnauthorizedError);
    });

    it("should handle URL encoded createdDate correctly", async () => {
      const hashedPassword = "hashedNewPassword";
      const mockUser = { _id: "user123", email: validPayload.email };
      const encodedDate = encodeURIComponent(mockCreatedDate);
      const mockOtp = { createdAt: new Date(mockCreatedDate) };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockOtpRepository.findOne.mockResolvedValue(mockOtp);
      mockHashService.hash.mockResolvedValue(hashedPassword);
      mockUserRepository.update.mockResolvedValue({});
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      (differenceInMinutes as jest.Mock).mockReturnValue(2);

      const payloadWithEncodedDate = {
        ...validPayload,
        createdDate: encodedDate,
      };

      await resetPasswordUseCase.exec(payloadWithEncodedDate);

      expect(mockUserRepository.update).toHaveBeenCalledWith("user123", { password: hashedPassword });
    });

    it("should accept valid time difference between link and OTP creation (within 10 seconds)", async () => {
      const hashedPassword = "hashedNewPassword";
      const mockUser = { _id: "user123", email: validPayload.email };
      const linkCreatedAt = new Date();
      const otpCreatedAt = new Date(linkCreatedAt.getTime() + 5000); // 5 seconds difference
      const mockOtp = { createdAt: otpCreatedAt };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      mockOtpRepository.findOne.mockResolvedValue(mockOtp);
      mockHashService.hash.mockResolvedValue(hashedPassword);
      mockUserRepository.update.mockResolvedValue({});
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      (differenceInMinutes as jest.Mock).mockReturnValue(2);

      const payloadWithValidTimeDiff = {
        ...validPayload,
        createdDate: linkCreatedAt.toISOString(),
      };

      await resetPasswordUseCase.exec(payloadWithValidTimeDiff);

      expect(mockUserRepository.update).toHaveBeenCalledWith("user123", { password: hashedPassword });
      expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
    });
  });
});
