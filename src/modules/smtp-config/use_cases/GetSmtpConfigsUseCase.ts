import { SmtpConfigResponseDTO } from "../domain/dto/smtp-configResponse.dto";
import { SmtpConfigRepository } from "../domain/interfaces/smtp-config.repository";

export class GetSmtpConfigsUseCase {
  constructor(private readonly repository: SmtpConfigRepository) {}

  async execute(): Promise<SmtpConfigResponseDTO[]> {
    return this.repository.findAll();
  }
}
