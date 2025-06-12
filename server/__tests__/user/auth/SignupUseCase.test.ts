import SignupUseCase from "@/use_case/user/auth/SignupUseCase";
import { ConflictError, ValidationError } from "@/domain/entities/CustomErrors";
import IUser from "@/domain/entities/IUser";
import mockUserRepository from "../../__mocks__/repositories/mockUserRepository";
import mockValidatorService from "../../__mocks__/services/mockValidatorService";
import mockHashService from "../../__mocks__/services/mockHashService";

describe("SignupUseCase", () => {
  let signupUseCase: SignupUseCase;
  const validUserData: IUser = {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  };

  beforeEach(() => {
    signupUseCase = new SignupUseCase(mockUserRepository, mockValidatorService, mockHashService);
    jest.clearAllMocks();

    mockValidatorService.validateRequiredFields.mockReturnValue(undefined);
    mockValidatorService.validateEmailFormat.mockReturnValue(true);
    mockValidatorService.validatePassword.mockReturnValue(true);
    mockValidatorService.validateLength.mockReturnValue(true);
  });

  describe("Successful signup", () => {
    it("should create a new user successfully", async () => {
      const hashedPassword = "hashedPassword123";
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockHashService.hash.mockResolvedValue(hashedPassword);
      mockUserRepository.create.mockResolvedValue({
        ...validUserData,
        _id: "user123",
        password: hashedPassword,
      });

      await signupUseCase.exec(validUserData);

      expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith({
        email: validUserData.email,
        name: validUserData.name,
        password: validUserData.password,
      });
      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validUserData.email);
      expect(mockValidatorService.validatePassword).toHaveBeenCalledWith(validUserData.password);
      expect(mockValidatorService.validateLength).toHaveBeenCalledWith(validUserData.name, 2, 50);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validUserData.email);
      expect(mockHashService.hash).toHaveBeenCalledWith(validUserData.password);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        password: hashedPassword,
        email: validUserData.email,
        name: validUserData.name,
        isOAuthUser: false
      });
    });
  });

  describe("Validation errors", () => {
    it("should throw ValidationError when required fields are missing", async () => {
      mockValidatorService.validateRequiredFields.mockImplementation(() => {
        throw new ValidationError("Missing required fields");
      });

      await expect(signupUseCase.exec(validUserData)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith({
        email: validUserData.email,
        name: validUserData.name,
        password: validUserData.password,
      });
    });

    it("should throw ValidationError for invalid email format", async () => {
      mockValidatorService.validateEmailFormat.mockImplementation(() => {
        throw new ValidationError("Invalid email format");
      });

      await expect(signupUseCase.exec(validUserData)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validUserData.email);
    });

    it("should throw ValidationError for invalid password", async () => {
      mockValidatorService.validatePassword.mockImplementation(() => {
        throw new ValidationError("Invalid password");
      });

      await expect(signupUseCase.exec(validUserData)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validatePassword).toHaveBeenCalledWith(validUserData.password);
    });

    it("should throw ValidationError for invalid name length", async () => {
      mockValidatorService.validateLength.mockImplementation(() => {
        throw new ValidationError("Invalid name length");
      });

      await expect(signupUseCase.exec(validUserData)).rejects.toThrow(ValidationError);
      expect(mockValidatorService.validateLength).toHaveBeenCalledWith(validUserData.name, 2, 50);
    });
  });

  describe("Conflict errors", () => {
    it("should throw ConflictError when user already exists", async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        _id: "existingUser123",
        ...validUserData,
      });

      await expect(signupUseCase.exec(validUserData)).rejects.toThrow(ConflictError);
      await expect(signupUseCase.exec(validUserData)).rejects.toThrow("User with this email already exists");

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validUserData.email);
      expect(mockHashService.hash).not.toHaveBeenCalled();
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    it("should handle undefined fields gracefully", async () => {
      const userDataWithUndefined: IUser = {
        name: undefined,
        email: undefined,
        password: undefined,
      };

      mockValidatorService.validateRequiredFields.mockImplementation(() => {
        throw new ValidationError("Missing required fields");
      });

      await expect(signupUseCase.exec(userDataWithUndefined)).rejects.toThrow(ValidationError);
    });

    it("should handle empty string fields", async () => {
      const userDataWithEmptyStrings: IUser = {
        name: "",
        email: "",
        password: "",
      };

      mockValidatorService.validateRequiredFields.mockImplementation(() => {
        throw new ValidationError("Empty required fields");
      });

      await expect(signupUseCase.exec(userDataWithEmptyStrings)).rejects.toThrow(ValidationError);
    });
  });
});
