import { UseCases } from "@/di/useCases";
import { StatusCode } from "@/types";
import GetUsersUseCase from "@/use_case/admin/GetUsersUseCase";
import { tryCatch } from "@/utils";
import { inject, injectable } from "inversify";

@injectable()
export default class AdminController {
    constructor(
        @inject(UseCases.GetUsersUseCase) private readonly getUsersUseCase: GetUsersUseCase
    ) { }

    getUsers = tryCatch(async (req, res) => {
        const users = await this.getUsersUseCase.exec();
        res.status(StatusCode.Success).json(users);
    });

}