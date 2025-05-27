import { Router } from "express";
import authRoutes from "./authRoutes";
import ErrorHandler from "@/presentation/middlewares/ErrorHandler";
import profileRoutes from "./profileRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

router.use(new ErrorHandler().exec);
export default router;
