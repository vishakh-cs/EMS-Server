import { Router } from "express";
import { employeesController } from "../../di";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", employeesController.getAll.bind(employeesController));
router.post("/create", employeesController.create.bind(employeesController));
router.post("/login", employeesController.login.bind(employeesController))

export default router;
