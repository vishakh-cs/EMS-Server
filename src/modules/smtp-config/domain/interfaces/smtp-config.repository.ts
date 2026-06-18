import { SmtpConfig } from "../entities/smtp-config.entity";
import { SmtpConfigResponseDTO } from "../dto/smtp-configResponse.dto";
import { SmtpConfigInputDto } from "../dto/smtp-configCreate.dto";

export interface SmtpConfigRepository {
  create(item: SmtpConfig): Promise<SmtpConfigResponseDTO>;
  findAll(): Promise<SmtpConfigResponseDTO[]>;
  createSmtpConfig(dto: SmtpConfigInputDto): Promise<SmtpConfigResponseDTO>;  
}
