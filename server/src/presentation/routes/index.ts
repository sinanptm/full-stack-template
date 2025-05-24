import { Router } from "express";
import userRoutes from "./user";

const router = Router();

router.get("/health", (_, res) => {
  res.send("OK ✅");
});

router.use("/", userRoutes);

export default router;
