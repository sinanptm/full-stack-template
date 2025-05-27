import { resolve } from "@/di";
import { Controllers } from "@/di/controllers";
import AdminAuthController from "@/presentation/controllers/admin/AuthController";
import { Router } from "express";

const router = Router();

const authController = resolve<AdminAuthController>(Controllers.AdminAuthController);

router.post("/", authController.signin.bind(authController));
router.delete("/logout", authController.logout.bind(authController));
router.post("/refresh", authController.refreshAccessToken.bind(authController));

export default router;
