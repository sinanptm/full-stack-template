import { UseCases } from "@/di/useCases";
import { Cookies, StatusCode } from "@/types";
import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import SignupUseCase from "@/use_case/user/auth/SignupUseCase";
import { inject } from "inversify";
import { tryCatch } from "@/utils";
import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";
import OAuthUseCase from "@/use_case/user/auth/OAuthUseCase";

export default class AuthControllers {
  constructor(
    @inject(UseCases.SigninUseCase) private readonly signinUseCase: SigninUseCase,
    @inject(UseCases.SignupUseCase) private readonly signupUseCase: SignupUseCase,
    @inject(UseCases.OtpUseCase) private readonly otpUseCase: OtpUseCase,
    @inject(UseCases.ResetPasswordUseCase) private readonly resetPasswordUseCase: ResetPasswordUseCase,
    @inject(UseCases.OAuthUseCase) private readonly oauthUseCase: OAuthUseCase,
  ) {}

  signin = tryCatch(async (req, res) => {
    const { email } = await this.signinUseCase.exec(req.body);
    res
      .status(StatusCode.Success)
      .json({ message: "Sign-in initiated. Please check your email for the OTP.", email });
  });

  oauthSignin = tryCatch(async (req, res) => {
    const { accessToken, refreshToken, user } = await this.oauthUseCase.exec(req.body);

    res.cookie(Cookies.User, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res
      .status(StatusCode.Success)
      .json({ accessToken, user, message: "OAuth Signin Success. You are now signed in." });
  });

  signup = tryCatch(async (req, res) => {
    await this.signupUseCase.exec(req.body);
    res
      .status(StatusCode.Created)
      .json({ message: "Account created successfully. Please sign in to continue." });
  });

  verifyOtp = tryCatch(async (req, res) => {
    const { accessToken, refreshToken, user } = await this.otpUseCase.exec(req.body);

    res.cookie(Cookies.User, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res
      .status(StatusCode.Success)
      .json({ accessToken, user, message: "OTP verified. You are now signed in." });
  });

  resendOtp = tryCatch(async (req, res) => {
    await this.otpUseCase.resendOtp(req.body);
    res.status(StatusCode.Success).json({ message: "A new OTP has been sent to your email." });
  });

  forgotPassword = tryCatch(async (req, res) => {
    await this.resetPasswordUseCase.forgotPassword(req.body);
    res.status(StatusCode.Success).json({ message: "A password reset link has been sent to your email." });
  });

  resetPassword = tryCatch(async (req, res) => {
    await this.resetPasswordUseCase.exec(req.body);
    res
      .status(StatusCode.Success)
      .json({ message: "Password reset successfully. Please sign in with your new password." });
  });

  refreshAccessToken = tryCatch(async (req, res) => {
    const { user_token } = req.cookies;
    const { accessToken } = await this.signinUseCase.refreshAccessToken(user_token);
    res.status(StatusCode.Success).json({ accessToken, message: "Access token refreshed successfully." });
  });

  logout = tryCatch(async (req, res) => {
    const { user_token } = req.cookies;
    if (!user_token) return res.sendStatus(StatusCode.NoContent);

    res.clearCookie(Cookies.User, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.status(StatusCode.Success).json({ message: "Successfully logged out." });
  });
}
