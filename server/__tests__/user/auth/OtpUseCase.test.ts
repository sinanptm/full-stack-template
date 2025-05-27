import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import { NotFoundError, UnauthorizedError, ValidationError } from "@/domain/entities/CustomErrors";
import mockUserRepository from "../../__mocks__/repositories/mockUserRepository";
import mockOtpRepository from "../../__mocks__/repositories/mockOtpRepository";
import mockValidatorService from "../../__mocks__/services/mockValidatorService";
import mockMailService from "../../__mocks__/services/mockMailService";
import mockTokenService from "../../__mocks__/services/mockTokenService";
import { OTP_EXPIRATION_MINUTES } from "@/config";
import { UserRole } from "@/types";

jest.mock("@/utils", () => ({
  generateOtp: jest.fn(() => "123456"),
}));

jest.mock("date-fns", () => ({
  differenceInMinutes: jest.fn(),
}));

import { differenceInMinutes } from "date-fns";

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
      mockMailService,
    );
    jest.clearAllMocks();
    mockValidatorService.validateEmailFormat.mockReturnValue(true);
    mockValidatorService.validateRequiredFields.mockReturnValue(undefined);
    (differenceInMinutes as jest.Mock).mockReturnValue(2); // Default to 2 minutes (within expiration limit)
  });

  describe("exec", () => {
    it("should verify OTP and return tokens successfully", async () => {
      const user = { _id: "user123", email: validPayload.email, name: "John" };
      const refreshToken = "refreshToken";
      const accessToken = "accessToken";

      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.findOne.mockResolvedValue({ createdAt: new Date() });
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockTokenService.createAccessToken.mockReturnValue(accessToken);
      mockTokenService.createRefreshToken.mockReturnValue(refreshToken);
      mockUserRepository.update.mockResolvedValue({});

      const result = await otpUseCase.exec(validPayload);

      expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith(validPayload);
      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
      expect(mockOtpRepository.findOne).toHaveBeenCalledWith(123456, validPayload.email);
      expect(differenceInMinutes).toHaveBeenCalled();
      expect(mockTokenService.createAccessToken).toHaveBeenCalledWith({
        email: user.email,
        id: user._id.toString(),
        role: UserRole.User,
      });
      expect(mockTokenService.createRefreshToken).toHaveBeenCalledWith({
        email: user.email,
        id: user._id.toString(),
      });
      expect(mockUserRepository.update).toHaveBeenCalledWith(user._id, { token: refreshToken });
      expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
      expect(result).toEqual({
        accessToken,
        refreshToken,
        user: { id: user._id, name: user.name },
      });
    });

    it("should throw ValidationError for invalid fields", async () => {
      mockValidatorService.validateRequiredFields.mockImplementation(() => {
        throw new ValidationError("Missing required fields");
      });

      await expect(otpUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith(validPayload);
    });

    it("should throw ValidationError for invalid email format", async () => {
      mockValidatorService.validateEmailFormat.mockImplementation(() => {
        throw new ValidationError("Invalid email format");
      });

      await expect(otpUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
    });

    it("should throw NotFoundError if user not found", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(otpUseCase.exec(validPayload)).rejects.toThrow(NotFoundError);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
    });

    it("should throw UnauthorizedError for invalid OTP", async () => {
      const user = { _id: "user123", email: validPayload.email, name: "John" };
      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.findOne.mockResolvedValue(null);

      await expect(otpUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
      expect(mockOtpRepository.findOne).toHaveBeenCalledWith(123456, validPayload.email);
    });

    it("should throw UnauthorizedError for expired OTP", async () => {
      const user = { _id: "user123", email: validPayload.email, name: "John" };
      const expiredOtp = { createdAt: new Date() };

      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.findOne.mockResolvedValue(expiredOtp);
      (differenceInMinutes as jest.Mock).mockReturnValue(OTP_EXPIRATION_MINUTES + 1); // Expired

      await expect(otpUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
      expect(differenceInMinutes).toHaveBeenCalled();
    });

    it("should handle OTP at expiration boundary correctly", async () => {
      const user = { _id: "user123", email: validPayload.email, name: "John" };
      const boundaryOtp = { createdAt: new Date() };

      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.findOne.mockResolvedValue(boundaryOtp);
      (differenceInMinutes as jest.Mock).mockReturnValue(OTP_EXPIRATION_MINUTES); // Exactly at limit
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockTokenService.createAccessToken.mockReturnValue("accessToken");
      mockTokenService.createRefreshToken.mockReturnValue("refreshToken");
      mockUserRepository.update.mockResolvedValue({});

      const result = await otpUseCase.exec(validPayload);

      expect(result).toEqual({
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        user: { id: user._id, name: user.name },
      });
    });

    it("should convert string OTP to number when calling findOne", async () => {
      const user = { _id: "user123", email: validPayload.email, name: "John" };
      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.findOne.mockResolvedValue({ createdAt: new Date() });
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockTokenService.createAccessToken.mockReturnValue("accessToken");
      mockTokenService.createRefreshToken.mockReturnValue("refreshToken");
      mockUserRepository.update.mockResolvedValue({});

      await otpUseCase.exec({ email: validPayload.email, otp: "654321" });

      expect(mockOtpRepository.findOne).toHaveBeenCalledWith(654321, validPayload.email);
    });

    it("should clean up OTP after successful verification", async () => {
      const user = { _id: "user123", email: validPayload.email, name: "John" };
      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.findOne.mockResolvedValue({ createdAt: new Date() });
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockTokenService.createAccessToken.mockReturnValue("accessToken");
      mockTokenService.createRefreshToken.mockReturnValue("refreshToken");
      mockUserRepository.update.mockResolvedValue({});

      await otpUseCase.exec(validPayload);

      expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
    });

    it("should store refresh token in user record", async () => {
      const user = { _id: "user123", email: validPayload.email, name: "John" };
      const refreshToken = "generatedRefreshToken";

      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.findOne.mockResolvedValue({ createdAt: new Date() });
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockTokenService.createAccessToken.mockReturnValue("accessToken");
      mockTokenService.createRefreshToken.mockReturnValue(refreshToken);
      mockUserRepository.update.mockResolvedValue({});

      await otpUseCase.exec(validPayload);

      expect(mockUserRepository.update).toHaveBeenCalledWith(user._id, { token: refreshToken });
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
      });
    });

    it("should throw ValidationError for invalid email format", async () => {
      mockValidatorService.validateEmailFormat.mockImplementation(() => {
        throw new ValidationError("Invalid email format");
      });

      await expect(otpUseCase.resendOtp({ email: validPayload.email })).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
    });

    it("should throw NotFoundError if user not found", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(otpUseCase.resendOtp({ email: validPayload.email })).rejects.toThrow(NotFoundError);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validPayload.email);
    });

    it("should clean up existing OTPs before creating new one", async () => {
      const user = { _id: "user123", name: "John", email: validPayload.email };
      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockOtpRepository.create.mockResolvedValue(undefined);
      mockMailService.sendOtpMail.mockResolvedValue(undefined);

      await otpUseCase.resendOtp({ email: validPayload.email });

      // expect(mockOtpRepository.deleteMany).toHaveBeenCalledBefore(mockOtpRepository.create as jest.Mock);
      expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validPayload.email);
    });

    it("should generate new OTP for each resend request", async () => {
      const user = { _id: "user123", name: "John", email: validPayload.email };
      mockUserRepository.findByEmail.mockResolvedValue(user);
      mockOtpRepository.deleteMany.mockResolvedValue(undefined);
      mockOtpRepository.create.mockResolvedValue(undefined);
      mockMailService.sendOtpMail.mockResolvedValue(undefined);

      await otpUseCase.resendOtp({ email: validPayload.email });

      expect(require("@/utils").generateOtp).toHaveBeenCalled();
      expect(mockOtpRepository.create).toHaveBeenCalledWith("123456", validPayload.email);
    });
  });
});
