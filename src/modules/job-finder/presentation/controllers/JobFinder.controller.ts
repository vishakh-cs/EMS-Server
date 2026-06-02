import { Request, Response } from "express";
import { JobFinderCreateDTO } from "../../domain/dto/job-finderCreate.dto";
import { CreateJobFinderUseCase } from "../../use_cases/CreateJobFinderUseCase";
import { GetJobFindersUseCase } from "../../use_cases/GetJobFindersUseCase";
import { SmtpConfigInputDto } from "../../../smtp-config/domain/dto/smtp-configCreate.dto";
import { CreateSmtpConfigUseCase } from "../../../smtp-config/use_cases/CreateSmtpConfigUseCase";
import SmtpConfigModel from "../../../smtp-config/infrastructure/models/SmtpConfig";
import nodemailer from "nodemailer";

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
    console.log("employee",employeeId);
    
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
      const info = await transporter.sendMail({
        from: `"${smtpConfig.smtp_username}" <${smtpConfig.smtp_username}>`,
        to,
        subject,
        text: mail_content,
        attachments: req.body.attachments,
      });

      console.log("Email sent: %s", info.messageId);

      return res.status(200).json({
        message: "Email sent successfully!",
        data: { messageId: info.messageId },
      });
    } catch (err: any) {
      console.error("Failed to send email:", err);
      return res.status(500).json({
        message: "Failed to send email through SMTP server.",
        error: err.message,
      });
    }
  }
}
