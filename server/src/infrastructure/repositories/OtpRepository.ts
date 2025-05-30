import IOtp from "@/domain/entities/IOtp";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import OtpModel from "../models/Otp";

export default class OtpRepository implements IOtpRepository {
  model = OtpModel;
  async create(otp: number, email: string): Promise<void> {
    await this.model.create({ email, otp });
  }
  async findOne(otp: number, email: string): Promise<IOtp | null> {
    return await this.model.findOne({ otp, email }).lean();
  }
  async deleteMany(email: string): Promise<void> {
    await this.model.deleteMany({ email });
  }
}
