import { JobFinder } from "../../domain/entities/job-finder.entity";
import { JobFinderRepository } from "../../domain/interfaces/job-finder.repository";
import { JobFinderResponseDTO } from "../../domain/dto/job-finderResponse.dto";
import { toDomain } from "../mapper/job-finder.mapper";
import JobFinderModel from "../models/JobFinder";

export class MongoJobFinderRepository implements JobFinderRepository {
  async create(item: JobFinder): Promise<JobFinderResponseDTO> {
    const createdItem = await JobFinderModel.create(item);
    return toDomain(createdItem);
  }

  async findAll(): Promise<JobFinderResponseDTO[]> {
    const items = await JobFinderModel.find().lean();
    return items.map(toDomain);
  }
}
