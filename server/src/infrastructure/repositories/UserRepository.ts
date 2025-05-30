import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import UserModel from "../models/User";
import IUser, { UserProfilePromise, UserPromise } from "@/domain/entities/IUser";

export default class UserRepository implements IUserRepository {
  model = UserModel;
  credentials: string;

  constructor() {
    this.credentials = "-password -token -updateAt -isOAuthUser";
  }

  async findById(id: string): UserProfilePromise {
    return await this.model.findById(id).lean().select(this.credentials);
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find().select(this.credentials);
  }

  async findByEmail(email: string): UserProfilePromise {
    return await this.model.findOne({ email }).lean().select(this.credentials);
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
