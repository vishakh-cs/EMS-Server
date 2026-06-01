import { Router } from "express";
import organizationRouter from "../modules/organization/presentation/routes/organization";
import authAdminRouter from "../modules/auth-admin/presentation/routes/auth-admin";
import employeesRouter from "../modules/employees/presentation/routes/employees";
import employeeTaskRouter from "../modules/employee-task/presentation/routes/employee-task";
import jobFinderRouter from "../modules/job-finder/presentation/routes/job-finder";
import smtpConfigRouter from "../modules/smtp-config/presentation/routes/smtp-config";

const router = Router();

router.use("/auth-admins", authAdminRouter);
router.use("/organizations", organizationRouter);
router.use("/employees", employeesRouter);
router.use("/employee-tasks", employeeTaskRouter);
router.use("/job-finders", jobFinderRouter);
router.use("/smtp-configs", smtpConfigRouter);

router.get("/", (req, res) => {
  res.json({ message: "API Root" });
});

export default router;