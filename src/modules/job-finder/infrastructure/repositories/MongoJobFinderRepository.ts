import { JobFinder } from "../../domain/entities/job-finder.entity";
import { JobFinderRepository } from "../../domain/interfaces/job-finder.repository";
import { JobFinderResponseDTO } from "../../domain/dto/job-finderResponse.dto";
import { toDomain } from "../mapper/job-finder.mapper";

export class MongoJobFinderRepository implements JobFinderRepository {
  async create(item: JobFinder): Promise<JobFinderResponseDTO> {
    // Implement database creation logic
    // const createdItem = await Model.create(item);
    // return toDomain(createdItem);
    return toDomain({ ...item, _id: "dummy-id" });
  }

  async findAll(): Promise<JobFinderResponseDTO[]> {
    // Implement database fetch logic
    // const items = await Model.find();
    // return items.map(toDomain);
    return [];
  }
}
