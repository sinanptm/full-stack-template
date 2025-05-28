import container from ".";
import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import SignupUseCase from "@/use_case/user/auth/SignupUseCase";
import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";
import ProfileUseCase from "@/use_case/user/ProfileUseCase";
import AdminSigninUseCase from "@/use_case/admin/SigninUseCase";
import GetUsersUseCase from "@/use_case/admin/GetUsersUseCase";

export enum UseCases {
  SigninUseCase = "SigninUseCase",
  SignupUseCase = "SignupUseCase",
  LogoutUseCase = "LogoutUseCase",
  OtpUseCase = "OtpUseCase",
  ResetPasswordUseCase = "ResetPasswordUseCase",
  ProfileUseCase = "ProfileUseCase",

  AdminSigninUseCase = "AdminSigninUseCase",
  GetUsersUseCase = "GetUsersUseCase"
}

container.bind(UseCases.SigninUseCase).to(SigninUseCase);
container.bind(UseCases.SignupUseCase).to(SignupUseCase);
container.bind(UseCases.OtpUseCase).to(OtpUseCase);
container.bind(UseCases.ResetPasswordUseCase).to(ResetPasswordUseCase);
container.bind(UseCases.ProfileUseCase).to(ProfileUseCase);
// admin
container.bind(UseCases.AdminSigninUseCase).to(AdminSigninUseCase);
container.bind(UseCases.GetUsersUseCase).to(GetUsersUseCase);