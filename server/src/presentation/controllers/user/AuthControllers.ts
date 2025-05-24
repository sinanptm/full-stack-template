import { UseCases } from "@/di/useCases";
import { Cookies, StatusCode } from "@/types";
import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import SignupUseCase from "@/use_case/user/auth/SignupUseCase";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { tryCatch } from "@/utils";
import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";

@injectable()
export default class AuthControllers {
  constructor(
    @inject(UseCases.SigninUseCase) private readonly signinUseCase: SigninUseCase,
    @inject(UseCases.SignupUseCase) private readonly signupUseCase: SignupUseCase,
    @inject(UseCases.OtpUseCase) private readonly otpUseCase: OtpUseCase,
    @inject(UseCases.ResetPasswordUseCase) private readonly resetPasswordUseCase: ResetPasswordUseCase
  ) { }

  signin = tryCatch(async (req: Request, res: Response) => {
    await this.signinUseCase.exec(req.body);
    res.status(StatusCode.Success).json({ message: "Signin Successful, OTP sent to your email" });
  });

  signup = tryCatch(async (req: Request, res: Response) => {
    await this.signupUseCase.exec(req.body);
    res.status(StatusCode.Created).json({ message: "User created, Please Login" });
  });

  logout = tryCatch(async (req: Request, res: Response) => {
    const { user_token } = req.cookies;
    if (!user_token) return res.sendStatus(StatusCode.NoContent);

    res.clearCookie(Cookies.User, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.status(StatusCode.Success).json({ message: "Logout successful" });
  });

  verifyOtp = tryCatch(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, user } = await this.otpUseCase.exec(req.body);

    res.cookie(Cookies.User, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCode.Success).json({ accessToken, user });
  });

  resendOtp = tryCatch(async (req: Request, res: Response) => {
    await this.otpUseCase.resendOtp(req.body);
    res.status(StatusCode.Success).json({ message: "New OTP sent to your email" });
  });

  startResetPassword = tryCatch(async (req: Request, res: Response) => {
    await this.resetPasswordUseCase.initiate(req.body);
    res.status(StatusCode.Success).json({ message: "Reset password OTP sent to your email" });
  });

  resetPassword = tryCatch(async (req: Request, res: Response) => {
    await this.resetPasswordUseCase.exec(req.body);
    res.status(StatusCode.Success).json({ message: "Password changing Successful, Please login again" });
  });

  refreshAccessToken = tryCatch(async (req: Request, res: Response) => {
    const { user_token } = req.cookies;
    if (!user_token) return res.status(StatusCode.Forbidden).json({ message: "Unauthenticated" });
    const { accessToken } = await this.signinUseCase.refreshAccessToken(user_token);
    res.status(StatusCode.Success).json({ accessToken });
  });
}
