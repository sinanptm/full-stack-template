import AuthControllers from "@/presentation/controllers/user/AuthControllers";
import container from ".";
import ProfileController from "@/presentation/controllers/user/ProfileController";

export enum Controllers {
  AuthControllers = "AuthControllers",
  ProfileController = "ProfileController",
}

container.bind<AuthControllers>(Controllers.AuthControllers).to(AuthControllers);
container.bind<ProfileController>(Controllers.ProfileController).to(ProfileController);
