import { Router } from "express";
import { organizationController } from "../../di";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, organizationController.getAll.bind(organizationController));
router.post("/", authMiddleware, organizationController.createOrganization.bind(organizationController));
router.get("/whitelist-ips", authMiddleware,organizationController.getIPWhitelist.bind(organizationController));
router.put("/whitelist-ips", authMiddleware,organizationController.updateIPWhitelist.bind(organizationController));

export default router;
