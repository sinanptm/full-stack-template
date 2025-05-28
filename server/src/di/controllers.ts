import AuthControllers from "@/presentation/controllers/user/AuthControllers";
import container from ".";
import ProfileController from "@/presentation/controllers/user/ProfileController";
import AdminAuthController from "@/presentation/controllers/admin/AuthController";
import AdminController from "@/presentation/controllers/admin/AdminConroller";

export enum Controllers {
  AuthControllers = "AuthControllers",
  ProfileController = "ProfileController",
  AdminAuthController = "AdminAuthController",
  AdminController = "AdminController"
}

container.bind(Controllers.AuthControllers).to(AuthControllers);
container.bind(Controllers.ProfileController).to(ProfileController);
container.bind(Controllers.AdminAuthController).to(AdminAuthController);
container.bind(Controllers.AdminController).to(AdminController);