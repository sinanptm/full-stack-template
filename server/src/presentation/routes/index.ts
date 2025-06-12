import { Router } from "express";
import userRoutes from "./user";
import adminRoutes from "./admin";

const router = Router();

router.get("/health", (_, res) => {
  res.send("OK ✅");
});

router.use("/", userRoutes);
router.use("/admin", adminRoutes);

export default router;
