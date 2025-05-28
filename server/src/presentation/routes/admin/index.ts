import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import { resolve } from "@/di";
import AdminAuthMiddleware from "@/presentation/middlewares/AdminAuthMiddleware";
import { MiddleWares } from "@/di/middlewares";


const router = Router();

const authMiddleWare = resolve<AdminAuthMiddleware>(MiddleWares.AdminAuthMiddleware);
router.use("/auth", authRoutes);

router.use(authMiddleWare.exec);
router.use("/user", userRoutes);

export default router;