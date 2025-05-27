import { UseCases } from "@/di/useCases";
import { Cookies, StatusCode } from "@/types";
import AdminSigninUseCase from "@/use_case/admin/SigninUseCase";
import { tryCatch } from "@/utils";
import { inject } from "inversify";

export default class AdminAuthController {
    constructor(
        @inject(UseCases.AdminSigninUseCase) private readonly adminSigninUseCase: AdminSigninUseCase
    ) { };

    signin = tryCatch(async (req, res) => {
        const { accessToken, refreshToken } = this.adminSigninUseCase.exec(req.body);

        res.cookie(Cookies.Admin, refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(StatusCode.Success).json({ accessToken, message: "Signin Successful." });
    });

    logout = tryCatch(async (req, res) => {
        const { admin_token } = req.cookies;
        if (!admin_token) return res.sendStatus(StatusCode.NoContent);

        res.clearCookie(Cookies.Admin, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

    });

    refreshAccessToken = tryCatch(async (req, res) => {
        const { admin_token } = req.cookies;
        const { accessToken } = await this.adminSigninUseCase.refreshAccessToken(admin_token);
        res.status(StatusCode.Success).json({ accessToken, message: "Access token refreshed successfully." });
    });
}