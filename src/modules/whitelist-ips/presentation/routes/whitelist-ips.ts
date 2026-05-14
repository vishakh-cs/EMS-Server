import { Router } from "express";
import { whitelistIpsController } from "../../di";

const router = Router();

router.post("/", whitelistIpsController.create.bind(whitelistIpsController));

export default router;
