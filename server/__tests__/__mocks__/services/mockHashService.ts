import IHashService from "@/domain/interfaces/services/IHashService";

const mockHashService: jest.Mocked<IHashService> = {
  hash: jest.fn(),
  compare: jest.fn(),
};

export default mockHashService;
