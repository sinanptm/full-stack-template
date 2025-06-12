import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";

const mockUserRepository: jest.Mocked<IUserRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByEmail: jest.fn(),
  findByEmailWithCredentials: jest.fn(),
  findByIdWithCredentials: jest.fn(),
  findAll: jest.fn(),
};

export default mockUserRepository;
