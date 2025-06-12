import { UseCases } from "@/di/useCases";
import { StatusCode } from "@/types";
import GetProfileUseCase from "@/use_case/user/GetProfileUseCase";
import UpdateProfileUseCase from "@/use_case/user/UpdateProfileUseCase";
import { tryCatch } from "@/utils";
import { inject } from "inversify";

export default class ProfileController {
  constructor(
    @inject(UseCases.GetProfileUseCase) private readonly getProfileUseCase: GetProfileUseCase,
    @inject(UseCases.UpdateProfileUseCase) private readonly updateProfileUseCase: UpdateProfileUseCase,
  ) {}

  getProfile = tryCatch(async (req, res) => {
    const userId = req.user?.id!;
    const user = await this.getProfileUseCase.exec({ userId });
    res.status(StatusCode.Success).json({ user });
  });

  updateProfile = tryCatch(async (req, res) => {
    const id = req.user?.id;
    const user = await this.updateProfileUseCase.exec({ _id: id, ...req.body });
    res.status(StatusCode.Success).json({ message: "Details Update successfully", user });
  });
}
