import IUser, { UserProfilePromise, UserPromise } from "@/domain/entities/IUser";
import IBaseRepository from "./IBaseRepository";

export default interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): UserProfilePromise;
  findById(id: string): UserProfilePromise;

  findByIdWithCredentials(id: string): UserPromise;
  findByEmailWithCredentials(email: string): UserPromise;
}