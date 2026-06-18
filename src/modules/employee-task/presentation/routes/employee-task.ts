import { Router } from "express";
import { employeeTaskController } from "../../di";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";
import { protectedMiddleware } from "../../../../shared/middleware/protected.middleware";

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get("/", employeeTaskController.getAll.bind(employeeTaskController));
router.get("/:id", employeeTaskController.getById.bind(employeeTaskController));
router.post("/", protectedMiddleware, employeeTaskController.create.bind(employeeTaskController));
router.put("/:id", protectedMiddleware, employeeTaskController.update.bind(employeeTaskController));

export default router;
