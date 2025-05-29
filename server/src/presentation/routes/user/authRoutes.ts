import { resolve } from "@/di";
import { Controllers } from "@/di/controllers";
import AuthControllers from "@/presentation/controllers/user/AuthControllers";
import RateLimiterMiddleware from "@/presentation/middlewares/RateLimiterMiddleware";
import { Router } from "express";

const router = Router();
const authControllers = resolve<AuthControllers>(Controllers.AuthControllers);
// Rate limiter for email sending endpoints
const rateLimiter = new RateLimiterMiddleware(30);
const limiter = rateLimiter.exec.bind(rateLimiter);

router.post("/signin", limiter, authControllers.signin.bind(authControllers));
router.post("/signup", authControllers.signup.bind(authControllers));
router.post("/forgot-password", limiter, authControllers.forgotPassword.bind(authControllers));
router.post("/reset-password", authControllers.resetPassword.bind(authControllers));
router.post("/verify-otp", authControllers.verifyOtp.bind(authControllers));
router.post("/resend-otp", limiter, authControllers.resendOtp.bind(authControllers));
router.post("/refresh", limiter, authControllers.refreshAccessToken.bind(authControllers));
router.post("/oauth-2", authControllers.oauthSignin.bind(authControllers));
router.delete("/logout", authControllers.logout.bind(authControllers));

export default router;
