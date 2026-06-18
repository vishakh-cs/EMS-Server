import { SmtpConfigResponseDTO } from "../../domain/dto/smtp-configResponse.dto";
import { SmtpConfig } from "../../domain/entities/smtp-config.entity";

export const toDomain = (data: any): SmtpConfigResponseDTO => {
  return {
    id: data._id?.toString() || data.id,
    service_provider: data.service_provider,
    smtp_host: data.smtp_host,
    smtp_port: data.smtp_port,
    is_secure_ssl: data.is_secure_ssl,
    smtp_username: data.smtp_username,
    smtp_password: data.smtp_password,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
};
