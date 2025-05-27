import ITokenService from "@/domain/interfaces/services/ITokenService";

const mockTokenService: jest.Mocked<ITokenService> = {
  createAccessToken: jest.fn(),
  createRefreshToken: jest.fn(),
  verifyAccessToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
};

export default mockTokenService;
