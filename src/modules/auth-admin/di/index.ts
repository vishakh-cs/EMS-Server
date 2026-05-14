import AuthAdminController from "../presentation/controllers/AuthAdmin.controller";
import { CreateAuthAdminUseCase } from "../use_cases/CreateAuthAdminUseCase";
import { GetAuthAdminsUseCase } from "../use_cases/GetAuthAdminsUseCase";
import { MongoAuthAdminRepository } from "../infrastructure/repositories/MongoAuthAdminRepository";
import { LoginAdminUseCase } from "../use_cases/LoginAdminUseCase";
import { createOrganizationUseCase } from "../../organization/di";

export const authAdminRepository = new MongoAuthAdminRepository();
export const createAuthAdminUseCase = new CreateAuthAdminUseCase(authAdminRepository);
export const getAuthAdminsUseCase = new GetAuthAdminsUseCase(authAdminRepository);
export const loginAdminUseCase = new LoginAdminUseCase(authAdminRepository);

export const authAdminController = new AuthAdminController(
  createAuthAdminUseCase,
  getAuthAdminsUseCase,
  loginAdminUseCase,
  createOrganizationUseCase,

);
