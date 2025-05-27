import AuthControllers from "@/presentation/controllers/user/AuthControllers";
import container from ".";
import ProfileController from "@/presentation/controllers/user/ProfileController";
import AdminAuthController from "@/presentation/controllers/admin/AuthController";

export enum Controllers {
  AuthControllers = "AuthControllers",
  ProfileController = "ProfileController",
  AdminAuthController = "AdminAuthController"
}

container.bind<AuthControllers>(Controllers.AuthControllers).to(AuthControllers);
container.bind<ProfileController>(Controllers.ProfileController).to(ProfileController);
container.bind<AdminAuthController>(Controllers.AdminAuthController).to(AdminAuthController);