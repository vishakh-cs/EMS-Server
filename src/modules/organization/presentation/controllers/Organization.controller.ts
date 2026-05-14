import { Request, Response } from "express";
import { CreateOrganizationUseCase } from "../../use_cases/CreateOrganizationUseCase";
import { GetOrganizationsUseCase } from "../../use_cases/GetOrganizationsUseCase";
import {
  OrganizationCreateDTO,
  validateFields,
} from "../../domain/interfaces/organizationCreate.dto";
import { GetWhitelistIpsUseCase } from "../../../whitelist-ips/use_cases/GetWhitelistIpssUseCase";
import { WhitelistIpsCreateDTO } from "../../../whitelist-ips/domain/dto/whitelist-ipsCreate.dto";
import { CreateWhitelistIpsUseCase } from "../../../whitelist-ips/use_cases/CreateWhitelistIpsUseCase";

export default class OrganizationController {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly getOrganizationsUseCase: GetOrganizationsUseCase,
    private readonly getWhitelistIPSUseCase : GetWhitelistIpsUseCase,
    private readonly createWhitelistIpsUseCase: CreateWhitelistIpsUseCase,
  ) { }

  async getAll(req: Request, res: Response): Promise<Response> {

    const user = req.user;
    const isAuthenticated = user?.role === "admin";

    if (!isAuthenticated) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const organizations = await this.getOrganizationsUseCase.execute();
    return res.json({
      message: "Organizations fetched successfully",
      organizations,
    });
  }

  async createOrganization(req: Request, res: Response): Promise<Response> {
    const organization: OrganizationCreateDTO = req.body;
    const missingFields = validateFields(organization);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required organization fields",
        fields: missingFields,
      });
    }

    try {
      const createdOrganization = await this.createOrganizationUseCase.execute(
        organization
      );
      return res.status(201).json({
        message: "Organization created successfully",
        organization: createdOrganization,
      });
    } catch (error) {
      if (this.isDuplicateKeyError(error)) {
        return res.status(409).json({
          message: "Organization already exists with this orgUID",
        });
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({
        message: "Failed to create organization",
        error: message,
      });
    }
  }

  async getIPWhitelist(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    const isAuthenticated = user?.role === "admin";

    if (!isAuthenticated) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!user?.organizationUID) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const ipWhitelist = await this.getWhitelistIPSUseCase.execute(user.organizationUID);
    return res.json({
      message: "IP whitelist fetched successfully",
      ipWhitelist,
    });
  }

  async updateIPWhitelist(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    const isAuthenticated = user?.role === "admin";

    if (!isAuthenticated) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const IPListWithOrgID: WhitelistIpsCreateDTO = req.body;

    try {
      const ipWhitelist = await this.createWhitelistIpsUseCase.execute(IPListWithOrgID);
      return res.status(201).json({
        message: "IP whitelist updated successfully",
        ipWhitelist,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({
        message: "Failed to update IP whitelist",
        error: message,
      });
    }
  }

  private isDuplicateKeyError(error: unknown): boolean {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 11000
    );
  }
}
