import { Repositories } from "@/di/repositories";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import { inject } from "inversify";

export default class GetUsersUseCase {
  constructor(@inject(Repositories.UserRepository) private readonly userRepository: IUserRepository) {}

  async exec() {
    const users = await this.getUsers();
    return users;
  }

  private async getUsers() {
    const users = await this.userRepository.findAll();

    return users.map(({ password, token, updatedAt, isOAuthUser, ...rest }) => rest);
  }
}
