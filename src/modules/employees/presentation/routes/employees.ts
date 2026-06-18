import { Router } from "express";
import { employeesController } from "../../di";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";
<<<<<<< HEAD
=======
import { protectedMiddleware } from "../../../../shared/middleware/protected.middleware";
>>>>>>> jobfinder

const router = Router();

router.get("/", employeesController.getAll.bind(employeesController));
<<<<<<< HEAD
router.post("/create", employeesController.create.bind(employeesController));
router.post("/login", employeesController.login.bind(employeesController))

export default router;
=======
router.post("/create", authMiddleware, employeesController.create.bind(employeesController));
router.post("/login", protectedMiddleware, employeesController.login.bind(employeesController))
router.get("/profile", authMiddleware, employeesController.getProfile.bind(employeesController))

export default router;
>>>>>>> jobfinder
