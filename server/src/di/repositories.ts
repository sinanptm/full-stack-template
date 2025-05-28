import container from ".";
import UserRepository from "@/infrastructure/repositories/UserRepository";
import OtpRepository from "@/infrastructure/repositories/OtpRepository";

export enum Repositories {
  UserRepository = "UserRepository",
  OtpRepository = "OtpRepository",
}

container.bind(Repositories.UserRepository).to(UserRepository).inSingletonScope();
container.bind(Repositories.OtpRepository).to(OtpRepository).inSingletonScope();
