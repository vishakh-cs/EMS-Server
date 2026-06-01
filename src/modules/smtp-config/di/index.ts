import SmtpConfigController from "../presentation/controllers/SmtpConfig.controller";
import { CreateSmtpConfigUseCase } from "../use_cases/CreateSmtpConfigUseCase";
import { GetSmtpConfigsUseCase } from "../use_cases/GetSmtpConfigsUseCase";
import { MongoSmtpConfigRepository } from "../infrastructure/repositories/MongoSmtpConfigRepository";

export const smtpConfigRepository = new MongoSmtpConfigRepository();
export const createSmtpConfigUseCase = new CreateSmtpConfigUseCase(smtpConfigRepository);
export const getSmtpConfigsUseCase = new GetSmtpConfigsUseCase(smtpConfigRepository);

export const smtpConfigController = new SmtpConfigController(
  createSmtpConfigUseCase,
  getSmtpConfigsUseCase
);
