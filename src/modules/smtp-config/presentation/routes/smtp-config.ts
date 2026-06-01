import { Router } from "express";
import { smtpConfigController } from "../../di";

const router = Router();

router.get("/", smtpConfigController.getAll.bind(smtpConfigController));
router.post("/", smtpConfigController.create.bind(smtpConfigController));

export default router;
