import WhitelistIpsController from "../presentation/controllers/WhitelistIps.controller";
import { CreateWhitelistIpsUseCase } from "../use_cases/CreateWhitelistIpsUseCase";
import { MongoWhitelistIpsRepository } from "../infrastructure/repositories/MongoWhitelistIpsRepository";
import { GetWhitelistIpsUseCase } from "../use_cases/GetWhitelistIpssUseCase";

export const whitelistIpsRepository = new MongoWhitelistIpsRepository();
export const createWhitelistIpsUseCase = new CreateWhitelistIpsUseCase(whitelistIpsRepository);
export const getWhitelistIpsUseCase = new GetWhitelistIpsUseCase(whitelistIpsRepository);

export const whitelistIpsController = new WhitelistIpsController(
  createWhitelistIpsUseCase,
  getWhitelistIpsUseCase,
);
