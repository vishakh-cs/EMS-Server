import { Request, Response } from "express";
import { CreateOrganizationUseCase } from "../../use_cases/CreateOrganizationUseCase";
import { GetOrganizationsUseCase } from "../../use_cases/GetOrganizationsUseCase";
import { GetWhitelistIpsUseCase } from "../../../whitelist-ips/use_cases/GetWhitelistIpssUseCase";
import { WhitelistIpsCreateDTO } from "../../../whitelist-ips/domain/dto/whitelist-ipsCreate.dto";
import { CreateWhitelistIpsUseCase } from "../../../whitelist-ips/use_cases/CreateWhitelistIpsUseCase";
import { OrganizationCreateDTO } from "../../domain/dto/organizationCreate.dto";

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

<<<<<<< HEAD
  async createOrganization(req: Request, res: Response): Promise<Response> {
    const organization: OrganizationCreateDTO = req.body;

=======
  
  async createOrganization(req: Request, res: Response): Promise<Response> {
    const organization: OrganizationCreateDTO = req.body;
    
>>>>>>> jobfinder
    try {
      const createdOrganization = await this.createOrganizationUseCase.execute(
        organization
      );
      return res.status(201).json({
        message: "Organization created successfully",
        organization: createdOrganization,
      });
    } catch (error: any) {
      if (error.status === 400) {
        return res.status(400).json({
          message: error.message,
          fields: error.fields,
        });
      }
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
<<<<<<< HEAD

  async getIPWhitelist(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    const isAuthenticated = user?.role === "admin";

=======
  
  async getIPWhitelist(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    const isAuthenticated = user?.role === "admin";
    
>>>>>>> jobfinder
    if (!isAuthenticated) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
<<<<<<< HEAD

=======
    
>>>>>>> jobfinder
    if (!user?.organizationUID) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
<<<<<<< HEAD

=======
    
>>>>>>> jobfinder
    const ipWhitelist = await this.getWhitelistIPSUseCase.execute(user.organizationUID);
    return res.json({
      message: "IP whitelist fetched successfully",
      ipWhitelist,
    });
  }

  async updateIPWhitelist(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    const isAuthenticated = user?.role === "admin";
<<<<<<< HEAD

=======
    
>>>>>>> jobfinder
    if (!isAuthenticated) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
<<<<<<< HEAD

    const IPListWithOrgID: WhitelistIpsCreateDTO = req.body;

=======
    
    const IPListWithOrgID: WhitelistIpsCreateDTO = req.body;
    
>>>>>>> jobfinder
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
<<<<<<< HEAD

=======
  
>>>>>>> jobfinder
  private isDuplicateKeyError(error: unknown): boolean {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 11000
    );
  }
}
