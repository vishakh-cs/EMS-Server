import { SmtpConfigInputDto } from "../../smtp-config/domain/dto/smtp-configCreate.dto";
import { SmtpConfigResponseDTO } from "../../smtp-config/domain/dto/smtp-configResponse.dto";
import { JobFinderCreateDTO } from "../domain/dto/job-finderCreate.dto";
import { JobFinderResponseDTO } from "../domain/dto/job-finderResponse.dto";
import { JobFinderRepository } from "../domain/interfaces/job-finder.repository";

export class CreateJobFinderUseCase {
  constructor(private readonly repository: JobFinderRepository) {}

  async execute(dto: JobFinderCreateDTO): Promise<JobFinderResponseDTO> {
    return this.repository.create({
      name: dto.name,
    });
  }


}
