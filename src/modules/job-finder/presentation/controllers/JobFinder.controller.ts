import { Request, Response } from "express";
import { JobFinderCreateDTO } from "../../domain/dto/job-finderCreate.dto";
import { CreateJobFinderUseCase } from "../../use_cases/CreateJobFinderUseCase";
import { GetJobFindersUseCase } from "../../use_cases/GetJobFindersUseCase";
import { GetJobFindingsUseCase } from "../../use_cases/GetJobFindingsUseCase";
import { StartFindJobsUseCase } from "../../use_cases/StartFindJobsUseCase";
import { JobFindRequestDTO } from "../../domain/dto/job-findRequest.dto";
import { SmtpConfigInputDto } from "../../../smtp-config/domain/dto/smtp-configCreate.dto";
import { CreateSmtpConfigUseCase } from "../../../smtp-config/use_cases/CreateSmtpConfigUseCase";
import SmtpConfigModel from "../../../smtp-config/infrastructure/models/SmtpConfig";
import nodemailer from "nodemailer";
import MailHistoryModel from "../../infrastructure/models/MailHistory";

export default class JobFinderController {
  constructor(
    private readonly createJobFinderUseCase: CreateJobFinderUseCase,
    private readonly getJobFindersUseCase: GetJobFindersUseCase,
    private readonly createSmtpConfigUseCase: CreateSmtpConfigUseCase,
    private readonly startFindJobsUseCase: StartFindJobsUseCase,
    private readonly getJobFindingsUseCase: GetJobFindingsUseCase,
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const items = await this.getJobFindersUseCase.execute();
    return res.json({ message: "Get all job-finders", data: items });
  }

  async getJobFindings(req: Request, res: Response): Promise<Response> {
    const employeeId = req.user?.id;
    try {
      const findings = await this.getJobFindingsUseCase.execute(employeeId);
      return res.json({
        message: "Job findings fetched successfully",
        data: findings,
      });
    } catch (err: any) {
      console.error("Failed to fetch job findings:", err);
      return res.status(500).json({
        message: "Failed to fetch job findings",
        error: err.message,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const dto: JobFinderCreateDTO = req.body;
    const employeeId = req.user?.id;
    const item = await this.createJobFinderUseCase.execute({
      ...dto,
      employeeId: employeeId || dto.employeeId,
    });

    return res.status(201).json({
      message: "JobFinder created successfully",
      data: item,
    });
  }

  async createSmtpConfig(req: Request, res: Response): Promise<Response> {
    const dto: SmtpConfigInputDto = req.body;
    const employeeId = req.user?.id;
    
    const item = await this.createSmtpConfigUseCase.createSmtpConfig({...dto, employeeId:employeeId });
    return res.status(201).json({
      message: "SmtpConfig created successfully",
      data: item,
    });
  }

  async sendEmail(req: Request, res: Response): Promise<Response> {
    const { to, subject, mail_content } = req.body;
    const employeeId = req.user?.id;

    if (!to || !subject || !mail_content) {
      return res.status(400).json({ message: "To, subject, and body are required." });
    }

    try {
      // 1. Fetch employee's SMTP config
      const smtpConfig = await SmtpConfigModel.findOne({ employeeId });
      if (!smtpConfig) {
        return res.status(400).json({
          message: "SMTP is not configured for this account. Please configure SMTP first.",
        });
      }

      // 2. Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: smtpConfig.smtp_host,
        port: Number(smtpConfig.smtp_port),
        secure: Number(smtpConfig.smtp_port) === 465,
        auth: {
          user: smtpConfig.smtp_username,
          pass: smtpConfig.smtp_password,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      });

      // 3. Send the mail
      let sendError: any = null;
      let info: any = null;
      const hasAttachment = !!(req.body.attachments && req.body.attachments.length > 0);

      try {
        info = await transporter.sendMail({
          from: `"${smtpConfig.smtp_username}" <${smtpConfig.smtp_username}>`,
          to,
          subject,
          text: mail_content,
          attachments: req.body.attachments,
        });
        console.log("Email sent: %s", info?.messageId);
      } catch (err: any) {
        sendError = err;
      }

      // Save to history
      await MailHistoryModel.create({
        to,
        subject,
        mail_content,
        status: sendError ? "Failed" : "Success",
        errorLog: sendError ? sendError.message || String(sendError) : undefined,
        employeeId,
        hasAttachment,
      });

      if (sendError) {
        throw sendError;
      }

      return res.status(200).json({
        message: "Email sent successfully!",
        data: { messageId: info?.messageId },
      });
    } catch (err: any) {
      console.error("Failed to send email:", err);
      return res.status(500).json({
        message: "Failed to send email through SMTP server.",
        error: err.message,
      });
    }
  }

  async getMailHistory(req: Request, res: Response): Promise<Response> {
    const employeeId = req.user?.id;
    try {
      const history = await MailHistoryModel.find({ employeeId }).sort({ createdAt: -1 });
      return res.json({
        message: "Mail history fetched successfully",
        data: history,
      });
    } catch (err: any) {
      console.error("Failed to fetch mail history:", err);
      return res.status(500).json({
        message: "Failed to fetch mail history",
        error: err.message,
      });
    }
  }

  async startFind(req: Request, res: Response): Promise<Response> {
    const { jobtitle, experience, location } = req.body as JobFindRequestDTO;
    const employeeId = req.user?.id;

    if (!jobtitle || !Array.isArray(jobtitle) || jobtitle.length === 0) {
      return res.status(400).json({ message: "jobtitle must be a non-empty array of strings." });
    }
    if (!experience) {
      return res.status(400).json({ message: "experience is required." });
    }

    try {
      const result = await this.startFindJobsUseCase.execute({
        jobtitle,
        experience,
        location,
        employeeId,
      });

      return res.status(200).json({
        message: `Job search completed. Found and saved ${result.totalFound} job listing(s).`,
        totalFound: result.totalFound,
        data: result.saved,
      });
    } catch (err: any) {
      console.error("[startFind] Error:", err.message);
      return res.status(500).json({
        message: "Failed to search for jobs.",
        error: err.message,
      });
    }
  }
}
