import { Router } from "express";
import organizationRouter from "../modules/organization/presentation/routes/organization";
import authAdminRouter from "../modules/auth-admin/presentation/routes/auth-admin";
import employeesRouter from "../modules/employees/presentation/routes/employees";

const router = Router();

router.use("/auth-admins", authAdminRouter);
router.use("/organizations", organizationRouter);
router.use("/employees", employeesRouter);

router.get("/", (req, res) => {
  res.json({ message: "API Root" });
});

export default router;