import { Router } from "express";
import { whitelistIpsController } from "../../di";

const router = Router();

router.post("/", whitelistIpsController.create.bind(whitelistIpsController));
<<<<<<< HEAD
=======
router.get("/", whitelistIpsController.getAll.bind(whitelistIpsController));
>>>>>>> jobfinder

export default router;
