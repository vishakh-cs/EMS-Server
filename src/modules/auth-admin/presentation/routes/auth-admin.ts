import { Router } from "express";
import { authAdminController } from "../../di";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authAdminController.getAll.bind(authAdminController));
router.post("/register-admin",authAdminController.create.bind(authAdminController));
router.post("/admin-login", authAdminController.adminLogin.bind(authAdminController));
router.post("/register-organization", authMiddleware, authAdminController.registerOrganization.bind(authAdminController))

export default router;
