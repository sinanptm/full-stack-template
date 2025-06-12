import UserAuthMiddleware from "@/presentation/middlewares/UserAuthMiddleware";
import container from ".";
import AdminAuthMiddleware from "@/presentation/middlewares/AdminAuthMiddleware";

export enum MiddleWares {
  UserAuthMiddleware = "UserAuthMiddleware",
  AdminAuthMiddleware = "AdminAuthMiddleware",
}

container.bind(MiddleWares.UserAuthMiddleware).to(UserAuthMiddleware);
container.bind(MiddleWares.AdminAuthMiddleware).to(AdminAuthMiddleware);
