import { Request, Response } from "express";
import { CreateSmtpConfigUseCase } from "../../use_cases/CreateSmtpConfigUseCase";
import { GetSmtpConfigsUseCase } from "../../use_cases/GetSmtpConfigsUseCase";

export default class SmtpConfigController {
  constructor(
    private readonly createSmtpConfigUseCase: CreateSmtpConfigUseCase,
    private readonly getSmtpConfigsUseCase: GetSmtpConfigsUseCase
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const items = await this.getSmtpConfigsUseCase.execute();
    return res.json({ message: "Get all smtp-configs", data: items });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const dto: any = req.body;
    const item = ""

    return res.status(201).json({
      message: "SmtpConfig created successfully",
      data: item,
    });
  }
}
