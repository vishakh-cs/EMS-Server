import { JobFinderResponseDTO } from "../domain/dto/job-finderResponse.dto";
import { JobFinderRepository } from "../domain/interfaces/job-finder.repository";

export class GetJobFindersUseCase {
  constructor(private readonly repository: JobFinderRepository) {}

  async execute(): Promise<JobFinderResponseDTO[]> {
    return this.repository.findAll();
  }
}
