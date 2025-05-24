import IUser from "@/domain/entities/IUser";
import BaseRepository from "./BaseRepository";

export default interface IUserRepository extends BaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}
