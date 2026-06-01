import { JobFinder } from "../entities/job-finder.entity";
import { JobFinderResponseDTO } from "../dto/job-finderResponse.dto";

export interface JobFinderRepository {
  create(item: JobFinder): Promise<JobFinderResponseDTO>;
  findAll(): Promise<JobFinderResponseDTO[]>;
}
