import { JobFindRequestDTO } from "../domain/dto/job-findRequest.dto";
import { JobFindingResponseDTO } from "../domain/dto/job-findingResponse.dto";
import { searchJobsWithGrok } from "../infrastructure/services/GrokJobSearchService";
import JobFindingModel from "../infrastructure/models/JobFinding";

export class StartFindJobsUseCase {
  async execute(dto: JobFindRequestDTO): Promise<{
    saved: JobFindingResponseDTO[];
    totalFound: number;
  }> {
    const { jobtitle, experience, location, employeeId } = dto;

    // 1. Ask Grok to find jobs from the internet
    const jobs = await searchJobsWithGrok(jobtitle, experience, location);

    if (!jobs.length) {
      return { saved: [], totalFound: 0 };
    }

    // 2. Bulk insert into the jobfindings collection
    const docs = jobs.map((j) => ({
      ...j,
      searchKeywords: jobtitle,
      employeeId: employeeId || undefined,
      isApplied: false,
    }));

    const inserted = await JobFindingModel.insertMany(docs, { ordered: false });

    // 3. Map to response DTO
    const result: JobFindingResponseDTO[] = inserted.map((doc: any) => ({
      id: doc._id.toString(),
      jobTitle: doc.jobTitle,
      companyName: doc.companyName,
      email: doc.email,
      location: doc.location,
      jobType: doc.jobType,
      experienceRequired: doc.experienceRequired,
      description: doc.description,
      applyUrl: doc.applyUrl,
      source: doc.source,
      postedDate: doc.postedDate,
      searchKeywords: doc.searchKeywords,
      employeeId: doc.employeeId,
      isApplied: doc.isApplied,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));

    return { saved: result, totalFound: result.length };
  }
}
