import UserAuthMiddleware from "@/presentation/middlewares/UserAuthMiddleware";
import container from ".";

export enum MiddleWares {
    UserAuthMiddleware = "UserAuthMiddleware"
};

container.bind<UserAuthMiddleware>(MiddleWares.UserAuthMiddleware).to(UserAuthMiddleware);