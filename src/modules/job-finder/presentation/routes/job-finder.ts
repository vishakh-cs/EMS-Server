import { Router } from "express";
import { jobFinderController } from "../../di";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", jobFinderController.getAll.bind(jobFinderController));
router.post("/", authMiddleware, jobFinderController.create.bind(jobFinderController));
router.post("/create-smtp-config", authMiddleware, jobFinderController.createSmtpConfig.bind(jobFinderController));
router.post("/send-email", authMiddleware, jobFinderController.sendEmail.bind(jobFinderController));
router.get("/mail-history", authMiddleware, jobFinderController.getMailHistory.bind(jobFinderController));
router.get("/job-findings", authMiddleware, jobFinderController.getJobFindings.bind(jobFinderController));
router.post("/start-find", authMiddleware, jobFinderController.startFind.bind(jobFinderController));

export default router;
