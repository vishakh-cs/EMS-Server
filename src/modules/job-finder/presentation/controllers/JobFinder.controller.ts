import { Request, Response } from "express";
import { JobFinderCreateDTO } from "../../domain/dto/job-finderCreate.dto";
import { CreateJobFinderUseCase } from "../../use_cases/CreateJobFinderUseCase";
import { GetJobFindersUseCase } from "../../use_cases/GetJobFindersUseCase";
import { SmtpConfigInputDto } from "../../../smtp-config/domain/dto/smtp-configCreate.dto";
import { CreateSmtpConfigUseCase } from "../../../smtp-config/use_cases/CreateSmtpConfigUseCase";

export default class JobFinderController {
  constructor(
    private readonly createJobFinderUseCase: CreateJobFinderUseCase,
    private readonly getJobFindersUseCase: GetJobFindersUseCase,
    private readonly createSmtpConfigUseCase: CreateSmtpConfigUseCase,
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const items = await this.getJobFindersUseCase.execute();
    return res.json({ message: "Get all job-finders", data: items });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const dto: JobFinderCreateDTO = req.body;
    const item = await this.createJobFinderUseCase.execute(dto);

    return res.status(201).json({
      message: "JobFinder created successfully",
      data: item,
    });
  }

  async createSmtpConfig(req: Request, res: Response): Promise<Response> {
    const dto: SmtpConfigInputDto = req.body;
    const item = await this.createSmtpConfigUseCase.createSmtpConfig(dto);
    return res.status(201).json({
      message: "SmtpConfig created successfully",
      data: item,
    });
  }

}
