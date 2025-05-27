import IValidatorService from "@/domain/interfaces/services/IValidatorService";

const mockValidatorService: jest.Mocked<IValidatorService> = {
  validateRequiredFields: jest.fn(),
  validateEmailFormat: jest.fn().mockReturnValue(true),
  validateLength: jest.fn().mockReturnValue(true),
  validateIdFormat: jest.fn().mockReturnValue(true),
  validatePhoneNumber: jest.fn().mockReturnValue(true),
  validateTimeFormat: jest.fn().mockReturnValue(true),
  validateEnum: jest.fn().mockReturnValue(true),
  validatePassword: jest.fn().mockReturnValue(true),
  validateBoolean: jest.fn().mockReturnValue(true),
  validateMultipleIds: jest.fn().mockReturnValue(true),
};

export default mockValidatorService;
