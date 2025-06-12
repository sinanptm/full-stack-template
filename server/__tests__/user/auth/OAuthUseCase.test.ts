import OAuthUseCase from "@/use_case/user/auth/OAuthUseCase";
import { UnauthorizedError, ValidationError } from "@/domain/entities/CustomErrors";
import mockUserRepository from "../../__mocks__/repositories/mockUserRepository";
import mockTokenService from "../../__mocks__/services/mockTokenService";
import mockValidatorService from "../../__mocks__/services/mockValidatorService";
import mockOAuthService from "../../__mocks__/services/mockOAuthService";
import { UserRole } from "@/types";

describe("OAuthUseCase", () => {
  let oAuthUseCase: OAuthUseCase;
  const validPayload = {
    name: "John Doe",
    email: "john@example.com",
    accessToken: "validOAuthToken",
    profile: "https://example.com/profile.jpg",
  };

  beforeEach(() => {
    oAuthUseCase = new OAuthUseCase(
      mockUserRepository,
      mockTokenService,
      mockValidatorService,
      mockOAuthService,
    );
    jest.clearAllMocks();
    mockValidatorService.validateRequiredFields.mockReturnValue(undefined);
    mockValidatorService.validateEmailFormat.mockReturnValue(true);
  });

  describe("exec", () => {
    it("should authenticate new user successfully and return tokens", async () => {
      const oauthUser = { email: validPayload.email, profile: validPayload.profile, name: validPayload.name };
      const user = {
        _id: "user123",
        email: validPayload.email,
        name: validPayload.name,
        profile: validPayload.profile,
        isOAuthUser: true,
        isBlocked: false,
      };
      const accessToken = "jwtAccessToken";
      const refreshToken = "refreshToken";

      mockOAuthService.verifyAccessToken.mockResolvedValue(oauthUser);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(user);
      mockTokenService.createAccessToken.mockReturnValue(accessToken);
      mockTokenService.createRefreshToken.mockReturnValue(refreshToken);
      mockUserRepository.update.mockResolvedValue({});

      const result = await oAuthUseCase.exec(validPayload);

      expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith({
        name: validPayload.name,
        email: validPayload.email,
        accessToken: validPayload.accessToken,
      });
      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
      expect(mockOAuthService.verifyAccessToken).toHaveBeenCalledWith(validPayload.accessToken);
      expect(mockUserRepository.findByEmailWithCredentials).toHaveBeenCalledWith(validPayload.email);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        name: validPayload.name,
        email: validPayload.email,
        isOAuthUser: true,
        profile: validPayload.profile,
      });
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
      expect(result).toEqual({
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profile: user.profile,
        },
      });
    });

    it("should authenticate existing user successfully and return tokens", async () => {
      const oauthUser = {
        uid: "oAuthUser123",
        email: validPayload.email,
        name: validPayload.name,
        profile: validPayload.profile,
      };
      const user = {
        _id: "user123",
        email: validPayload.email,
        name: validPayload.name,
        profile: validPayload.profile,
        isOAuthUser: true,
        isBlocked: false,
      };
      const accessToken = "jwtAccessToken";
      const refreshToken = "refreshToken";

      mockOAuthService.verifyAccessToken.mockResolvedValue(oauthUser);
      mockUserRepository.findByEmailWithCredentials.mockResolvedValue(user);
      mockTokenService.createAccessToken.mockReturnValue(accessToken);
      mockTokenService.createRefreshToken.mockReturnValue(refreshToken);
      mockUserRepository.update.mockResolvedValue({});

      const result = await oAuthUseCase.exec(validPayload);

      expect(mockUserRepository.findByEmailWithCredentials).toHaveBeenCalledWith(validPayload.email);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockTokenService.createAccessToken).toHaveBeenCalled();
      expect(mockTokenService.createRefreshToken).toHaveBeenCalled();
      expect(mockUserRepository.update).toHaveBeenCalledWith(user._id, { token: refreshToken });
      expect(result).toEqual({
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profile: user.profile,
        },
      });
    });

    it("should throw ValidationError for missing required fields", async () => {
      mockValidatorService.validateRequiredFields.mockImplementation(() => {
        throw new ValidationError("Missing required fields");
      });

      await expect(oAuthUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith({
        name: validPayload.name,
        email: validPayload.email,
        accessToken: validPayload.accessToken,
      });
    });

    it("should throw ValidationError for invalid email format", async () => {
      mockValidatorService.validateEmailFormat.mockImplementation(() => {
        throw new ValidationError("Invalid email format");
      });

      await expect(oAuthUseCase.exec(validPayload)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validPayload.email);
    });

    it("should throw UnauthorizedError for invalid OAuth token", async () => {
      mockOAuthService.verifyAccessToken.mockResolvedValue(null);

      await expect(oAuthUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
      expect(mockOAuthService.verifyAccessToken).toHaveBeenCalledWith(validPayload.accessToken);
    });

    it("should throw UnauthorizedError for email mismatch", async () => {
      const oauthUser = {
        uid: "oAuthUser123",
        email: "different@example.com",
        name: validPayload.name,
        profile: validPayload.profile,
      };
      mockOAuthService.verifyAccessToken.mockResolvedValue(oauthUser);

      await expect(oAuthUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
      expect(mockOAuthService.verifyAccessToken).toHaveBeenCalledWith(validPayload.accessToken);
    });

    it("should throw UnauthorizedError for blocked user", async () => {
      const oauthUser = {
        uid: "oAuthUser123",
        email: validPayload.email,
        name: validPayload.name,
        profile: validPayload.profile,
      };
      const blockedUser = {
        _id: "user123",
        email: validPayload.email,
        name: validPayload.name,
        profile: validPayload.profile,
        isOAuthUser: true,
        isBlocked: true,
      };

      mockOAuthService.verifyAccessToken.mockResolvedValue(oauthUser);
      mockUserRepository.findByEmailWithCredentials.mockResolvedValue(blockedUser);

      await expect(oAuthUseCase.exec(validPayload)).rejects.toThrow(UnauthorizedError);
      expect(mockUserRepository.findByEmailWithCredentials).toHaveBeenCalledWith(validPayload.email);
    });
  });
});
