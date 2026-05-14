import { Request, Response } from "express";
import { AuthAdminCreateDTO } from "../../domain/dto/auth-adminCreate.dto";
import { CreateAuthAdminUseCase } from "../../use_cases/CreateAuthAdminUseCase";
import { GetAuthAdminsUseCase } from "../../use_cases/GetAuthAdminsUseCase";
import { AuthAdminLoginDTO } from "../../domain/dto/auth-adminLogin.dto";
import { LoginAdminUseCase } from "../../use_cases/LoginAdminUseCase";
import { generateAccessToken, generateRefreshToken } from "../../../../shared/jwt";
import { OrganizationCreateDTO } from "../../../organization/domain/interfaces/organizationCreate.dto";
import { CreateOrganizationUseCase } from "../../../organization/use_cases/CreateOrganizationUseCase";

export default class AuthAdminController {
  constructor(
    private readonly createAuthAdminUseCase: CreateAuthAdminUseCase,
    private readonly getAuthAdminsUseCase: GetAuthAdminsUseCase,
    private readonly loginAdminUseCase: LoginAdminUseCase,
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
  ) { }

  async getAll(req: Request, res: Response): Promise<Response> {
    const items = await this.getAuthAdminsUseCase.execute();
    return res.json({ message: "Get all auth-admins", data: items });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const dto: AuthAdminCreateDTO = req.body;
    const item = await this.createAuthAdminUseCase.execute(dto);

    return res.status(201).json({
      message: "AuthAdmin created successfully",
      data: item,
    });
  }

  async adminLogin(req: Request, res: Response): Promise<Response> {
    const dto: AuthAdminLoginDTO = req.body;
    const user = await this.loginAdminUseCase.execute(dto);

    if (!user) {
      return res.status(404).json({
        message: "admin not found",
      });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: "admin",
    }

    const token = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return res.status(201).json({
      message: "AuthAdmin Login successfully",
      data: {
        ...user,
        token,
        refreshToken,
      },
    });
  }


  async registerOrganization(req: Request, res: Response): Promise<Response> {
    const user = req.user
    const dto: OrganizationCreateDTO = req.body;
    const item = await this.createOrganizationUseCase.execute(dto);

    return res.status(201).json({
      message: "Organization created successfully",
      data: item,
    });
  }

}
