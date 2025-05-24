import { resolve } from "@/di";
import { MiddleWares } from "@/di/middlewares";
import UserAuthMiddleware from "@/presentation/middlewares/UserAuthMiddleware";
import { Router } from "express";

const router = Router();

const authMiddleware = resolve<UserAuthMiddleware>(MiddleWares.UserAuthMiddleware);

router.get("/", authMiddleware.exec, (req, res) => { res.send("SUccess"); });

export default router;