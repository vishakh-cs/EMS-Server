import { Router } from "express";
import { organizationController } from "../../di";

const router = Router();

router.get("/", organizationController.getAll.bind(organizationController));
router.post("/", organizationController.createOrganization.bind(organizationController));

export default router;
