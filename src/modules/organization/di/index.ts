import OrganizationController from "../presentation/controllers/Organization.controller";
import { CreateOrganizationUseCase } from "../use_cases/CreateOrganizationUseCase";
import { GetOrganizationsUseCase } from "../use_cases/GetOrganizationsUseCase";
import { MongoOrganizationRepository } from "../infrastructure/repositories/MongoOrganizationRepository";
import { createWhitelistIpsUseCase, getWhitelistIpsUseCase } from "../../whitelist-ips/di";
import { createEmployeesUseCase } from "../../employees/di";

export const organizationRepository = new MongoOrganizationRepository();
export const createOrganizationUseCase = new CreateOrganizationUseCase(
  organizationRepository,
  createEmployeesUseCase
);
export const getOrganizationsUseCase = new GetOrganizationsUseCase(organizationRepository);

export const organizationController = new OrganizationController(
  createOrganizationUseCase,
  getOrganizationsUseCase,
  getWhitelistIpsUseCase,
  createWhitelistIpsUseCase,
  
);
