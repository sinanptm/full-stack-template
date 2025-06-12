import { resolve } from "@/di";
import { Controllers } from "@/di/controllers";
import { MiddleWares } from "@/di/middlewares";
import ProfileController from "@/presentation/controllers/user/ProfileController";
import UserAuthMiddleware from "@/presentation/middlewares/UserAuthMiddleware";
import { Router } from "express";

const router = Router();

const authMiddleware = resolve<UserAuthMiddleware>(MiddleWares.UserAuthMiddleware);
const profileController = resolve<ProfileController>(Controllers.ProfileController);

router.use(authMiddleware.exec);

router
  .route("/")
  .get(profileController.getProfile.bind(profileController))
  .put(profileController.updateProfile.bind(profileController));

export default router;
