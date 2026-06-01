import { SmtpConfigInputDto } from "../domain/dto/smtp-configCreate.dto";
import { SmtpConfigResponseDTO } from "../domain/dto/smtp-configResponse.dto";
import { SmtpConfigRepository } from "../domain/interfaces/smtp-config.repository";

export class CreateSmtpConfigUseCase {
  constructor(private readonly repository: SmtpConfigRepository) {}

  async createSmtpConfig(dto: SmtpConfigInputDto): Promise<SmtpConfigResponseDTO> {
    return this.repository.createSmtpConfig(dto);
  }
}
