import { Router } from "express";
import { jobFinderController } from "../../di";

const router = Router();

router.get("/", jobFinderController.getAll.bind(jobFinderController));
router.post("/", jobFinderController.create.bind(jobFinderController));
router.post("/create-smtp-config",jobFinderController.createSmtpConfig.bind(jobFinderController))

export default router;
