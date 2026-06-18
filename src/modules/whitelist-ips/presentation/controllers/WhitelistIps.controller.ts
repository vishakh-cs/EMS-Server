import { Request, Response } from "express";
import { WhitelistIpsCreateDTO } from "../../domain/dto/whitelist-ipsCreate.dto";
import { CreateWhitelistIpsUseCase } from "../../use_cases/CreateWhitelistIpsUseCase";
import { GetWhitelistIpsUseCase } from "../../use_cases/GetWhitelistIpssUseCase";

export default class WhitelistIpsController {
  constructor(
    private readonly createWhitelistIpsUseCase: CreateWhitelistIpsUseCase,
    private readonly getWhitelistIpssUseCase: GetWhitelistIpsUseCase
  ) {}

<<<<<<< HEAD
=======
  async getAll(req: Request, res: Response): Promise<Response> {
    const {orgID} = req.body;
    const items = await this.getWhitelistIpssUseCase.execute(orgID);
    return res.json({ message: "Get all whitelist IPs", data: items });
  }
>>>>>>> jobfinder

  async create(req: Request, res: Response): Promise<Response> {
    const dto: WhitelistIpsCreateDTO = req.body;
    const item = await this.createWhitelistIpsUseCase.execute(dto);

    return res.status(201).json({
      message: "WhitelistIps created successfully",
      data: item,
    });
  }
}
