import { resolve } from "@/di";
import { Controllers } from "@/di/controllers";
import AdminController from "@/presentation/controllers/admin/AdminConroller";
import { Router } from "express";

const router = Router();

const adminController = resolve<AdminController>(Controllers.AdminController);

router.get('/', adminController.getUsers.bind(adminController));

export default router;