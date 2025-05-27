import { UseCases } from "@/di/useCases";
import { StatusCode } from "@/types";
import ProfileUseCase from "@/use_case/user/ProfileUseCase";
import { tryCatch } from "@/utils";
import { inject } from "inversify";

export default class ProfileController {
    constructor(
        @inject(UseCases.ProfileUseCase) private readonly profileUseCase: ProfileUseCase
    ) { }

    getProfile = tryCatch(async (req, res) => {
        const userId = req.user?.id!;
        const user = await this.profileUseCase.exec({ userId });
        res.status(StatusCode.Success).json({ user });
    });
}