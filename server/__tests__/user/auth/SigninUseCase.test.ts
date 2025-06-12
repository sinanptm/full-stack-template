import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import mockUserRepository from "../../__mocks__/repositories/mockUserRepository";
import mockOtpRepository from "../../__mocks__/repositories/mockOtpRepository";
import mockValidatorService from "../../__mocks__/services/mockValidatorService";
import mockHashService from "../../__mocks__/services/mockHashService";
import mockMailService from "../../__mocks__/services/mockMailService";
import mockTokenService from "../../__mocks__/services/mockTokenService";
import { NotFoundError, UnauthorizedError, ForbiddenError } from "@/domain/entities/CustomErrors";
import { UserRole } from "@/types";

// Mock generateOtp utility
jest.mock("@/utils", () => ({
  generateOtp: jest.fn(() => 123456),
}));

describe("SigninUseCase", () => {
  let signinUseCase: SigninUseCase;

  const validCredentials = {
    email: "john@example.com",
    password: "password123",
  };

  const mockUser = {
    _id: "user123",
    name: "John Doe",
    email: "john@example.com",
    password: "hashedPassword123",
    isBlocked: false,
  };

  beforeEach(() => {
    signinUseCase = new SigninUseCase(
      mockUserRepository,
      mockValidatorService,
      mockOtpRepository,
      mockMailService,
      mockHashService,
      mockTokenService,
    );

    jest.clearAllMocks();

    // Default mock implementations
    mockValidatorService.validateRequiredFields.mockReturnValue(undefined);
    mockValidatorService.validateEmailFormat.mockReturnValue(false);
    mockValidatorService.validatePassword.mockReturnValue(false);
  });

  describe("exec - Core Signin Flow", () => {
    it("should signin successfully and return email", async () => {
      mockUserRepository.findByEmailWithCredentials.mockResolvedValue(mockUser);
      mockHashService.compare.mockResolvedValue(true);
      mockOtpRepository.deleteMany.mockResolvedValue();
      mockOtpRepository.create.mockResolvedValue();
      mockMailService.sendOtpMail.mockResolvedValue();

      const result = await signinUseCase.exec(validCredentials);

      expect(result).toEqual({ email: validCredentials.email });
      expect(mockUserRepository.findByEmailWithCredentials).toHaveBeenCalledWith(validCredentials.email);
      expect(mockHashService.compare).toHaveBeenCalledWith(validCredentials.password, mockUser.password);
      expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validCredentials.email);
      expect(mockOtpRepository.create).toHaveBeenCalledWith(123456, validCredentials.email);
      expect(mockMailService.sendOtpMail).toHaveBeenCalledWith({
        email: validCredentials.email,
        name: mockUser.name,
        otp: 123456,
      });
    });

    it("should throw NotFoundError when user does not exist", async () => {
      mockUserRepository.findByEmailWithCredentials.mockResolvedValue(null);

      await expect(signinUseCase.exec(validCredentials)).rejects.toThrow(NotFoundError);
      expect(mockHashService.compare).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedError when password is invalid", async () => {
      mockUserRepository.findByEmailWithCredentials.mockResolvedValue(mockUser);
      mockHashService.compare.mockResolvedValue(false);

      await expect(signinUseCase.exec(validCredentials)).rejects.toThrow(UnauthorizedError);
      expect(mockOtpRepository.deleteMany).not.toHaveBeenCalled();
    });
  });

  describe("refreshAccessToken - Token Refresh Flow", () => {
    const mockToken = "valid-refresh-token";
    const mockTokenPayload = { id: "user123", email: "john@example.com" };

    it("should refresh access token successfully", async () => {
      mockTokenService.verifyRefreshToken.mockReturnValue(mockTokenPayload);
      mockUserRepository.findByIdWithCredentials.mockResolvedValue(mockUser);
      mockTokenService.createAccessToken.mockReturnValue("new-access-token");

      const result = await signinUseCase.refreshAccessToken(mockToken);

      expect(result).toEqual({ accessToken: "new-access-token" });
      expect(mockTokenService.verifyRefreshToken).toHaveBeenCalledWith(mockToken);
      expect(mockUserRepository.findByIdWithCredentials).toHaveBeenCalledWith(mockTokenPayload.id);
      expect(mockTokenService.createAccessToken).toHaveBeenCalledWith({
        email: mockTokenPayload.email,
        id: mockTokenPayload.id,
        role: UserRole.User,
      });
    });

    it("should throw ForbiddenError when token is empty", async () => {
      await expect(signinUseCase.refreshAccessToken("")).rejects.toThrow(ForbiddenError);
      await expect(signinUseCase.refreshAccessToken("")).rejects.toThrow("Unauthenticated");
    });

    it("should throw UnauthorizedError when user not found", async () => {
      mockTokenService.verifyRefreshToken.mockReturnValue(mockTokenPayload);
      mockUserRepository.findByIdWithCredentials.mockResolvedValue(null);

      await expect(signinUseCase.refreshAccessToken(mockToken)).rejects.toThrow(UnauthorizedError);
    });

    it("should throw ForbiddenError when user is blocked", async () => {
      const blockedUser = { ...mockUser, isBlocked: true };
      mockTokenService.verifyRefreshToken.mockReturnValue(mockTokenPayload);
      mockUserRepository.findByIdWithCredentials.mockResolvedValue(blockedUser);

      await expect(signinUseCase.refreshAccessToken(mockToken)).rejects.toThrow(ForbiddenError);
      await expect(signinUseCase.refreshAccessToken(mockToken)).rejects.toThrow(
        "Your account has been blocked. Please contact support for assistance.",
      );
    });
  });
});
