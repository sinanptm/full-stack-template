import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";

const mockUserRepository: jest.Mocked<IUserRepository> = {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn(),
};

export default mockUserRepository;
