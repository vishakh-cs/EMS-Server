import { Request, Response } from "express";
import { CreateOrganizationUseCase } from "../../use_cases/CreateOrganizationUseCase";
import { GetOrganizationsUseCase } from "../../use_cases/GetOrganizationsUseCase";
import {
  OrganizationCreateDTO,
  validateFields,
} from "../../domain/interfaces/organizationCreate.dto";

export default class OrganizationController {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly getOrganizationsUseCase: GetOrganizationsUseCase
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
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

  private isDuplicateKeyError(error: unknown): boolean {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === 11000
    );
  }
}
