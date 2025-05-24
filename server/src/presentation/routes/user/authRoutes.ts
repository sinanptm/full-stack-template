import { resolve } from "@/di";
import { Controllers } from "@/di/controllers";
import AuthControllers from "@/presentation/controllers/user/AuthControllers";
import { Router } from "express";

const router = Router();
const authControllers = resolve<AuthControllers>(Controllers.AuthControllers);

router.post("/signin", authControllers.signin.bind(authControllers));
router.post("/signup", authControllers.signup.bind(authControllers));
router.post("/start-reset-password", authControllers.startResetPassword.bind(authControllers));
router.post("/reset-password", authControllers.resetPassword.bind(authControllers));
router.post("/verify-otp", authControllers.verifyOtp.bind(authControllers));
router.post("/resend-otp", authControllers.resendOtp.bind(authControllers));
router.delete("/logout", authControllers.logout.bind(authControllers));

export default router;
