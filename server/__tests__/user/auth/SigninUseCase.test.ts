import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import mockUserRepository from "../../__mocks__/repositories/mockUserRepository";
import mockOtpRepository from "../../__mocks__/repositories/mockOtpRepository";
import mockValidatorService from "../../__mocks__/services/mockValidatorService";
import mockHashService from "../../__mocks__/services/mockHashService";
import mockMailService from "../../__mocks__/services/mockMailService";
import { NotFoundError, UnauthorizedError, ValidationError } from "@/domain/entities/CustomErrors";

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
    };

    beforeEach(() => {
        signinUseCase = new SigninUseCase(
            mockUserRepository,
            mockValidatorService,
            mockOtpRepository,
            mockMailService,
            mockHashService
        );

        jest.clearAllMocks();
        mockValidatorService.validateRequiredFields.mockReturnValue(undefined);
        mockValidatorService.validateEmailFormat.mockReturnValue(true);
        mockValidatorService.validatePassword.mockReturnValue(true);

        jest.spyOn(Math, 'random').mockReturnValue(0.123456);
    });


    describe("Successful signin", () => {
        it("should signin user and send OTP successfully", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockHashService.compare.mockResolvedValue(true);
            mockOtpRepository.deleteMany.mockResolvedValue();
            mockOtpRepository.create.mockResolvedValue();
            mockMailService.sendOtpMail.mockResolvedValue();

            await signinUseCase.exec(validCredentials);

            expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith({
                email: validCredentials.email,
                password: validCredentials.password,
            });
            expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validCredentials.email);
            expect(mockValidatorService.validatePassword).toHaveBeenCalledWith(validCredentials.password);
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validCredentials.email);
            expect(mockHashService.compare).toHaveBeenCalledWith(validCredentials.password, mockUser.password);
            expect(mockOtpRepository.deleteMany).toHaveBeenCalledWith(validCredentials.email);
            expect(mockOtpRepository.create).toHaveBeenCalledWith(expect.any(Number), validCredentials.email);
            expect(mockMailService.sendOtpMail).toHaveBeenCalledWith({
                email: validCredentials.email,
                name: mockUser.name,
                otp: expect.any(Number),
                type: "verification",
            });
        });

        it("should generate OTP within valid range", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockHashService.compare.mockResolvedValue(true);
            mockOtpRepository.deleteMany.mockResolvedValue();
            mockOtpRepository.create.mockResolvedValue();
            mockMailService.sendOtpMail.mockResolvedValue();

            await signinUseCase.exec(validCredentials);

            expect(mockOtpRepository.create).toHaveBeenCalledWith(
                expect.any(Number),
                validCredentials.email
            );

            const [otpArg] = (mockOtpRepository.create as jest.Mock).mock.calls[0];
            expect(otpArg).toBeGreaterThanOrEqual(100000);
            expect(otpArg).toBeLessThanOrEqual(999999);
        });
    });

    describe("Validation errors", () => {
        it("should throw ValidationError when required fields are missing", async () => {
            mockValidatorService.validateRequiredFields.mockImplementation(() => {
                throw new ValidationError("Missing required fields");
            });

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow(ValidationError);
            expect(mockValidatorService.validateRequiredFields).toHaveBeenCalledWith({
                email: validCredentials.email,
                password: validCredentials.password,
            });
        });

        it("should throw ValidationError for invalid email format", async () => {
            mockValidatorService.validateEmailFormat.mockImplementation(() => {
                throw new ValidationError("Invalid email format");
            });

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow(ValidationError);
            expect(mockValidatorService.validateEmailFormat).toHaveBeenCalledWith(validCredentials.email);
        });

        it("should throw ValidationError for invalid password", async () => {
            mockValidatorService.validatePassword.mockImplementation(() => {
                throw new ValidationError("Invalid password");
            });

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow(ValidationError);
            expect(mockValidatorService.validatePassword).toHaveBeenCalledWith(validCredentials.password);
        });
    });

    describe("Authentication errors", () => {
        it("should throw NotFoundError when user does not exist", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(null);

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow(NotFoundError);
            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow("User not found");

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(validCredentials.email);
            expect(mockHashService.compare).not.toHaveBeenCalled();
            expect(mockOtpRepository.deleteMany).not.toHaveBeenCalled();
            expect(mockMailService.sendOtpMail).not.toHaveBeenCalled();
        });

        it("should throw UnauthorizedError when password is invalid", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockHashService.compare.mockResolvedValue(false);

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow(UnauthorizedError);
            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow("Invalid credentials");

            expect(mockHashService.compare).toHaveBeenCalledWith(validCredentials.password, mockUser.password);
            expect(mockOtpRepository.deleteMany).not.toHaveBeenCalled();
            expect(mockMailService.sendOtpMail).not.toHaveBeenCalled();
        });
    });

    describe("Repository errors", () => {
        it("should propagate user repository findByEmail errors", async () => {
            mockUserRepository.findByEmail.mockRejectedValue(new Error("Database connection error"));

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow("Database connection error");
        });

        it("should propagate OTP repository deleteMany errors", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockHashService.compare.mockResolvedValue(true);
            mockOtpRepository.deleteMany.mockRejectedValue(new Error("OTP deletion failed"));

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow("OTP deletion failed");
        });

        it("should propagate OTP repository create errors", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockHashService.compare.mockResolvedValue(true);
            mockOtpRepository.deleteMany.mockResolvedValue();
            mockOtpRepository.create.mockRejectedValue(new Error("OTP creation failed"));

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow("OTP creation failed");
        });
    });

    describe("Service errors", () => {
        it("should propagate hash service errors", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockHashService.compare.mockRejectedValue(new Error("Hash comparison failed"));

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow("Hash comparison failed");
        });

        it("should propagate mail service errors", async () => {
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockHashService.compare.mockResolvedValue(true);
            mockOtpRepository.deleteMany.mockResolvedValue();
            mockOtpRepository.create.mockResolvedValue();
            mockMailService.sendOtpMail.mockRejectedValue(new Error("Email sending failed"));

            await expect(signinUseCase.exec(validCredentials)).rejects.toThrow("Email sending failed");
        });
    });

    describe("Edge cases", () => {
        it("should handle undefined user fields gracefully", async () => {
            const userWithUndefinedFields = {
                _id: "user123",
                name: undefined,
                email: "john@example.com",
                password: "hashedPassword123",
            };

            mockUserRepository.findByEmail.mockResolvedValue(userWithUndefinedFields);
            mockHashService.compare.mockResolvedValue(true);
            mockOtpRepository.deleteMany.mockResolvedValue();
            mockOtpRepository.create.mockResolvedValue();
            mockMailService.sendOtpMail.mockResolvedValue();

            await signinUseCase.exec(validCredentials);

            expect(mockMailService.sendOtpMail).toHaveBeenCalledWith({
                email: validCredentials.email,
                name: undefined,
                otp: expect.any(Number),
                type: "verification",
            });
        });

        it("should handle empty credential strings", async () => {
            const emptyCredentials = {
                email: "",
                password: "",
            };

            mockValidatorService.validateRequiredFields.mockImplementation(() => {
                throw new ValidationError("Empty required fields");
            });

            await expect(signinUseCase.exec(emptyCredentials)).rejects.toThrow(ValidationError);
        });
    });
});