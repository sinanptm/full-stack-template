import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";

const mockOtpRepository: jest.Mocked<IOtpRepository> = {
  create: jest.fn(),
  findOne: jest.fn(),
  deleteMany: jest.fn(),
};

export default mockOtpRepository;
