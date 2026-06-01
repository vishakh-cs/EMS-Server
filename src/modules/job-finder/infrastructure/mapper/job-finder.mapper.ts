import { JobFinderResponseDTO } from "../../domain/dto/job-finderResponse.dto";
import { JobFinder } from "../../domain/entities/job-finder.entity";

export const toDomain = (data: any): JobFinderResponseDTO => {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
};
