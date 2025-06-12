import IOAuthService from "@/domain/interfaces/services/IOAuthService";

const mockOAuthService: jest.Mocked<IOAuthService> = {
  verifyAccessToken: jest.fn(),
};

export default mockOAuthService;
