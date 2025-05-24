import AuthControllers from "@/presentation/controllers/user/AuthControllers";
import container from ".";

export enum Controllers {
  AuthControllers = "AuthControllers",
}

container.bind<AuthControllers>(Controllers.AuthControllers).to(AuthControllers);
