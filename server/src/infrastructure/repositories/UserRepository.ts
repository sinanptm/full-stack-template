import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import UserModel from "../models/User";
import IUser from "@/domain/entities/IUser";
import { injectable } from "inversify";

@injectable()
export default class UserRepository implements IUserRepository {
  model = UserModel;

  async findById(id: string): Promise<IUser | null> {
    return await this.model.findById(id).lean();
  }
  async update(id: string, entity: IUser): Promise<IUser | null> {
    return await this.model.findByIdAndUpdate(id, entity);
  }
  async delete(id: string): Promise<void> {
    await this.model.deleteMany({ id });
  }
  async create(payload: IUser): Promise<IUser> {
    return await this.model.create(payload);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email });
  }
}
