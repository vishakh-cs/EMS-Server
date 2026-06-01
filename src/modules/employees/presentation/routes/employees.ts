import { Router } from "express";
import { employeesController } from "../../di";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";
import { protectedMiddleware } from "../../../../shared/middleware/protected.middleware";

const router = Router();

router.get("/", employeesController.getAll.bind(employeesController));
router.post("/create", authMiddleware, employeesController.create.bind(employeesController));
router.post("/login", protectedMiddleware, employeesController.login.bind(employeesController))
router.get("/profile", authMiddleware, employeesController.getProfile.bind(employeesController))

export default router;