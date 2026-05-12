import { Router } from "express";
import organizationRouter from "../modules/organization/presentation/routes/organization";
import authAdminRouter from "../modules/auth-admin/presentation/routes/auth-admin";

const router = Router();

router.use("/organizations", organizationRouter);
router.use("/auth-admins", authAdminRouter);

router.get("/", (req, res) => {
  res.json({ message: "API Root" });
});

export default router;