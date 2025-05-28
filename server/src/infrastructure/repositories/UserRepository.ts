import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import UserModel from "../models/User";
import IUser, { UserProfilePromise, UserPromise } from "@/domain/entities/IUser";
import { injectable } from "inversify";

@injectable()
export default class UserRepository implements IUserRepository {
  model = UserModel;

  async findById(id: string): UserProfilePromise {
    return await this.model.findById(id).lean().select("-password -token -updateAt");
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find().select("-password -token -updateAt")
  }

  async findByEmail(email: string): UserProfilePromise {
    return await this.model.findOne({ email }).lean().select("-password -token -updateAt");
  }

  async findByIdWithCredentials(id: string): UserPromise {
    return await this.model.findById(id).lean();
  }

  async findByEmailWithCredentials(email: string): UserPromise {
    return await this.model.findOne({ email }).lean();
  }

  async update(id: string, entity: IUser): UserPromise {
    return await this.model.findByIdAndUpdate(id, entity, { new: true }).lean();
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id });
  }

  async create(payload: IUser): Promise<IUser> {
    return await this.model.create(payload);
  }
}
