import { UseCases } from "@/di/useCases";
import { StatusCode } from "@/types";
import GetUsersUseCase from "@/use_case/admin/GetUsersUseCase";
import UpdateUserUseCase from "@/use_case/admin/UpdateUserUseCase";
import { tryCatch } from "@/utils";
import { inject } from "inversify";

export default class AdminController {
  constructor(
    @inject(UseCases.GetUsersUseCase) private readonly getUsersUseCase: GetUsersUseCase,
    @inject(UseCases.UpdateUserUseCase) private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  getUsers = tryCatch(async (req, res) => {
    const users = await this.getUsersUseCase.exec();
    res.status(StatusCode.Success).json({ users });
  });

  updateUser = tryCatch(async (req, res) => {
    const _id = req.params.id;
    const user = await this.updateUserUseCase.exec({ _id, ...req.body });
    res.status(StatusCode.Success).json({ user, message: "User Profile Updated Successfully" });
  });

  toggleBlock = tryCatch(async (req, res) => {
    const id = req.params.id;
    await this.updateUserUseCase.blockUer(id);
    res.status(StatusCode.Success).json({ message: "Updated User Block Status Successfully" });
  });
}
