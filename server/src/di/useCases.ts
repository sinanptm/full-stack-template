import container from ".";
import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import SignupUseCase from "@/use_case/user/auth/SignupUseCase";
import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";
import GetProfileUseCase from "@/use_case/user/GetProfileUseCase";
import AdminSigninUseCase from "@/use_case/admin/SigninUseCase";
import GetUsersUseCase from "@/use_case/admin/GetUsersUseCase";
import OAuthUseCase from "@/use_case/user/auth/OAuthUseCase";
import UpdateProfileUseCase from "@/use_case/user/UpdateProfileUseCase";

export enum UseCases {
  SigninUseCase = "SigninUseCase",
  SignupUseCase = "SignupUseCase",
  LogoutUseCase = "LogoutUseCase",
  OtpUseCase = "OtpUseCase",
  ResetPasswordUseCase = "ResetPasswordUseCase",
  OAuthUseCase = "OAuthUseCase",

  GetProfileUseCase = "GetProfileUseCase",
  UpdateProfileUseCase = "UpdateProfileUseCase",

  AdminSigninUseCase = "AdminSigninUseCase",
  GetUsersUseCase = "GetUsersUseCase"
}

container.bind(UseCases.SigninUseCase).to(SigninUseCase);
container.bind(UseCases.SignupUseCase).to(SignupUseCase);
container.bind(UseCases.OtpUseCase).to(OtpUseCase);
container.bind(UseCases.ResetPasswordUseCase).to(ResetPasswordUseCase);
container.bind(UseCases.OAuthUseCase).to(OAuthUseCase);

container.bind(UseCases.GetProfileUseCase).to(GetProfileUseCase);
container.bind(UseCases.UpdateProfileUseCase).to(UpdateProfileUseCase);


// admin
container.bind(UseCases.AdminSigninUseCase).to(AdminSigninUseCase);
container.bind(UseCases.GetUsersUseCase).to(GetUsersUseCase);