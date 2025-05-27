import container from ".";
import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import SignupUseCase from "@/use_case/user/auth/SignupUseCase";
import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";
import ProfileUseCase from "@/use_case/user/ProfileUseCase";
import AdminSigninUseCase from "@/use_case/admin/SigninUseCase";

export enum UseCases {
  SigninUseCase = "SigninUseCase",
  SignupUseCase = "SignupUseCase",
  LogoutUseCase = "LogoutUseCase",
  OtpUseCase = "OtpUseCase",
  ResetPasswordUseCase = "ResetPasswordUseCase",
  ProfileUseCase = "ProfileUseCase",

  AdminSigninUseCase = "AdminSigninUseCase"
}

container.bind<SigninUseCase>(UseCases.SigninUseCase).to(SigninUseCase);
container.bind<SignupUseCase>(UseCases.SignupUseCase).to(SignupUseCase);
container.bind<OtpUseCase>(UseCases.OtpUseCase).to(OtpUseCase);
container.bind<ResetPasswordUseCase>(UseCases.ResetPasswordUseCase).to(ResetPasswordUseCase);
container.bind<ProfileUseCase>(UseCases.ProfileUseCase).to(ProfileUseCase);
container.bind<AdminSigninUseCase>(UseCases.AdminSigninUseCase).to(AdminSigninUseCase);